const api_key = 'b7554f19ca594bc2383b9d5ee9d36cec'

// use api_key to get zipcode
// const get_lat = async (zipcode, countrycode) => {
//     const response = await fetch (`http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},${countrycode}&appid=${api_key}`)
//     const data = await response.json()
//     const lat = data.lat
//     return lat
// }

// const get_lon = async (zipcode, countrycode) => {
//     const response = await fetch (`http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},${countrycode}&appid=${api_key}`)
//     const data = await response.json()
//     const lon = data.lon
//     return lon
// }

// const get_weather = async (zipcode, countrycode) => {
//     const lat = await get_lat(zipcode, countrycode)
//     const lon = await get_lon(zipcode, countrycode)
//     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
//     const data = await response.json()
//     const weather = {
//         'country': data.sys.country,
//         'city': data.name,
//         'high': data.main.temp_max,
//         'low': data.main.temp_min,
//         'humidity': data.main.humidity,
//         'forcast': data.weather[0].description
//     }

//     // add api info to each box
//     const city_name = document.createElement('p')
//     city_name.innerText = weather.city
//     const div_element = document.querySelector('.a')
//     div_element.append(city_name)
// }

// created elements
const city_name = document.createElement('p')
const country_name = document.createElement('p')
const current_high = document.createElement('p')
const current_low = document.createElement('p')
const current_humidity = document.createElement('p')
const current_forcast = document.createElement('p')



// location to append information
const title = document.querySelector('.a')
const title_2 = document.querySelector('.a')
const hot = document.querySelector('.b')
const cold = document.querySelector('.c')
const day = document.querySelector('.d')
const wet = document.querySelector('.e')

// class names for <p>
current_high.className = "high"
current_low.className = 'low'
current_forcast.className = 'forcast'
current_humidity.className = 'humidity'


// main function
const form_data = document.getElementById('search')
form_data.addEventListener('submit', async (event) => {
    event.preventDefault()
    const zipcode = document.querySelector('#zipcode').value
    const countrycode = document.querySelector('#countrycode').value
    const response = await fetch (`http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},${countrycode}&appid=${api_key}`)
    const data = await response.json()
    const lat = data.lat
    const lon = data.lon
    const response_2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
    const data_2 = await response_2.json()
    const weather = {
        'country': data_2.sys.country,
        'city': data_2.name,
        'high': data_2.main.temp_max,
        'low': data_2.main.temp_min,
        'humidity': data_2.main.humidity,
        'forcast': data_2.weather[0].description
    }

    // converting Kelvin to Fahrenheit
    high_f = (weather['high']-273.15)*9/5+31
    low_f = (weather['low']-273.15)*9/5+32

    // add api info to each box
    city_name.innerText = weather['city'] + ','
    country_name.innerText = weather['country']
    current_high.innerText = Math.ceil(high_f)
    current_low.innerText = Math.ceil(low_f)
    current_forcast.innerText = weather['forcast']
    current_humidity.innerText = weather['humidity'] + '%'


    // appending to <p>
    title.append(city_name)
    title_2.append(country_name)
    hot.append(current_high)
    cold.append(current_low)
    wet.append(current_humidity)
    day.append(current_forcast)

})