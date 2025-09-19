import type { Metadata } from "next";
import { Inter, Cinzel, Oswald } from "next/font/google"; // Import Oswald
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import SideNav from "@/components/SideNav";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ['700'],
  variable: '--font-cinzel',
  display: 'swap',
});

const oswald = Oswald({ // Add Oswald font configuration
  subsets: ["latin"],
  variable: '--font-oswald',
  display: 'swap',
});

export const metadata = {
  title: "Akash Raj L - Prodigy AD",
  description: "A showcase of tasks completed during the Prodigy InfoTech internship.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cinzel.variable} ${oswald.variable}`}>
        <AuthProvider>
          <ThemeProvider>
            <Header />
            <SideNav />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}