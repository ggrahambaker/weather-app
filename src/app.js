const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const app = express()
const port = process.env.PORT || 3000


// defines path for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


// setup handlebars engine and view location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialPath)

// setup static assets
app.use(express.static(publicDirPath))



app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App', 
		message: 'Use this to get the forecast', 
		name: 'graham!'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'about me', 
		name: 'graham!'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'help',
		helpMessage: 'lol you need help?',
		name: 'graham!'
	})
})


app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'you must provide address term'
		})
	}


	const address = req.query.address

	geocode.getLatLong(address, (err, {lat, longit, location} = {}) => {
		if (err) {
			return res.send({err})
		} else {
			
			forecast.getForecast( lat, longit, (err, forecastData) => {
				if (err) {
					return res.send({err})
				} else {
					res.send({
						location,
						address,
						forecast: forecastData, 
					})	

				}
			})
		}
	})

})





app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'help article not found?',
		name: 'graham!'
	})
})



// 404
app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'lol you need help?',
		name: 'graham!'
	})
})



app.listen(port, () => {
	console.log('server is up on port ' + port)
})



