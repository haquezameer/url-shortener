const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/urlshort');

const url = mongoose.model('url',{
  url : {
    type: String,
    trim: true
  }
});

const newurl = new url({
  url : 'https://google.co.in'
});

newurl.save().then((url) => {
  console.log(url);
}).catch((e) => {
  console.log(e);
});
