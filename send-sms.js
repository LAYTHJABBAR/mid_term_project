const accountSid = 'ACa6a5cb73f439c5384f514806bf56eb7d';
const authToken = 'c76dc6e4216b0786421c107d87fbac49';
const client = require('twilio')(accountSid, authToken);

module.exports = (toPhone, pickUpTime, name, orderDetails) => {
  client.messages.create ({
    to: toPhone,
    from: '+17786545663',
    body: `Dear ${name} your order is confirmed and will be ready to pick up in ${pickUpTime} min. details as follows: ${orderDetails}`
  })
  client.messages.create ({
    to: '+15879695887',
    from: '+17786545663',
    body: `Mr samir We have recieved an order from${name} and the order details as follows: pickup time: ${pickUpTime} min. ${orderDetails} `
  })
  .then((message) => console.log(message.sid))
};
