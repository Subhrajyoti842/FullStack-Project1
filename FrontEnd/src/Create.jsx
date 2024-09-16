import React, { useState } from 'react';
import axios from 'axios';

function Create({ onTaskAdded }) {
    const [task, setTask] = useState('');

    const handleAdd = () => {
        if (task.trim()) {
            axios.post('http://localhost:3001/add', { task })
                .then((result) => {
                    console.log('Task added:', result.data);  // Check if task is added
                    onTaskAdded();  // Trigger re-fetch of tasks
                    setTask('');  // Clear the input field
                })
                .catch((err) => console.log(err));
        } else {
            alert('Task cannot be empty');
        }
    };

    return (
        <div className='create_form'>
            <input
                type="text"
                placeholder='Add New Task'
                value={task}  // Set the value of the input field
                onChange={(e) => setTask(e.target.value)}  // Update the task state
            />
            <button type="button" onClick={handleAdd}>Add</button>
        </div>
    );
}

export default Create;

