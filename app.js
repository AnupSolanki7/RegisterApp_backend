const express = require('express');
const userRoute = require('./app/routes/user.route');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors"); 
const port = 3000; 
require('./config/sequelize')


app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cors());

app.use("/user", userRoute);

// Define a route
app.get('/', (req, res) => {
  return res.send({
    success: true,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});