const request = require('request')

const forcast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/1a0dc8fe88092ccf46b07bf62357e8b4/${latitude}, ${longitude}?units=si`
    request({ url, json:true }, (error, {body}) => {
        if(error) {
            callback("could not connect to the weather services!");
        } else if(body.error) {
            callback("could not find the location!");
        } else {
            const data = body.currently
            callback(undefined, `${body.daily.data[0].summary} It's currently ${data.temperature} degree out. There is ${data.precipProbability}% chance of rain.`)
        }
    })

}

module.exports = forcast