require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const productRouter = require('./routes/products');


// error

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');


//middlewares

app.use(express.json());

//routes 
app.get('/', (req, res) => {
    res.send('<h1>Welcome to store Api project');
})

app.use('/api/v1/products', productRouter)

// products routes 
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// server 

const port = process.env.PORT || 3000; 

const start = async () => {
    try {
       await connectDB(process.env.URL);
        app.listen(port, console.log(`Server is listing on port ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start();