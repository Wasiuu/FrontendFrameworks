import React from 'react';
import PropTypes from 'prop-types';


export default function TaskModal({ isOpen, closeModal, selectedDate, addTask }) {
    if (!isOpen) return null;

    const handleAddTask = (e) => {
        e.preventDefault();
        const taskName = e.target.taskName.value.trim();
        if (taskName) {
            addTask({ name: taskName, date: selectedDate.toDateString() });
            closeModal();
        }
    };

    return (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Dodaj zadanie</h2>
                <form onSubmit={handleAddTask}>
                    <div className="mb-4">
                        <label htmlFor="taskName" className="block text-gray-700 font-bold mb-2">
                            Nazwa zadania:
                        </label>
                        <input
                            type="text"
                            id="taskName"
                            name="taskName"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Wpisz nazwę zadania"
                            required
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                        >
                            Anuluj
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                        >
                            Dodaj
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

TaskModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    addTask: PropTypes.func.isRequired,
};
