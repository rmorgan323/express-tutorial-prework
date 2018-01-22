const express = require('express');
const app = express();
const path = require('path');
const sendMe = require('./sendMe');

const urlLogger = (request, response, next) => {
  console.log('Request URL:', request.url);
  next();
};

const timeLogger = (request, response, next) => {
  console.log('Datetime:', new Date(Date.now()).toString());
  next();
};

// .use connects urlLogger and timeLogger to each request, thus adding url and time to console logs
app.use(urlLogger, timeLogger);

// this file connects the file in public to the root directory -- in this case, index.html becomes root
app.use(express.static(path.join(__dirname, 'public')));

// json endpoint pulls object from external source
app.get('/json', (request, response) => {
  response.status(200).json(sendMe);
});

// sunsets endpoint sends html with styles
app.get('/sunsets', (request, response) => {
  response.send('<img style="width: 100%" src="/sunset1.jpg" /><img style="width: 100%" src="/sunset2.jpg" />');
});

// adds 404 page on unknown endpoings
app.use((request, response, next) => {
  response.status(404).send('404! Where do you think you are going?');
});

tells the browser where to find this app when it is running
app.listen(3000, () => {
  console.log('Express intro running on localhost:3000');
});