const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Name required']
    }, price:  {
        type: Number, 
        required: [true, 'Priced required']
    }, featured: {
        type: Boolean, 
        default: false
    }, rating: {
        type: Number, 
        default: 4.5
    }, createdAt: {
        type: Date, 
        default: Date.now()
    }, company: {
        type: String, 
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'], 
            message: '{VALUE} is not supported'
        }
        // enum: ['ikea', 'liddy', 'caressa', 'marcose']

    }
})


module.exports = mongoose.model('product', productSchema)