/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const sendSMS = require('../send-sms');



module.exports = (db) => {
  function createCustomer(customerData) {
    return db.query(`
        INSERT INTO customers (
        name, phone)
        VALUES (
        '$1', '$2')
        RETURNING *;
    `, [customerData.name, customerData.phone])
    .then(rows => rows[0])
}

function createOrder(orderData) {
  return db.query(`
      INSERT INTO orders (
        customer_id, total_price,  order_date,  order_time,   pick_up_time)
      VALUES (
      '$1', '$2', '$3', '$4', '$5')
      RETURNING *;
  `, [orderData.customer_id, orderData.total_price, orderData.order_date, orderData.order_time, orderData.pick_up_time])
  .then(rows => rows[0])
}


router.post("/", (req, res) => {
  const customerDetails = {
   name: req.body.name,
   phone: req.body.phone
  };
  createCustomer(customerDetails)
  .then((createdCustomer) => {
    const orderData = {
      customer_id:  createdCustomer.id,
      total_price: req.body.total_price,
      order_date: new Date(),//'2019-11-22',
      order_time: req.body.order_time,
      pick_up_time: req.body.total_time
   }
   return createOrder(orderData)
  })
  .then(row => {
    sendSMS(req.body.phone, req.body.total_time);
    res.json();
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
    });
});
  return router;
};


