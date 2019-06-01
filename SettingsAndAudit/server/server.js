'use strict'

const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const app = express()
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST');
  next();
});

app.post('/post', (req, res) => {
  console.log('Received request with body:');
  console.log(req.body);
  let fileName = req.body.file;
  let operationName = req.body.operation;
  fs.readFile(`data/${fileName}.json`, 'utf8', (err, data) => {
    if(err) {
      console.log(err);
      throw err;
    } else {
      switch(operationName) {
        case 'add': 
          var obj = JSON.parse(data); // current data from file
          obj.push(req.body); // add new data
          fs.writeFile(`data/${fileName}.json`, JSON.stringify(obj), (err) => {
            if (err) {
              console.log(err);
              throw err;
            } 
          console.log(`Data written to ${fileName}.json`);
          res.send(`Data written to ${fileName}.json`)
          })
          break;  
        case 'remove':
        
          break;
        case 'update':
          
          break;
        default:
      }   
    } 
  });
});

app.get('/get', (req, res) => {
  console.log('Got request for data');
  fs.readFile('data/settings.json', 'utf8', (err, data) => {
    if(err) {
      console.log(err);
      throw err;
    } else {
      res.send(data);
    }
  })
})

app.listen(3000, ()=>{
  console.log('Listening on port 3000. Post/get for settings.json and audit.json');
});