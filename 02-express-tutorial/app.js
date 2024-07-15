const express = require('express');
const {products} = require("./data");

const app = express();


app.get('/', (req, res) => {
    res.status(200).json({message:"it works well"});
})

app.get('/api/v1/products/:productID', (req, res) => {
    const idToFind = parseInt(req.params.productID); 
    let product = products.find((p) => p.id === idToFind);
    if(product === undefined || product.length == 0)
    {
        product = {
            message: "That product was not found"
        }
    }

    res.status(200).json(product);
})

app.get('/api/v1/query', (req, res, next) => {
    
    const search = req.query.search;
    /**
     * Filter array items based on search criteria (query)
     */
    function SearchItem(arr, query) {
        return arr.filter((el) => el.desc.toLowerCase().includes(query.toLowerCase()));
    }    
    res.status(200).json(SearchItem(products,search));
})


app.get('*', (req,res) => {
    res.status(404).json('page not found');
})


app.listen(3000, () => {
    console.log('The server stated at port 3000');
});
