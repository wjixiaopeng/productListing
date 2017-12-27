var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var productSchema = new Schema({
  name: String,
  created_at: Date,
  img:{
    data: Buffer,
    contentType: String
  }
});

// on every save, add the date
productSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

// the schema is useless so far
// we need to create a model using it
var Porduct = mongoose.model('Porduct', productSchema);

// make this available to our users in our Node applications
module.exports = Porduct;