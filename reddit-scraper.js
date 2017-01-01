/*
Scrapes r/theonion and r/nottheonion for post titles.
Writes those titles in JSON.
Fun fact: I have to manually remove certain '[', '}', ']' characters from
the generated JSON, Not sure why they are popping up.

I use this to validate the json produced: http://jsonlint.com/
I use this to format the json produced: http://jsonviewer.stack.hu/

TODO: Figure out what line 41 does.
*/

var cheerio = require('cheerio');
var rp = require('request-promise');
var fsp = require('fs-promise');

var onionUrls = ["https://www.reddit.com/r/TheOnion",
                "https://www.reddit.com/r/TheOnion/top/?sort=top&t=all",
                "https://www.reddit.com/r/TheOnion/top/?sort=top&t=all&count=25&after=t3_4qbchk",
                "https://www.reddit.com/r/TheOnion/top/?sort=top&t=all&count=50&after=t3_3e3q4z"];

var notOnionUrls = ["https://www.reddit.com/r/nottheonion",
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

    var postsAsJSON = JSON.stringify(posts);
    return postsAsJSON;
}

var append = file => content => fsp.appendFile(file, content);

for(let i = 0; i < onionUrls.length; i++) {
    var onionUrl = onionUrls[i];
    var notOnionUrl = notOnionUrls[i];

    rp(onionUrl)
        .then(html => parse(html, "theonion"))
        .then(append('onionornotdata.json'))
        .then(() => console.log('Onion Success'))
        .catch(err => console.log('Error: ', err));

    rp(notOnionUrl)
        .then(html => parse(html, "nottheonion"))
        .then(append('onionornotdata.json'))
        .then(() => console.log('Not Onion Success'))
        .catch(err => console.log('Error: ', err));
}
