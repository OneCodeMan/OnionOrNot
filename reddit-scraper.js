/*
Scrapes r/theonion and r/nottheonion for post titles.
Writes those titles in JSON.
Fun fact: I have to manually remove certain '[', '}', ']' characters,
Not sure why they are popping up.

I use this to validate the json produced: http://jsonlint.com/
I use this to format the json produced: http://jsonviewer.stack.hu/

TODO: Figure out what line 41 does.
*/

var cheerio = require('cheerio');
var rp = require('request-promise');
var fsp = require('fs-promise');

var onion_urls = ["https://www.reddit.com/r/TheOnion",
                "https://www.reddit.com/r/TheOnion/top/?sort=top&t=all",
                "https://www.reddit.com/r/TheOnion/top/?sort=top&t=all&count=25&after=t3_4qbchk",
                "https://www.reddit.com/r/TheOnion/top/?sort=top&t=all&count=50&after=t3_3e3q4z"];

var not_onion_urls = ["https://www.reddit.com/r/nottheonion",
                    "https://www.reddit.com/r/nottheonion/top/",
                    "https://www.reddit.com/r/nottheonion/top/?count=25&after=t3_54470h",
                    "https://www.reddit.com/r/nottheonion/top/?count=50&after=t3_50lswv"];
var posts = [];

function parse(html, subreddit) {
    var subreddit = subreddit;
    var $ = cheerio.load(html);

    $("div#siteTable > div.link").each(function(idx) {
        var title = $(this).find('p.title > a.title').text().trim();
        posts.push({ sub: subreddit, content: title });
    });

    var posts_as_json = JSON.stringify(posts);
    return posts_as_json;
}

var append = file => content => fsp.appendFile(file, content);

for(let i = 0; i < onion_urls.length; i++) {
    var onion_url = onion_urls[i];
    var not_onion_url = not_onion_urls[i];

    rp(onion_url)
        .then(html => parse(html, "theonion"))
        .then(append('onionornotdata.json'))
        .then(() => console.log('Onion Success'))
        .catch(err => console.log('Error: ', err));

    rp(not_onion_url)
        .then(html => parse(html, "nottheonion"))
        .then(append('onionornotdata.json'))
        .then(() => console.log('Not Onion Success'))
        .catch(err => console.log('Error: ', err));
}
