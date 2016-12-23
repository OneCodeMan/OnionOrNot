// Scrapes r/theonion and r/nottheonion post titles,
// Puts them in a json file

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
