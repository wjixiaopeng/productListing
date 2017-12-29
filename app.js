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
  	return notFound(res);
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
      condition: qdata.condition,
      price: qdata.price,
      description: qdata.description
    })
    console.log(newProduct);
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

  if (qpath === '/product') {
    return filterSearch(qdata, res);
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

function filterSearch(qdata, res) {
  // use query list to collect all query field: name, condition, price
  var query = [];
  // name query
  if ('name' in qdata) {
    var n_query = {"name" : qdata.name};
    query.push(n_query);
  }
  // condition query with check boxs
  if ('condition' in qdata) {
    var cons = qdata.condition.split(" "); // not split by "+"
    var temp = {"$in" : cons};
    var c_query = {"condition" : temp};
    query.push(c_query);
  }
  // price query with 'range'
  if ('price' in qdata) {
    var range = qdata.price.split("->");
    var temp = {"$gt" : range[0], "$lt" : range[1]};
    var p_query = {"price": temp}; 
    query.push(p_query);
  } 
  // price query with 'greater than'
  else if ('lowPrice' in qdata) {
    var temp = {"$gt" : qdata.lowPrice};
    var p_query = {"price": temp}; 
    query.push(p_query);
  } 
  // price query with 'less than'
  else if ('highPrice' in qdata) {
    var temp = {"$lt" : qdata.highPrice};
    var p_query = {"price": temp}; 
    query.push(p_query);
  }
  // call find $ and to query all filter search
  Product.find({"$and" : query}, function(err, products) {
    if (err) throw err;
    res.setHeader("Access-Control-Allow-Origin","*");
    res.end(JSON.stringify(products));    // convert to string to transfer
  });
};

// not found function:
function notFound(res) {
  res.writeHead(404, {'Content-Type': 'text/html'});
  return res.end("404 Not Found");
};