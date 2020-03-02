const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast')

const app = express();
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicPath))

app.get('', (req, res)=> {
    res.render('index', {
        title: 'weather',
        name: 'Mohammad Shahbazi'
    })
})

app.get('/about', (req,res)=> {
    res.render('about', {
        title: 'About Me',
        name: 'Mohammad Shahbazi'
    })
})

app.get('/help', (req, res)=> {
    res.render('help', {
        help: 'some Help',
        title: 'Help',
        name: 'Mohammad Shahbazi'
    })
})

app.get('/weather', (req, res)=> {
    if(!req.query.address) {
        return res.send({
            error: 'please Provide address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, palceName: location} = {})=> {
        if(error) {
            return res.send({
                error
            })
        }
        forcast(latitude, longitude,(error, forcast)=> {
            if(error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forcast,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res)=> {
    res.render('404', {
        title: '404',
        message: 'Artical Not Found!',
        name: 'Mohammad Shahbazi'
    })
})

app.get('*', (req, res)=> {
    res.render('404', {
        title: '404',
        message: ' Page not found!',
        name: 'Mohammad Shahbazi'
    })
})

app.listen(port, ()=> {
    console.log('server is up!');
})