const express = require('express');
const app = express();
const seedrandom = require('seedrandom');
const {mongoose} = require('./db/mongoose');
const {url} = require('./model/url');

app.get('/',(req,res) => {
  res.send("Hello world");
});

app.get('/new/*',(req,res) => {
  const requrl = req.params[0];
  let hostname = req.hostname;
  Math.seedrandom(requrl);
  const now = Date.now();
  const rnum = Math.floor(Math.random() * (now/10000000));
  hostname = hostname + ':3000/' + rnum;
    var newurl = new url({
        url : requrl,
        rnum : rnum,
        hostname : hostname
  });
    newurl.save().then((savedurl) => {
        res.send(savedurl);
    }).catch((e) => res.send(e));
});

app.get('/:shorturl',(req,res) => {
  if(!isNaN(req.params.shorturl)){
    let hostname = req.hostname;
      console.log("This is a number");
      url.findOne({hostname})
    }
      else{
        res.send("Not a number");
    }
});

app.listen('3000',() => {
  console.log('Server started!');
});
