'use client';
import { db } from '@/app/lib/firebase/firebase';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/app/lib/AuthContext';
import { fetchTasksForDate } from '@/app/utils/fetchedTasks';
import TaskList from './TaskList';
import TaskModal from './TaskModal';
import { collection, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/navigation';
import 'react-datepicker/dist/react-datepicker.css';

export default function CalendarView() {
    const router = useRouter();
    const { user, loading } = useAuth();
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [tasks, setTasks] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date());

    const loadTasks = useCallback(async () => {
        try {
            if (!user) return;

            const fetched = await fetchTasksForDate(selectedDate, user.uid);

            // Grupowanie zadań według dat
            const groupedTasks = fetched.reduce((acc, task) => {
                const dateKey = task.date; // Użyj daty jako klucza
                if (!acc[dateKey]) {
                    acc[dateKey] = [];
                }
                acc[dateKey].push(task);
                return acc;
            }, {});

            setTasks(groupedTasks);
        } catch (error) {
            console.error('Błąd pobierania zadań:', error);
        }
    }, [selectedDate, user]);

    useEffect(() => {
        if (!loading && user) {
            loadTasks();
        }
    }, [loading, user, loadTasks]);

    if (!loading && !user) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <p className="text-lg text-gray-600">Musisz być zalogowany, aby zobaczyć tę stronę.</p>
            </div>
        );
    }

    const handleTaskSubmit = async (formData) => {
        try {
            const dateString = selectedDate.toDateString();

            if (editingTask) {
                await updateDoc(doc(db, 'tasks', editingTask.id), {
                    name: formData.name,
                    date: dateString,
                    ownerId: user.uid,
                });
            } else {
                await addDoc(collection(db, 'tasks'), {
                    name: formData.name,
                    date: dateString,
                    ownerId: user.uid,
                });
            }

            await loadTasks();
            setModalOpen(false);
            setEditingTask(null);
        } catch (error) {
            console.error('Błąd przy dodawaniu/edycji zadania:', error);
        }
    };

    const handleDeleteTask = async (task) => {
        try {
            await deleteDoc(doc(db, 'tasks', task.id));
            await loadTasks();
        } catch (error) {
            console.error('Błąd przy usuwaniu zadania:', error);
        }
    };

    const dateKey = selectedDate.toDateString();
    const tasksForDate = tasks[dateKey] || [];
    return (
        <div className="container flex flex-col items-center justify-center min-h-screen p-4 space-y-6">
            <div className="card w-full max-w-lg md:max-w-4xl text-center">
                <h2 className="text-2xl md:text-4xl font-bold text-primary mb-6">Kalendarz</h2>

                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="yyyy-MM-dd"
                    className="border p-2 rounded mb-4 w-full max-w-xs md:max-w-sm"
                />

                <TaskList
                    tasks={tasks}
                    selectedDate={selectedDate}
                    onEdit={(task) => {
                        setEditingTask(task);
                        setModalOpen(true);
                    }}
                    onDelete={handleDeleteTask}
                />

                <button
                    onClick={() => setModalOpen(true)}
                    className="button mt-6 bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Dodaj zadanie
                </button>
            </div>

            <TaskModal
                isOpen={isModalOpen}
                closeModal={() => {
                    setModalOpen(false);
                    setEditingTask(null);
                }}
                selectedDate={selectedDate}
                addTask={handleTaskSubmit}
                editingTask={editingTask}
            />
        </div>
    )
};
