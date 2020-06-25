const request = require('request');

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoicmFrZXNoMTAxMiIsImEiOiJja2JyeW05ZDEyMzA5MnhwbzIyNnBwMDRuIn0.3lcBk2Cq5ATOR-8ybVb37g&limit=1';
  request(
    {
      url,
      json: true,
    },
    (error, { body }) => {
      if (error) {
        callback('Unable to connect to location', undefined);
      } else if (body.features.length === 0) {
        callback('Please provide the location', undefined);
      } else {
        callback(undefined, {
          lattitude: body.features[0].center[1],
          location: body.features[0].place_name,
          longitude: body.features[0].center[0],
        });
      }
    }
  );
};

module.exports = geocode;
