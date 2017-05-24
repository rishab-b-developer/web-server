const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const logFile = 'server.log';
const year = new Date().getFullYear();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('currentYear', () => {
    return year;
});
hbs.registerHelper('capitalize', (text) => {
    return text.toUpperCase();
});

var app = express();
app.set('view engine', hbs);
app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});

app.use((request, response, next) => {
    var now = new Date().toString();
    var logText = `${now}:- ${request.method}-----${request.url}`
    fs.appendFile(logFile, logText + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log file.');
        }
    });
    console.log(logText);
    next();
});
/*app.use((request, response, next) => {
    response.render('maintainence.hbs');
});*/
app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
    response.render('home.hbs', {
        pTitle: 'Home',
        pMessage: 'Welcome to our home page!'
    });
});
app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pTitle: 'About',
        pMessage: 'Happy to tell you about us.'
    });
});
app.get('/bad', (request, response) => {
    response.send({
        error: 'unable to serve request'
    });
});