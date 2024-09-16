const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// GET route to fetch tasks
app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => {
            console.log('Tasks fetched from DB:', result); // Add a console log to debug
            res.json(result);
        })
        .catch(err => {
            console.log('Error fetching tasks:', err);  // Error debugging
            res.json(err);
        });
});

app.put('/update/:id', (req, res) =>{
    const{id} = req.params;
    //console.log(id);
    TodoModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result =>res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res) =>{
    const{id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result =>res.json(result))
    .catch(err => res.json(err))
})

// POST route to add a new task
app.post('/add', (req, res) => {
    const { task } = req.body;  // Destructure task from request body
    if (!task) {
        return res.status(400).json({ error: 'Task is required' });
    }

    TodoModel.create({ task })
        .then(result => {
            console.log('Task added:', result);  // Add log to see added task
            res.json(result);
        })
        .catch(err => {
            console.log('Error adding task:', err);  // Error debugging
            res.json(err);
        });
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
