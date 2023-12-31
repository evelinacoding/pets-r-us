/*
======================================
Title: appointments.ejs 
Author: Evelyn Zepeda
Date: 12/10/23
Description: Appointments page for Pets-R-Us
=====================================
*/

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const appointmentSchema = new Schema( {
    userName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Appointments', appointmentSchema)