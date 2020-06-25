const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=b2b55c035456be2765026faf077595ca&query=' +
    encodeURIComponent(latitude) +
    ',' +
    encodeURIComponent(longitude) +
    '&units=f';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('error', undefined);
    } else if (body.error) {
      console.log(body.error.info, undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]} it is currently ${body.current.temperature} degrees out.  it feels like ${body.current.feelslike} degrees out`
      );
    }
  });
};

module.exports = forecast;
