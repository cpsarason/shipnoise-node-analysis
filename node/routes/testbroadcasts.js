const Joi = require('joi');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {TestBroadcast, validate} = require('../models/testBroadcast');

router.get('/', async (req,res) => {
     // this is route is for all broadcasts, so create an array with 
     // multiple broadcast objects

    const broadcasts = await TestBroadcast.find().sort('MMSI');
    //console.log(broadcasts);
    //check whether geoJSON is requested, and return if so
    // URL format like: http://localhost:3001/api/broadcasts?geoJson=true
    if (req.query.geoJson) {
        console.log('geoJSON requested!');
        const geoJSON = await formatGeoJsonBroadcast(broadcasts);
        res.send(geoJSON);
    } else {
        //otherwise just return broadcast JSON from Mongo
        res.send(broadcasts);
    }
});

// // /api/genres/1

router.get('/:id', async (req,res) =>{
    // because this route is for a specific id, create singular broadcast object

    const broadcast = await TestBroadcast.findById(req.params.id);
    
    if (!broadcast) return res.status(404).send('The broadcast with the given ID was not found');

    //check whether geoJSON is requested, and return if so
    // URL format like: http://localhost:3001/api/broadcasts/5bae89c3774a302798646ec9?geoJson=true
    // if geoJSON is requested, this will return a single point
    // TODO: should add some validation on the query request

    if (req.query.geoJson) {
        console.log('geoJSON requested!');
        var geoJSON = formatGeoJsonBroadcast([broadcast]);
        res.send(geoJSON);
    } else {
        //otherwise just return broadcast JSON from Mongo
        res.send(broadcast);
    }

});



router.post('/', async (req,res) =>{
    
    const { error } = validate(req.body); // object destructuring. pulls the "error" property from what validateGenre returns
    if (error) return res.status(400).send(error.details[0].message);
        

    let broadcast = new TestBroadcast({ name: req.body.name });
    broadcast = await broadcast.save();
    res.send(broadcast);
});

router.put('/:id', async (req,res) => {

    const { error } = validate(req.body); // object destructuring. pulls the "error" property from what validateGenre returns
    if (error) return res.status(400).send(error.details[0].message);

    const broadcast = await TestBroadcast.findByIdAndUpdate( req.params.id, { name: req.body.name },{
        new: true
    });
    // look up the broadcast
    // if not existing return 404
    
    if (!broadcast) return res.status(404).send('The broadcast with the given ID was not found');
       
    // return the updated broadcast
    res.send(broadcast);

});

router.delete('/:id', async (req,res) => {
    const broadcast = await TestBroadcast.findByIdAndRemove(req.params.id);
    //look up the broadcast
    //not existing, return 404
   
    if (!broadcast) return res.status(404).send('The broadcast with the given ID was not found');

    // return the same broadcast
    res.send(broadcast);

});

async function formatGeoJsonBroadcast(broadcasts) {
    // takes an array of broadcasts to return a feature collection of points.
    // for singular broadcast, put into an array
    // for an array of broadcasts, just use the array
    // e.g. formatGeoJsonBroadcast([broadcast]) or
    // formatGeoJsonBroadcast(broadcasts)

    //console.log(broadcast);
    var geoJSON = {
        "type": "FeatureCollection",
        "features": []
    }

    broadcasts.forEach((broadcast) => {
        geoJSON.features.push({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        parseFloat(broadcast.LON), 
                        parseFloat(broadcast.LAT)
                    ]
                },
                "properties": {
                    MMSI: broadcast.MMSI,
                    BaseDateTime: broadcast.BaseDateTime
                }
        });
    });
    return geoJSON;
}

module.exports = router;



