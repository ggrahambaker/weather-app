console.log('cool')




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

message1.textContent = ''


weatherForm.addEventListener('submit', (e) => {
	e.preventDefault()
	message1.textContent = ''
	message2.textContent = ''
	
	const loc = search.value
	if (loc === '') {
		return console.log('you must submit a location')
	}

	const queryString = 'http://localhost:3000/weather?address=' + loc
	message1.textContent = 'LOADING...'
	fetch(queryString).then((response) => {
		
		response.json().then((data) => {
			if (data.err) {
				message1.textContent = data.err

			} else {
				console.log(data)
				message1.textContent = data.location
				message2.textContent = data.forecast.apparentTemperature
					
			}
			
		})		
	})


})

