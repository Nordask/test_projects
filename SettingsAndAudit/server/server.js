'use strict'

const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const app = express()
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, file');
  res.header('Access-Control-Allow-Methods', 'POST,GET');
  
 /*
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Credentials", "true");
  response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization, file");
  */
  //res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
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
        case 'delete':
          var obj = JSON.parse(data); // current data from file
          var name = req.body.name;
          var newArr = obj.filter(item => {
            return item.name !== name;
          });
          fs.writeFile(`data/${fileName}.json`, JSON.stringify(newArr), (err) => {
            if (err) {
              console.log(err);
              throw err;
            } 
          console.log(`Data written to ${fileName}.json`);
          res.send(`Data with name ${name} was removed from ${fileName}.json`)
          })
          break;
        case 'update':
          var obj = JSON.parse(data); // current data from file
          var name = req.body.name;
          var newArr = obj.filter(item => {
            return item.name == name;
          });
          let i = obj.indexOf(newArr[0]);
          obj[i].value = req.body.value;
          obj[i].type = req.body.type;
          
          fs.writeFile(`data/${fileName}.json`, JSON.stringify(obj), (err) => {
            if (err) {
              console.log(err);
              throw err;
            } 
          console.log(`Data was updated for ${fileName}.json`);
          res.send(`Data with name ${name} was was updated for ${fileName}.json`)
          })
          break;
        default:
      }   
    } 
  });
});

app.get('/get', (req, res) => {
  console.log('Got request for data');
  //console.log(req.originalUrl);
  console.log(req.query);
  let fileName = req.query.file;
  fs.readFile(`data/${fileName}.json`, 'utf8', (err, data) => {
    if(err) {
      console.log(err);
      throw err;
    } else {
      console.log(`Data from ${fileName}.json was sended`);
      res.send(data);
    }
  })
})

app.listen(3000, ()=>{
  console.log('Listening on port 3000. Post/get for settings.json and audit.json');
});