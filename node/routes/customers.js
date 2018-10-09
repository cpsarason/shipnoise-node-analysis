// *** DEPRECATED --- This is from Mosh course, saved for example ***


const {Customer, validate} = require('../models/customers');


const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



router.get('/', async (req,res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id', async (req,res) =>{
    const customer = await Customer.findById(req.params.id);
    
    if (!customer) return res.status(404).send('The customer with the given ID was not found');
    
    res.send(customer);
});

router.post('/', async (req,res) =>{
    
    const { error } = validate(req.body); // object destructuring. pulls the "error" property from what validateGenre returns
    if (error) return res.status(400).send(error.details[0].message);
        

    let customer = new Customer({ 
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
     });
    customer = await customer.save();
    res.send(customer);
});

router.put('/:id', async (req,res) => {

    const { error } = validate(req.body); // object destructuring. pulls the "error" property from what validateGenre returns
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate( req.params.id, { 
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
     },{ new: true
    });
    // look up the customer
    // if not existing return 404
    
    if (!customer) return res.status(404).send('The customer with the given ID was not found');
       
    // return the updated customer
    res.send(customer);

});

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});

module.exports = router;