/*
======================================
Title: customer.js
Author: Evelyn Zepeda
Date: 12/10/23
Description: Customer Schema
=====================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema

const customerSchema = new Schema({
    customerID: { 
        type: String,
        required: true, 
        unique: true
    },
    email: {
        type: String,
        required: true, 
        unique: true
    }

});

module.exports = mongoose.model('Customer', customerSchema);