// Scrapes r/theonion and r/nottheonion post titles,
// Puts them in a json file.
// http://stackoverflow.com/questions/9036429/convert-object-string-to-json

var cheerio = require('cheerio');
var rp = require('request-promise');
var fsp = require('fs-promise');

var onion_url = "https://www.reddit.com/r/theonion";
var not_onion_url = "https://www.reddit.com/r/nottheonion";

function parse(html) {
    var result = '';
    var $ = cheerio.load(html);
    $("div#siteTable > div.link").each(function(idx) {
        var title = $(this).find('p.title > a.title').text().trim();
        console.log(title);
        result += title + '\n';
    });
    return result;
}

// what this do?
var append = file => content => fsp.appendFile(file, content);

rp(onion_url)
    .then(parse)
    .then(append('onion.txt'))
    .then(() => console.log('Onion Success'))
    .catch(err => console.log('Error: ', err));

rp(not_onion_url)
    .then(parse)
    .then(append('not_onion.txt'))
    .then(() => console.log('Not Onion Success'))
    .catch(err => console.log('Error: ', err));
