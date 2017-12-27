var User = require('./modules/user');
var Product = require('./modules/product');
var multer = require('multer');
var express = require('express');
var url = require('url');
var http = require('http');
var fs = require('fs');
require('./config');

// app.use(multer({ dest: './uploads/',
//  rename: function (fieldname, filename) {
//    return filename;
//  },
// }));

// app.post('/api/photo',function(req,res){
//  var pro = new Product();
//  pro.img.data = fs.readFileSync(req.files.userPhoto.path)
//  pro.img.contentType = 'image/png';
//  pro.save();
// });

// create server with dealing with url

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var qdata = q.query;    // q.query not q.search
  var qpath = q.pathname;
  
  if (req.method == 'POST') {
    console.log("POST");
    // call the built-in save method to save to the database
    if (qpath == '/product') {
      var newProduct = Product({
        name : qdata.name,
      })
      newProduct.save(function(err) {
        if (err) throw err;
        console.log(qdata.name + ' created!');
        res.setHeader("Access-Control-Allow-Origin","*");
        res.end(qdata.name + ' created!');
      });
    } else {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }
  } else {
    console.log("GET");
    // if pathname is empty, rederiect to home page
    if (qpath === '/' || qpath === '/index.html') {
      var filename = './index.html';
      fs.readFile(filename, function(err, data) {
        if (err) {
          res.writeHead(404, {'Content-Type': 'text/html'});
          return res.end("404 Not Found");
        }  
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
      });
    } else if (qpath == '/product') {
      Product.find({name : qdata.name}, function(err, users) {
        if (err) throw err;
        console.log(users);
        res.setHeader("Access-Control-Allow-Origin","*");
        res.end(JSON.stringify(users));    // convert to string to transfer
      });
    } else {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }
  }
}).listen(8080);
    