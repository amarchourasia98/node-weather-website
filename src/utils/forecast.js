const request = require('request')

const forecast = (latitude,longitude,callback) =>{
  
const url ='https://api.darksky.net/forecast/c947470c48834cf5f8fd8eeb416923b9/' + latitude +',' + longitude
     
    request({url, json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect weather service',undefined)
        }else if(body.error){
             callback('unable to find location',undefined)
        }else{
             callback(undefined,body.daily.data[0].summary + ' It is currently '+ body.currently.temperature +' degree out. There is a '+ body.currently.precipProbability +' % chance of rain.')
        }
    })

}
module.exports = forecast