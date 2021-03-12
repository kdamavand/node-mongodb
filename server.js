const express = require("express");
const bodyParser = require("body-parser");
//const cors = require("cors");
const helmet = require('helmet');
const morgan =  require('morgan');
const dotenv = require('dotenv');
dotenv.config()
//const { MONGODB_URI } = process.env
//const middlewares = require('../config/middlewares.js');

const app = express();
//dotenv.config()

//const MONGODB_URI = process.env.MONGODB_URI;
/*var corsOptions = {
  origin: "http://localhost:8081"
};
*/
app.use(helmet())
//app.use(middlewares.notFound)
//app.use(middlewares.errorHandler)
app.use(morgan('common'))
//app.use(cors(corsOptions));
//app.use(cors());
//app.options('*', cors()) // include before other routes
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
// set port, listen for requests
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || db.url;

db.mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application on port: " + PORT });
});

require("./app/routes/store.routes")(app);
require("./app/routes/user.routes")(app);

