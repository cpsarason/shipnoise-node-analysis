// *** DEPRECATED --- This is from Mosh course, saved for example ***


const Joi = require('joi');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Genre, validate} = require('../models/genre');




router.get('/', async (req,res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

// // /api/genres/1

router.get('/:id', async (req,res) =>{
    const genre = await Genre.findById(req.params.id);
    
    if (!genre) return res.status(404).send('The genre with the given ID was not found');
    
    res.send(genre);
});

router.post('/', async (req,res) =>{
    
    const { error } = validate(req.body); // object destructuring. pulls the "error" property from what validateGenre returns
    if (error) return res.status(400).send(error.details[0].message);
        

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.send(genre);
});

router.put('/:id', async (req,res) => {

    const { error } = validate(req.body); // object destructuring. pulls the "error" property from what validateGenre returns
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate( req.params.id, { name: req.body.name },{
        new: true
    });
    // look up the genre
    // if not existing return 404
    
    if (!genre) return res.status(404).send('The genre with the given ID was not found');
       
    // return the updated genre
    res.send(genre);

});

router.delete('/:id', async (req,res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    //look up the genre
    //not existing, return 404
    
    if (!genre) return res.status(404).send('The genre with the given ID was not found');

    // return the same genre
    res.send(genre);

});

module.exports = router;



