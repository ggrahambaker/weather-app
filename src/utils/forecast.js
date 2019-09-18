const request = require('request')


const getForecast = (lat, longit, callback) => {
	const base_url = 'https://api.darksky.net/forecast/f9a895e6f01cc4d07231979147e4e05b/' 
	const geourl = lat + ',' + longit
	const url = base_url + geourl
	request({url, json: true}, (error, {body}) => {
		if (error) {
			callback(error, undefined)
		} else if (body.error) {
			callback(body.error, undefined)
		} else {
			const data = body
			const curr = data.currently
			callback(undefined, curr)
			
		}
	})
}


module.exports = {
	getForecast
}