/*
TODO: Make the GET fetch as clean as possible.
TODO: Check that you can identify each post by their "sub" property
TODO: Randomly generate a post
TODO: Display post on web page
TODO: Find a way to avoid duplication of posts? Like posts occuring again.
TODO: 
*/


var request = new XMLHttpRequest();
var json_url = "https://api.myjson.com/bins/s474n";
request.open('GET', json_url);

request.onload = function() {
    var json_data = JSON.parse(request.responseText);
};

request.send();
