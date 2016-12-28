/*

The JSON format
[
    { content: #string#, sub: "nottheonion" / "theonion" }, ...
]

*/

var post_title = document.getElementById("post-title");
var onion_button = document.getElementById("onion-chosen");
var not_onion_button = document.getElementById("not-onion-chosen");
var score_display = document.getElementById("score");

var req = new XMLHttpRequest();
var json_url = "https://api.myjson.com/bins/s474n";
var score = 0;
var index = -1;
var options = ["theonion", "nottheonion"];

req.open('GET', json_url);
req.onload = function() {

    if (req.status === 200) {
        json_data = JSON.parse(req.responseText);

        onion_button.onclick = function() { update(0); }
        not_onion_button.onclick = function() { update(1); }
        update(null);

    } else {
        console.log("Error");
    }
};

req.send();

// updates score, updates title, and removes already used indices
var update = function(user_guess) {
    if (user_guess != null) {
        if (options[user_guess] == json_data[index].sub) {
            score++;
        } else {
            score--;
        }
        score_display.innerHTML = score;
    }
    index = Math.floor(Math.random() * (json_data.length + 1));
    post_title.innerHTML = json_data[index].content;
    json_data.splice(index, 1);
    score_display.innerHTML = score;
}
