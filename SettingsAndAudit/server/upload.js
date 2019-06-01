var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');

var upload = multer({dest: 'uploads'});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST');
    next();
});

app.post('/upload', upload.single('avatar'), (req, res) => {
    res.send(res.file);
})

const port = 3000;
app.listen(port);
console.log('Port:' + port);