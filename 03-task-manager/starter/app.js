const express = require('express');
const app = express();
const tasks = require('./routes/tesks');
const connectDB = require('./db/connection');
require('dotenv').config();

// Maddlewire 
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res)=> {
res.send('Welcome to my taskt manager');
})


app.use('/api/v1/tasks', tasks);

const port = 3000;
const start = async () => {
    try {
        await connectDB(process.env.URL);
        app.listen(port, console.log(`Server is listening on ${port}`));
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

start();
