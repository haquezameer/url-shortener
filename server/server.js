require('./config/config');

const express = require('express');
const app = express();
const seedrandom = require('seedrandom');
const validUrl = require('valid-url');

const {mongoose} = require('./db/mongoose');
const {url} = require('./model/url');

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res) => {
  res.sendFile(__dirname + '/views/indexMod.html');
});

app.get('/new/*',(req,res) => {
  const original_url = req.params[0];
  if(validUrl.isHttpUri(original_url) || validUrl.isHttpsUri(original_url))
  {
      const hostname = req.get('host');
      const protocol = req.protocol;
      Math.seedrandom(original_url);
      const now = Date.now();
      const rnum = Math.floor(Math.random() * (now/10000000));
      const short_url = protocol + '://' + hostname + '/' + rnum;
      var newurl = new url({
            original_url,
            rnum,
            short_url
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
        res.redirect(url.original_url);
      }).catch((e) => res.status(404).send(e));
    }
    else{
        res.status(400).send("Not a valid shortened url");
    }
});

app.listen(process.env.PORT,() => {
  console.log(`Server started at localhost:${process.env.PORT}`);
});
