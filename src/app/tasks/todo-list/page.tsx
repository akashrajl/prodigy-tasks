'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './TodoList.module.css';
import { FaPlus, FaTrash, FaEdit, FaSave } from 'react-icons/fa';

// Define the structure of a single task
type Priority = 'Low' | 'Medium' | 'High';
type Task = {
  id: number;
  text: string;
  completed: boolean;
  priority: Priority;
};

const priorities: Priority[] = ['Low', 'Medium', 'High'];
const priorityValues: Record<Priority, number> = { 'High': 2, 'Medium': 1, 'Low': 0 };

const TodoListPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputText, setInputText] = useState('');
  const [currentPriority, setCurrentPriority] = useState<Priority>('Medium');
  const [editingTask, setEditingTask] = useState<{ id: number; text: string } | null>(null);

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem('todo_tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Failed to parse tasks from localStorage", error);
    }
  }, []);

  // Save tasks to localStorage whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem('todo_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => priorityValues[b.priority] - priorityValues[a.priority]);
  }, [tasks]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() === '') return;

    const newTask: Task = {
      id: Date.now(),
      text: inputText,
      completed: false,
      priority: currentPriority,
    };

    setTasks([newTask, ...tasks]);
    setInputText('');
    setCurrentPriority('Medium');
  };

  const handleEdit = (task: Task) => {
    setEditingTask({ id: task.id, text: task.text });
  };

  const handleUpdateTask = () => {
    if (editingTask) {
      setTasks(tasks.map(task =>
        task.id === editingTask.id ? { ...task, text: editingTask.text } : task
      ));
      setEditingTask(null);
    }
  };

  const toggleTaskCompletion = (id: number) => {
    if (editingTask?.id === id) return; // Prevent toggling while editing
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const cycleTaskPriority = (id: number) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const currentIndex = priorities.indexOf(task.priority);
        const nextIndex = (currentIndex + 1) % priorities.length;
        return { ...task, priority: priorities[nextIndex] };
      }
      return task;
    }));
  };

  const cycleFormPriority = () => {
    const currentIndex = priorities.indexOf(currentPriority);
    const nextIndex = (currentIndex + 1) % priorities.length;
    setCurrentPriority(priorities[nextIndex]);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  const getPriorityClass = (priority: Priority) => {
    if (priority === 'High') return styles.highPriority;
    if (priority === 'Medium') return styles.mediumPriority;
    return styles.lowPriority;
  };

  return (
    <main className={styles.mainContainer}>
      <motion.div 
        className={styles.todoContainer}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>My To-Do List</h1>
        <form onSubmit={handleAddTask} className={styles.inputForm}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Add a new task..."
            className={styles.taskInput}
          />
          <button 
            type="button" 
            onClick={cycleFormPriority} 
            className={`${styles.priorityButton} ${getPriorityClass(currentPriority)}`}
          >
            {currentPriority}
          </button>
          <button type="submit" className={styles.addButton} aria-label="Add Task">
            <FaPlus />
          </button>
        </form>
        <div className={styles.taskListWrapper}>
          <motion.ul layout className={styles.taskList}>
            <AnimatePresence>
              {sortedTasks.map((task, index) => (
                <motion.li 
                  key={task.id} 
                  className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}
                  layout
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <div className={styles.taskContent}>
                    <span className={styles.taskNumber} onClick={() => toggleTaskCompletion(task.id)}>{index + 1}.</span>
                    {editingTask?.id === task.id ? (
                      <input
                        type="text"
                        value={editingTask.text}
                        onChange={(e) => setEditingTask({ ...editingTask, text: e.target.value })}
                        onBlur={handleUpdateTask}
                        onKeyDown={(e) => e.key === 'Enter' && handleUpdateTask()}
                        className={styles.editInput}
                        autoFocus
                      />
                    ) : (
                      <p onClick={() => toggleTaskCompletion(task.id)}>{task.text}</p>
                    )}
                  </div>
                  <div className={styles.taskActions}>
                    <motion.button
                      onClick={() => cycleTaskPriority(task.id)}
                      className={`${styles.priorityIndicator} ${getPriorityClass(task.priority)}`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {task.priority}
                    </motion.button>

                    {editingTask?.id === task.id ? (
                        <motion.button onClick={handleUpdateTask} className={styles.actionButton} whileHover={{ scale: 1.2 }}>
                            <FaSave />
                        </motion.button>
                    ) : (
                        <motion.button onClick={() => handleEdit(task)} className={styles.actionButton} whileHover={{ scale: 1.2 }}>
                            <FaEdit />
                        </motion.button>
                    )}
                    
                    <motion.button 
                      onClick={() => deleteTask(task.id)} 
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                      aria-label="Delete Task"
                      whileHover={{ scale: 1.2, color: '#e53e3e' }}
                    >
                      <FaTrash />
                    </motion.button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      </motion.div>
    </main>
  );
};

export default TodoListPage;