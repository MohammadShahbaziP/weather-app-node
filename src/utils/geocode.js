const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibW9oYW1tYWRzaGFoYmF6aSIsImEiOiJjazZ6N2I4NG0wcmh2M2xwZnZjZHBreWg4In0.LbuM_ybai5mJjqJ2RD69Iw&limit=1`
    request({ url, json: true }, (error, {body})=> {
        if(error) {
            callback("could not coonect to geo coding api");
        } else if(body.features.length === 0) {
            callback("the address is icorrect");
        }else {
            const data = body.features[0]
            
            callback(undefined, {
                latitude: data.center[1],
                longitude: data.center[0],
                palceName: data.place_name
            })
        }
    })
}


module.exports = geocode