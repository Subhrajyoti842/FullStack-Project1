import React, { useEffect, useState } from 'react';
import { BsCircleFill, BsFillTrashFill, BsFillCheckCircleFill } from 'react-icons/bs';
import axios from 'axios';
import Create from './Create';

function Home() {
    const [todos, setTodos] = useState([]);

    // Function to fetch tasks from the backend
    const fetchTodos = () => {
        axios.get('http://localhost:3001/get')
            .then((result) => {
                console.log('Fetched tasks:', result.data);  // Debugging fetch
                setTodos(result.data);  // Update the state with fetched tasks
            })
            .catch((err) => console.log(err));
    };

    // Fetch tasks when the component mounts
    useEffect(() => {
        fetchTodos();
    }, []);

    const handleEdit = (id) =>{
        axios.put('http://localhost:3001/update/' + id)
        .then(result => {
          location.reload()
        })
        .catch(err => console.log(err))
    }
    const handleDelete = (id) =>{
      axios.delete('http://localhost:3001/delete/' + id)
      .then(result => {
        location.reload()
      })
      .catch(err => console.log(err))
    }

    return (
        <div className='home'>
            <h1 className='todo-heading'><b>MY TODO LIST</b></h1>
            <Create onTaskAdded={fetchTodos} />  {/* Pass fetchTodos as a prop to re-fetch tasks */}

            {
                todos.length === 0 ? (
                    <div><h2>No Record</h2></div>
                ) : (
                    todos.map((todo, index) => (
                        <div className ='task' key={index}>
                        <div className = 'checkbox' onClick={() =>handleEdit(todo._id)}>
                        {todo.done ? 
                        <BsFillCheckCircleFill className ='icon'> </BsFillCheckCircleFill>
                        :
                        <BsCircleFill className ='icon' />
                        }
                          <p className= {todo.done ? "line_through" : " "}>{todo.task}</p>
                         </div>
                         <div>
                          <span><BsFillTrashFill className ='icon' 
                                 onClick={() => handleDelete(todo._id)}/></span>
                         </div>
                        </div>
                    ))
                )
            }
        </div>
    );
}

export default Home;


