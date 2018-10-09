const Joi = require('joi');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Broadcast, validate} = require('../models/broadcasts');




router.get('/', async (req,res) => {
    const broadcasts = await Broadcast.find().sort('MMSI');
    res.send(broadcasts);
});

// // /api/genres/1

router.get('/:id', async (req,res) =>{
    const broadcast = await Broadcast.findById(req.params.id);
    
    if (!genre) return res.status(404).send('The genre with the given ID was not found');
    
    res.send(broadcast);
});

router.post('/', async (req,res) =>{
    
    const { error } = validate(req.body); // object destructuring. pulls the "error" property from what validateGenre returns
    if (error) return res.status(400).send(error.details[0].message);
        

    let broadcast = new Broadcast({ name: req.body.name });
    broadcast = await broadcast.save();
    res.send(broadcast);
});

router.put('/:id', async (req,res) => {

    const { error } = validate(req.body); // object destructuring. pulls the "error" property from what validateGenre returns
    if (error) return res.status(400).send(error.details[0].message);

    const broadcast = await Broadcast.findByIdAndUpdate( req.params.id, { name: req.body.name },{
        new: true
    });
    // look up the broadcast
    // if not existing return 404
    
    if (!broadcast) return res.status(404).send('The broadcast with the given ID was not found');
       
    // return the updated broadcast
    res.send(broadcast);

});

router.delete('/:id', async (req,res) => {
    const broadcast = await Broadcast.findByIdAndRemove(req.params.id);
    //look up the broadcast
    //not existing, return 404
    
    if (!broadcast) return res.status(404).send('The broadcast with the given ID was not found');

    // return the same broadcast
    res.send(broadcast);

});

module.exports = router;



