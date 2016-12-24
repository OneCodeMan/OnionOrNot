/*
Scrapes r/theonion and r/nottheonion for post titles.
Writes those titles in JSON.

TODO: Find a way to make the sub distinct.
*/

var cheerio = require('cheerio');
var rp = require('request-promise');
var fsp = require('fs-promise');

var onion_url = "https://www.reddit.com/r/theonion";
var not_onion_url = "https://www.reddit.com/r/nottheonion";
var posts = [];

function parse(html) {
    var $ = cheerio.load(html);

    $("div#siteTable > div.link").each(function(idx) {
        var title = $(this).find('p.title > a.title').text().trim();
        var post_object = '{ "sub" : "theonion", "title" : "' + title + '"}';
        console.log(post_object);
        posts.push(post_object);
    });

    var posts_as_json = JSON.stringify(posts);
    return posts_as_json;
}

// what this do?
var append = file => content => fsp.appendFile(file, content);

rp(onion_url)
    .then(parse)
    .then(append('onion.json'))
    .then(() => console.log('Onion Success'))
    .catch(err => console.log('Error: ', err));

rp(not_onion_url)
    .then(parse)
    .then(append('not_onion.json'))
    .then(() => console.log('Not Onion Success'))
    .catch(err => console.log('Error: ', err));
