var express = require('express');
var router = express.Router();
var Busboy = require('busboy');
var path = require('path');
var fs = require('fs');

var _DIR = './files/';
 
var Busboy = require('busboy');
/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readdir(_DIR, (err, results) => {
    res.render('index', { title: 'Express', files: results });
  });
});
router.get('/:filename', function(req, res, next){
  var filename = req.params.filename;
  res.download(_DIR+filename)
})
router.post('/', function(req, res, next){
  var busboy = new Busboy({ headers: req.headers });
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    var saveTo = path.join(_DIR,filename)
    file.pipe(fs.createWriteStream(saveTo));
  });
  busboy.on('finish', function() {
    // res.writeHead(200, { 'Connection': 'close' });
    // res.end("That's all folks!");
    res.redirect('/')
  });
  return req.pipe(busboy);
});

module.exports = router;
