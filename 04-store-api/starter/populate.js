require('dotenv').config();
const connectDB = require('./db/connect')
const product = require('./models/product');
const jsonProduct = require('./products.json');


const start = async () => {
    try {
        console.log(process.env.URL);
        await connectDB(process.env.URL);
        await product.deleteMany();
        await product.create(jsonProduct);
        console.log('conneted successfully');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


start();