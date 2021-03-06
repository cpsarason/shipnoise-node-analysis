// *** DEPRECATED --- This is from Mosh course, saved for example ***

const Joi = require('joi');
const mongoose = require('mongoose');

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlenth: 5,
        maxlength: 50
    }
}));

function validateGenre(genre){
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.validate = validateGenre;