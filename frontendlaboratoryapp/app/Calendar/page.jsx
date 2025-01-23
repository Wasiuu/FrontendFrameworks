'use client';
import { useState } from 'react';
import CalendarView from '@/app/components/calendar/CalendarView';

export default function CalendarPage() {
    const [tasks, setTasks] = useState({});

    const handleSetTasks = (updatedTasks) => {
        setTasks(updatedTasks);
    };

    return (
        <div className="p-4 md:p-6 flex flex-col items-center">
            <CalendarView tasks={tasks} setTasks={handleSetTasks} currentDate={new Date()} />
        </div>
    );
}
