import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase/firebase';

export async function fetchTasksForDate(selectedDate, userId) {
    if (!userId) return [];

    const dateString = selectedDate.toDateString();
    const q = query(
        collection(db, 'tasks'),
        where('date', '==', dateString),
        where('ownerId', '==', userId)
    );

    try {
        const snapshot = await getDocs(q); // Zainicjalizuj snapshot tutaj
        const tasks = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
        }));

        console.log('Pobrane zadania:', tasks);
        return tasks;
    } catch (error) {
        console.error('Błąd podczas pobierania zadań:', error);
        return [];
    }
}
