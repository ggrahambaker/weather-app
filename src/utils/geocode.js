const request = require('request')


const getLatLong = (location_name, callback) => {
	const base_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' 
	const access_url = '.json?access_token=pk.eyJ1IjoiZ2dyYWhhbWJha2VyIiwiYSI6ImNqenlkNW16ZTAxdG0zbW9iYnR6ZjBlamIifQ.ikMyVtXKYau08_l3IXtocw&limit=1'
	const url = base_url + encodeURIComponent(location_name) + access_url


	request({url, json: true}, (error, {body}) => {
		if (error) {
			callback('unable to connect to location service', undefined)
		} else if (body.features.length === 0) {
			callback('unable to find location, please try again', undefined)
		} else {
			const data = body
			const longit = data.features[0].center[0]
			const lat = data.features[0].center[1]
			const name = data.features[0].place_name
			const geo = {
				lat,
				longit, 
				location: name
			}
			callback(undefined, geo)
		}
	})	
}


module.exports = {
	getLatLong
}