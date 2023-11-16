

//Import statements for express and node.js
const express = require('express');
const logger = require('pino');
const path = require('path');

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

//Routing to the grooming page
app.get('/grooming', (req, res) => {
    res.render('grooming', {
        title: "Pets-R-Us: Grooming",
        pageTitle: "Grooming Services"
    });
});


//To start the server port on 3000
app.listen(PORT, () => {
    logger.info('Hello World application started and listening on port' + PORT)
})