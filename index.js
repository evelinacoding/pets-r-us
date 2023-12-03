/*
======================================
Title: index.js
Author: Evelyn Zepeda
Date: 11/15/23
Description: index.js page for Pets-R-Us
=====================================
*/

//Import statements for express and node.js
const express = require('express');
const path = require('path');
const mongoose = require('mongoose')

const Customer = require('./models/customer')



//The express app variable which provides access to Express's built in functions/classes and creates a new Express App
const app = express();


//To tell express that the ejs pages are in the views folder
app.set('views', path.join(__dirname, 'views'));

//To tell Express to use ejs as its view engine
app.set('view engine', 'ejs');


//A variable to hold the server port value
//"process.env" variable has a port already defined
const PORT = process.env.PORT || 3000;

//To render the home page(routing to index)
app.get('/', (req, res) => {
    res.render('index', {
        title: "Pets-R-Us: Home",
        pageTitle: "Landing Page"
        
    });
});

//To render the boarding page
app.get('/boarding', (req, res) => {
    res.render('boarding', {
        title: "Pets-R-Us: Boarding",
        pageTitle: "Boarding Services"
    });
});

//Routing to the grooming page
app.get('/grooming', (req, res) => {
    res.render('grooming', {
        title: "Pets-R-Us: Grooming",
        pageTitle: "Grooming Services"
    });
});

//To render the training page
app.get('/training', (req, res) => {
    res.render('training', {
        title: "Pets-R-Us: Training",
        pageTitle: "Training Services"
    });
});

//To render the registration page
app.get('/registration', (req, res) => {
    res.render('registration', {
        title: "Pets-R-Us: Registration",
        pageTitle: "Registration Page"
        
    });
});

app.post('/registration', (req, res, next) => {
    res.render('registration', {
        title: 'Registration Form',
        pageTitle: 'Create Registration'
    })

    console.log(newCustomer)

    Customer.create(newCustomer, function(err, customer) {
        if (err) {
            console.log(err);
            next(err)
        } else {
            res.render('index', {
                title: 'Landing Page'
            })
        }
    })
})


//To start the server port on 3000
app.listen(PORT, () => {
    console.log('Hello World application started and listening on port ' + PORT)
});