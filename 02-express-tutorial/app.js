const express = require('express');
const {products, people} = require("./data");
const peopleRouter = require('./routes/peoples');

const app = express();
app.use(express.static('./methods-public'));


app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use('/api/v1/peoples', peopleRouter);



app.get('*', (req,res) => {
    res.status(404).json('page not found');
})

app.listen(3000, () => {
    console.log('The server stated at port 3000');
});
