const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const staticFiles = path.join(__dirname, '../public');
const viewpath = path.join(__dirname, '../templates/views');
const partialspath = path.join(__dirname, '../templates/partials');

app.use(express.static(staticFiles));
app.set('views', viewpath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialspath);

app.get('', (req, res) => {
  res.render('index', { title: 'Weather', name: 'Angel' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Me', name: 'Angel' });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Angel',
    helpText: 'How can i help u!!',
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'you must specify term',
    });
  }
  console.log(req.query.search);
  res.send({ products: [] });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'you must specify address',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastresponse) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastresponse,
          location: location,
          address: req.query.address,
        });
      });
    }
  );

  //res.send({ forecast: 'Its sunny!!', locatiom: 'Chennai',  address: req.query.address });
});

app.get('/help/*', (req, res) => {
  res.render('404', { title: '404', name: 'Angel', errormsg: 'my help error' });
});

app.get('*', (req, res) => {
  res.render('404', { title: '404', name: 'Angel', errormsg: 'my 404 error' });
});

app.listen('3000', () => {
  console.log('Web server started');
});
