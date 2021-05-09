const path = require('path');
const express = require('express');
const app = express();
const port = 8080;
const axios = require('axios');


//Cors stuffs
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });
  
  app.listen(port, () => {
    console.log(`CT STATS app listening at http://localhost:${port}`)
  });