const mongoose = require('mongoose');
const _ = require('lodash');

const urlSchema = new mongoose.Schema({
  original_url : {
    type: String,
    trim: true
  },
  rnum : {
    type: Number
  },
  short_url: {
    type: String,
    trim: true
  }
});

urlSchema.methods.toJSON = function(){
  var url = this;
  var urlObject = url.toObject();
  return _.pick(urlObject,['original_url','short_url']);
}

const url = mongoose.model('url',urlSchema);

module.exports={
  url
};
