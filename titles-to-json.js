var fs = require('fs');

var posts = [];

var lines = fs.readFileSync('onion.txt', 'utf8').split('\n');
