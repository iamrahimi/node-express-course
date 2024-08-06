const express = require('express');
const app = express();
const productModel = require('../models/product');

const getAllProductsStatic = async (req, res)  => {
    const products = await productModel.find({});

    res.status(200).json({success: 'true', nbHit:productModel.length, data: {
        msg: 'data is loading for static'
    }})
}


const getAllProducts = async (req, res)  => {
    const {name, company, featured, sort, feilds, numericFilters } = req.query; 
    const queryObject = {};

    if(featured){
        queryObject.featured = featured === "true" ? true : false;
    }

    if(name){
        queryObject.name = {$regex: name, $options: 'i'};
    }

    if(company){
        queryObject.company = company;
    }

    if(numericFilters) {
        const operatorMap = {
            '>' : '$gt', 
            '>=' : '$gte',
            '=' : '$eq',
            '<' : '$lt',
            '<=' : '$lte'
        };

        const regEx = /\b(<|>|>=|=|<=|<)\b/g;
        let filter = numericFilters.replace(regEx, (match)=>`-${operatorMap[match]}-`);

        const option = ['rating', 'price'];
        filter = filter.split(',').forEach((item) => {
            const [feild, operator, value] = item.split('-');
            if(option.includes(feild)){
                queryObject[feild] = {[operator]: Number(value)};
            }
        });

    }

    let results =  productModel.find(queryObject);

    if(sort){
        const sortlistBy = sort.split(',').join(' ');
        results = results.sort(sortlistBy);
    }

    if(feilds){
        const feildsList = feilds.split(',').join(' ');
        results = results.select(feildsList);
    }
    
        
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    results = results.skip(skip).limit(limit);
    

    const product = await results;
    res.status(200).json({success: 'true', nbHit:productModel.length, data: product })
}


module.exports = {
    getAllProducts, 
    getAllProductsStatic
}
