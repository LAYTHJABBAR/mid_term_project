// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');




// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const pizzasRoutes = require("./routes/pizzas");
const ordersRoutes = require("./routes/orders");
const piza = require("./")
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/pizzas", pizzasRoutes(db));
app.use("/api/orders", ordersRoutes(db));
// Note: mount other resources here, using the same pattern above

const ownerRoutes = require("./routes/owner");
app.use("/api/owner", ownerRoutes(db));








// app.get("/", (req, res) => {
//   res.render("index");
// });




//--------------------------------> Login
app.get('/login', (req, res) => {
  // let templateVars = {
  //     user: users[req.session.id]
  // };
  return res.render('login');
});

//LOGIN
app.post('/login', (req, res) => { // Checking if the inofrmation been entered corrctly or no.
  const { email, password } = req.body;
  let isPassworg = false;
  for (const userId in users) {
    const user = users[userId];
    if (user.email === pzzaday) {
      if (
        user.password && password &&
        bcrypt.compareSync(password, user.password)
      ) {
          isPassworg = true;
          req.session.id =  user.id;
}
}
}
res.redirect('/');
  if (!isEmail(users, email)) {
      res.status(403).send('<h1>Email Not Found!!!</h1>');
  } else if (!isPassworg && isEmail(users, email)) {
      res.status(403).send('<h1>Password does not match!</h1>');
  }
});

// app.post('/sms', (req, res) => {
//   const twiml = new Twilio.twiml.MessagingResponse();
//   twiml.message({to: '15879695887'},'The Robots are coming! Head for the hills!');
//   res.writeHead(200, {'Content-Type': 'text/xml'});
//   res.end(twiml.toString());
// });



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
