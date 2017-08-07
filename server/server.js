require('./config/config');

const express = require('express');
const app = express();
const seedrandom = require('seedrandom');
const validUrl = require('valid-url');

const {mongoose} = require('./db/mongoose');
const {url} = require('./model/url');

app.get('/',(req,res) => {
  res.send("Hello world");
});

app.get('/new/*',(req,res) => {
  const requrl = req.params[0];
  if(validUrl.isHttpUri(requrl) || validUrl.isHttpsUri(requrl))
  {
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
    }
    else{
      res.status(400).send('Invalid URL');
    }
});

app.get('/:shorturl',(req,res) => {
  if(!isNaN(req.params.shorturl)){
    let rnum = Number(req.params.shorturl);
      url.findOne({rnum}).then((url) => {
        res.redirect(url.url);
      }).catch((e) => res.status(404).send(e));
    }
    else{
        res.status(400).send("Not a valid shortened url");
    }
});

app.listen(process.env.PORT,() => {
  console.log('Server started!');
});
