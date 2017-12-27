var User = require('./modules/user');
var Product = require('./modules/product');
var url = require('url');
var http = require('http');
var fs = require('fs');
require('./config');

// create server dealing with url
http.createServer(function (req, res) {
  if (req.method === 'POST') {
    return addProduct(req, res);
  } else if (req.method === 'GET') {
    return searchProduct(req, res);
  } else {
  	// if server did not return anything, we should handle expection: NOT FOUND 404
  	notFound(res);
  }
}).listen(8080);


// add product function
function addProduct(req, res) {
  var q = url.parse(req.url, true);
  var qdata = q.query;    // q.query not q.search
  var qpath = q.pathname;
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
  } 
};

// serach product function:
function searchProduct(req, res) {
  var q = url.parse(req.url, true);
  var qdata = q.query;    // q.query not q.search
  // if pathname is empty, rederiect to home page
  var qpath = q.pathname === '/' ? '/index.html': q.pathname;

  // console.log(qpath);
  if (qpath === '/product') {
    Product.find({name : qdata.name}, function(err, products) {
      if (err) throw err;
      res.setHeader("Access-Control-Allow-Origin","*");
      res.end(JSON.stringify(products));    // convert to string to transfer
    });
  } else {
  	fs.readFile('.' + qpath, function(err, data) {
      if (err) notFound(res);
      // style.css should set the type
      if (qpath.split('.').pop() === 'css') {
      	res.writeHead(200, {'Content-Type': 'text/css'});
      } else {
	    res.writeHead(200, {'Content-Type': 'text/html'});
	  }
      res.write(data);
      return res.end();
    });
  }
};

// not found function:
function notFound(res) {
  res.writeHead(404, {'Content-Type': 'text/html'});
  return res.end("404 Not Found");
};