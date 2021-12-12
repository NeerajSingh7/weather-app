const path = require('path');
const express = require('express'); 
const hbs = require('hbs');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'Neeraj Singh'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Neeraj Singh'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Neeraj Singh',
        text: 'this is some helpful text'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    }

    forecast(req.query.address, (err, data) => {
        if(err){
            return res.send({
                error: err,
                address: req.query.address
            });
        }
        
        res.send({
            address: req.query.address,
            // weather: data
            address: req.query.address,
            temp: data.temp,
            location: data.location,
            lattitude: data.lattitude,
            longitude: data.longitude,
            description: data.description,
            humidity: data.humidity,
            windSpeed: data.windSpeed,
            visibility: data.visibility,
            icon: data.icon
        });
    });


    // res.send({
    //     forecast: 23,
    //     location: 'delhi',
    //     address: req.query.address
    // });
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search item'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Neeraj Singh', 
        errorMessage: 'Help article not found'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Neeraj Singh',
        errorMessage: 'Page Not Found'
    }); 
})

app.listen(port, () => {
    console.log('the server is running on port ' + port);
})