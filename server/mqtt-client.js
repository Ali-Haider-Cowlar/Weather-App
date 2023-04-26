const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost:1883')

client.on('connect', function () {
  client.subscribe('weather-station', function (err) {
    if (!err) {
      console.log('Subscribed to weather-station topic')
    }
  })
})

client.on('message', function (topic, message) {
  console.log('Received weather data:', message.toString())
  localStorage.setItem('weather', message.toString())
})
