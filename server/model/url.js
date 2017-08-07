const mongoose = require('mongoose');
const _ = require('lodash');

const urlSchema = new mongoose.Schema({
  url : {
    type: String,
    trim: true
  },
  rnum : {
    type: Number
  },
  hostname: {
    type: String,
    trim: true
  }
});

urlSchema.methods.toJSON = function(){
  var url = this;
  var urlObject = url.toObject();
  return _.pick(urlObject,['url','hostname']);
}

const url = mongoose.model('url',urlSchema);

module.exports={
  url
};
