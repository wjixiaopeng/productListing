# Product Searching System

## About me
  Xiaopeng Ji

## Overview

This project is a website for product listing. Users are allowed to input, save and search product under business processing logic. 

  * Framework: Node.js

  * Database: Mongodb

  * API Service: RESTful

## How to build and run

1. Download this project from GitHub
2. Use Terminal and change directory to current project
3. Add Dependency: npm install
4. Run this Project: npm start
5. Check on this sever: http://45.33.45.114:8080

## Parts of project

### Server Part
  * RESTful API Service
    1. GET: used for search products from database
    2. POST: used for input and save product into database

  * Efficient Transfer Model
    1. Http Model: fundamental Model to create Server without Express
    2. URL Moel: transfer http request and response by parse URL to get attribute
    	eg. This URL:http://+window.location.hostname/8080/product?name=cup&condition=new. after parse: query a new cup!

### Database & Business Processing Logic 
  * Mongoose Model: provides a straight-forward, schema-based solution to model application data. 

  * Product Mongoose Schema: {name, condition, price, description}

  * Business Processing Logic
    * Sort by clicking table header: click table header to switch all data by ascending or descending order.
    * Condition Attribute Checkbox: check mutiple choices: New, Used, Refurbished
    * Price Range:
      * greater or less: user could input single greater or less to query result
      * greater and less: user also input both minimum and maximum to query range

### UI Component & Exception Handle
  * Plain HTML Page

  * Basic CSS Stylesheet

  * Add Product Layout
    * Name: Input the name of product, otherwise system will remind user
    * Condition: Three options could be selected: New, Used, Refurbished, otherwise 'not Specifiled' is default
    * Price: Input a number to denote product's price. It should be a number and positive.
    * Description: Input the context of description of product.

  * Search Product Layout
  	* This is very flexible and advanced search, of course, you should input at least one field to search products.
    * Name: Input the name of product.
    * Condition: check single or mutliple boxes to search.
    * Price: Input minimum and maximum price 
      * minimum and maximum price shoult not be negative
      * minimum must smaller than maximum price 

### Highlights
  * Efficient Query: only one query sentence without to access database mutiple times
  
  * Sort product by Created Time, which is generated automatically

  * Online Server

### Any Thought for Improment
  1. Add more feature to upload picture

  2. Use more Business Processing Logic and make system more smart

  3. Add User login System and more security feature

  4. Improve UI component, revise HTML layout and CSS