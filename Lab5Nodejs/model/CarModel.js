const mongoose = require('mongoose');
const { Schema } = mongoose;
const CarSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    des: {
        type: String,
        require: true
    },
})

const CarModel = new mongoose.model('products',CarSchema);
module.exports = CarModel;