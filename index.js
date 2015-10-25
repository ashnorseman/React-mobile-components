/**
 * Server
 */


'use strict';

var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    port = process.env.PORT || 9090;

http.createServer(function(req, res) {
  var uri = url.parse(req.url).pathname,
      filename = path.join(__dirname, 'build', uri);

  fs.exists(filename, function(exists) {
    var extension;

    if(!exists) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('404 Not Found\n');
      res.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) {
      filename += '/index.html';
    }

    extension = path.extname(filename).replace(/^\./, '');

    fs.readFile(filename, 'binary', function(err, file) {
      var mimeType = {
            html: 'text/html',
            jpeg: 'image/jpeg',
            jpg: 'image/jpeg',
            png: 'image/png',
            js: 'text/javascript',
            css: 'text/css'
          };

      if (err) {
        res.writeHead(500, {
            'Content-Type': 'text/plain'
          });
        res.write(err + '\n');
        res.end();
        return;
      }

      res.writeHead(200, {
          'Content-Type': mimeType[extension] || 'text/plain'
        });
      res.write(file, 'binary');
      res.end();
    });
  });
}).listen(parseInt(port, 10));