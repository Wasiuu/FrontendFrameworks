
import PropTypes from 'prop-types';


export default function TaskList({ tasks, selectedDate, onEdit, onDelete }) {
    console.log('Dane tasks w TaskList:', tasks);
    const dateKey = selectedDate.toDateString();
    const tasksForDate = tasks[dateKey] || []; // Ensure we have an empty array if no tasks exist for the date
    console.log('Zadania dla daty w TaskList:', tasksForDate);

    return (
        <div className="task-list">
            <h2 className="text-xl font-bold mb-4">Zadania na {selectedDate.toDateString()}</h2>
            {tasksForDate.length === 0 ? (
                <p className="text-gray-500">Brak zadań na wybrany dzień.</p>
            ) : (
                <ul className="list-none pl-0 space-y-2">
                    {tasksForDate.map((task) => (
                        <li key={task.id} className="p-4 border rounded flex justify-between items-center bg-white shadow-md">
                            <span>{task.name}</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onEdit(task)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                >
                                    Edytuj
                                </button>
                                <button
                                    onClick={() => onDelete(task)}
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                >
                                    Usuń
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

TaskList.propTypes = {
    tasks: PropTypes.objectOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                name: PropTypes.string.isRequired,
            })
        )
    ).isRequired,
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,

};
