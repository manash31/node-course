const request = require('request')

const forecast = (latitude, longitude, callback) => {
    //const url = 'http://api.weatherstack.com/forecast/4ef238347bd37c20acb2cd962617c11f/' + latitude + ',' + longitude
    //onst url = 'http://api.weatherstack.com/current?access_key=5542dd17b20beef71c87e9c95f16597&query=22.6811,88.4387'
    const url = 'http://api.weatherstack.com/current?access_key=4ef238347bd37c20acb2cd962617c11f&query=' + latitude + ',' + longitude

    request({ url: url, json: true }, (error, response) => {
       // console.log(response.body)
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, ' It is currently ' + response.body.current.temperature + ' degress out. There is a ' + response.body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast