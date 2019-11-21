const accountSid = 'ACa6a5cb73f439c5384f514806bf56eb7d';
const authToken = 'c76dc6e4216b0786421c107d87fbac49';
const client = require('twilio')(accountSid, authToken);

module.exports = (toPhone, pickUpTime) => {
  client.messages.create ({
    to: toPhone,
    from: '+17786545663',
    body: `your order is confirmed and will be ready to pick up in ${pickUpTime} min.`
  })
  .then((message) => console.log(message.sid))
};
