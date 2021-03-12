const express = require("express");
const bodyParser = require("body-parser");
//const cors = require("cors");
const helmet = require('helmet');
const morgan =  require('morgan');
//const middlewares = require('../config/middlewares.js');

const app = express();

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
db.mongoose
  .connect(db.url, {
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

  // set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application on port: " + PORT });
});

require("./app/routes/store.routes")(app);
require("./app/routes/user.routes")(app);

