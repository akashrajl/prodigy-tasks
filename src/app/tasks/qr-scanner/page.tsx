'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import styles from './QrScanner.module.css';
import { FaCamera, FaUpload, FaTimes, FaCameraRetro } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// --- Type definitions ---
type ScanResult = {
  data: string;
  type: 'url' | 'email' | 'text';
};

// --- Result Display Component ---
const ScanResultDisplay = ({ result, onReset }: { result: ScanResult; onReset: () => void }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(result.data).then(() => alert('Copied to clipboard!'));
      };

      const handleSendEmail = () => {
        if (window.confirm(`Do you want to send an email to ${result.data}?`)) {
          window.location.href = `mailto:${result.data}`;
        }
      };

      return (
        <motion.div
          className={styles.resultContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <h4>Scan Successful</h4>
          <p className={styles.resultData}>{result.data}</p>
          <div className={styles.actionButtons}>
            {result.type === 'url' && <motion.a href={result.data} target="_blank" rel="noopener noreferrer" className={styles.actionButton} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Open Link</motion.a>}
            {result.type === 'email' && <motion.button onClick={handleSendEmail} className={styles.actionButton} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Send Email</motion.button>}
            <motion.button onClick={handleCopy} className={styles.actionButton} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Copy Text</motion.button>
          </div>
          <motion.button onClick={onReset} className={`${styles.actionButton} ${styles.resetButton}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Scan Again
          </motion.button>
        </motion.div>
      );
};

// --- Main QR Scanner Component ---
const QrScannerPage = () => {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isScannerActive, setIsScannerActive] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerContainerId = "qr-scanner-container";

  // Effect to manage the camera scanner lifecycle
  useEffect(() => {
    if (isScannerActive) {
      const scanner = new Html5Qrcode(scannerContainerId);
      scannerRef.current = scanner;

      scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        () => {}, // onSuccess is handled by the capture button now
        () => {}  // onFailure is ignored
      ).catch((err) => {
        console.error("Camera start error:", err); // Log the error instead of ignoring
        alert("Could not start camera. Please grant permissions.");
        setIsScannerActive(false);
      });
    }

    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, [isScannerActive]);

  const handleScanSuccess = (decodedText: string) => {
    let type: ScanResult['type'] = 'text';
    if (decodedText.startsWith('http://') || decodedText.startsWith('https://')) type = 'url';
    else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(decodedText) || decodedText.startsWith('mailto:')) type = 'email';
    setScanResult({ data: decodedText, type });
  };
  
  const handleCapture = async () => {
    const videoElement = document.querySelector(`#${scannerContainerId} video`) as HTMLVideoElement;
    if (videoElement) {
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        canvas.getContext('2d')?.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight);
        
        const imageDataUrl = canvas.toDataURL('image/png');
        
        const fileScanner = new Html5Qrcode("qr-file-scanner", { verbose: false });
        try {
            const result = await fileScanner.scanFile(dataURLtoFile(imageDataUrl, 'capture.png'), false);
            handleScanSuccess(result);
            setIsScannerActive(false);
        } catch (err) {
            console.error("Capture scan error:", err); // Log the error
            alert("No QR code found in the captured image. Please try again.");
        }
    }
  };
  
  // Helper to convert data URL to File object
  function dataURLtoFile(dataurl: string, filename: string) {
    const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }


  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileScanner = new Html5Qrcode("qr-file-scanner", { verbose: false });
    try {
      const decodedText = await fileScanner.scanFile(file, false);
      handleScanSuccess(decodedText);
    } catch (err) {
      console.error("File upload scan error:", err); // Log the error
      alert('Error scanning file. Please ensure it is a valid QR code image.');
    }
  };

  const handleReset = () => {
    setScanResult(null);
    setIsScannerActive(false);
  };

  return (
    <main className={styles.mainContainer}>
      <motion.div
        className={styles.scannerContainer}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <AnimatePresence mode="wait">
          {scanResult ? (
            <ScanResultDisplay key="result" result={scanResult} onReset={handleReset} />
          ) : (
            <motion.div key="scanner-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {!isScannerActive ? (
                <div className={styles.initialView}>
                  <h2>Scan a QR Code</h2>
                  <p>Use your camera or upload an image to scan.</p>
                  <div className={styles.methodButtons}>
                    <motion.button onClick={() => setIsScannerActive(true)} className={styles.methodButton} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <FaCamera /> Use Camera
                    </motion.button>
                    <motion.label htmlFor="qr-upload" className={styles.methodButton} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <FaUpload /> Upload Image
                      <input type="file" id="qr-upload" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                    </motion.label>
                  </div>
                </div>
              ) : (
                <div className={styles.activeScanner}>
                  <p>Position the QR code within the frame and capture</p>
                  <div id={scannerContainerId} className={styles.scannerViewport}></div>
                  <motion.button onClick={handleCapture} className={styles.captureButton} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <FaCameraRetro /> Capture
                  </motion.button>
                  <motion.button onClick={() => setIsScannerActive(false)} className={styles.cancelButton} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <FaTimes /> Cancel
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <div id="qr-file-scanner" style={{ display: 'none' }}></div>
    </main>
  );
};

export default QrScannerPage;
