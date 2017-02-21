var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');
var multer  = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

var upload = multer({dest: "uploads/"});

app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm");
})

app.post('/file_upload', upload.single('uimage'), function (req, res) {
   var file = req.file.filename;
   var filePath = req.file.path;
   fs.readFile(filePath, function(err, data){
      fs.writeFile(file, data, function(err){
         if(err){
            console.log(err);
         }else{
            response = {message: "File uploaded successfully", filename: file};
            res.end(JSON.stringify(response));
         }
      })
   })
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})