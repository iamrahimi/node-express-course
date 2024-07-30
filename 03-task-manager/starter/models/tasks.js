const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name:{
        type: String, 
        required: [true, 'Please enter a name ...'], 
        trim: true,
        maxlength: [20, 'Name cannot be more then 20 charector']
    }, completed: {
        type: Boolean, 
        default: false
    }
})


module.exports = mongoose.model('Task', TaskSchema);