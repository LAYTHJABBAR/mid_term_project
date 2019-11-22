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
  router.post("/", (req, res) => {
    res.send();
    const owner = 'Samir'
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    console.log(req.body)
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.>>>>>>')

    sendSMS(req.body.phone, req.body.total_time, req.body.name, req.body.order_item);
  });
  return router;
};

