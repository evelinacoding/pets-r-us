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
const Appointments = require('./models/appointments')
const fs = require('fs')

//The express app variable which provides access to Express's built in functions/classes and creates a new Express App
const app = express();

//To tell express that the ejs pages are in the views folder
app.set('views', path.join(__dirname, 'views'));

//To tell Express to use ejs as its view engine
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const CONN = 'mongodb+srv://web340_admin:words11@bellevueuniversity.8vzftv7.mongodb.net/web340DB'

mongoose.connect(CONN).then(() => {
    console.log('Mongodb connection successful')
}).catch(err => {
    console.log('MongoDB Error ' + err.message)
})

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

//To render the customer list page
app.get('/customer-list', (req, res) => {

    Customer.find().then(customers => {
        res.render('customer-list', {
            title: 'Pets-R-Us: Customer-List',
            pageTitle: 'Customer List', 
            customers: customers
        })
    }).catch(err => {
        res.status(500).send('Customer list failed to load.' + err)
    })
})

//To render the appointments page
app.get('/appointments', (req, res) => {
    let jsonFile = fs.readFileSync('./public/data/services.json');
    let services = JSON.parse(jsonFile)

    console.log(services)

    res.render('appointments', {
        title: "Pets-R-Us: Appointments",
        pageTitle: "Appointments Page",
        services: services,
    })
})

app.post('/appointments', (req, res, next) => {
    const newAppointment = new Appointments({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        service: req.body.service,
    })

    Appointments.create(newAppointment, function(err, newAppointment) {
        if(err) {
            console.log(err)
        } else {
            res.render('index')
        }
    })
})

app.post('/registration', (req, res, next) => {
   
    console.log(req.body.customerID)
    console.log(req.body.email)

    const newCustomer = new Customer ({
        customerID: req.body.customerID,
        email: req.body.email
    })
    
    console.log(newCustomer);

    Customer.create(newCustomer, function(err, newCustomer) {
        if(err) {
            console.log('There is an ' + err)
            
        } else {
            res.render('index', {
                title: 'Landing'
            })
        }
    })

    
})

app.get('/my-appointments', (req, res) => {

    res.render('my-appointments', {
        title: "Pets-R-Us: Appointments List",
        pageTitle: "Appointments List",
       
    })
})

app.get('/api/appointments/:email', async(req, res, next) => {
    Appointments.find({'email': req.params.email}, function(err, email) {
        if(err) {
            console.log(err);
            next(err)
        } else {
            res.json(email);
        }
    })
})


//To start the server port on 3000
app.listen(PORT, () => {
    console.log('Hello World application started and listening on port ' + PORT)
});