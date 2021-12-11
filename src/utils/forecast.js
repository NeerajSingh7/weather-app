const request = require('request');

const forecast = (address, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=e305b5d968f3ac00088a3bb42430331a&query=${encodeURIComponent(address)}`;
    request({ url, json: true }, (err, { body }) => {
        if(err){
            callback('unable to connect to weather services.', undefined);
        }
        else if(body.error){
            callback('unable to find location', undefined);
        }
        else{
            callback(undefined, {
                temp: body.current.temperature,
                location: body.request.query,
                lattitude: body.location.lat,
                longitude: body.location.lon,
                description: body.current.weather_descriptions[0],
                humidity: body.current.humidity,
                windSpeed: body.current.wind_speed,
                visibility: body.current.visibility,
                icon: body.current.weather_icons[0],
            }
            );  
        }
    })
}


// `${body.current.weather_descriptions[0]} It is currently ${body.current.temperature} degrees out. There is a ${body.current.feelslike} degrees out. location: ${body.request.query}  lattitude: ${body.location.lat} longtude: ${body.location.lon}`
module.exports = forecast;