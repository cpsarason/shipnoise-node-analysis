// *** DEPRECATED --- This is from Mosh course, saved for example ***



const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlenth: 5,
        maxlength: 50
    },
    isGold: { type: Boolean, default: false },
    phone: {
        type: String
    }
}));

function validateCustomer(customer){
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    }

    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;