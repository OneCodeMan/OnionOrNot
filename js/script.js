/*

The JSON format
[
    { content: #string#, sub: "nottheonion" / "theonion" }, ...
]

git push origin gh-pages

*/

function removeDuplicateObjects(arr, property) {
    var new_arr = [];
    var lookup = {};

    for (var i in arr) {
        lookup[arr[i][property]] = arr[i];
    }

    for (i in lookup) {
        new_arr.push(lookup[i]);
    }

    return new_arr;
}

var post_title = document.getElementById("post-title");
var onion_button = document.getElementById("onion-chosen");
var not_onion_button = document.getElementById("not-onion-chosen");
var replay = document.getElementById("replay");
var score_display = document.getElementById("score");

var req = new XMLHttpRequest();
var json_url = "https://api.myjson.com/bins/1505d7";
var score = 3;
var index = 0;
var options = ["theonion", "nottheonion"];

req.open('GET', json_url);
req.onload = function() {

    if (req.status === 200) {
        var json_data_raw = JSON.parse(req.responseText);

        json_data = removeDuplicateObjects(json_data_raw, "content");

        onion_button.onclick = () => update(0);
        not_onion_button.onclick = () => update(1);
        update(null);

    } else {
        console.log("Error");
    }
};

req.send();

// updates score, updates title, and removes already used indices
var update = function(user_guess) {
    if (json_data.length > 0) {
        if (user_guess != null) {
            if (options[user_guess] == json_data[index].sub) {
                score++;
            } else {
                score--;
            }
            score_display.innerHTML = score;
        }
        index = Math.floor(Math.random() * (json_data.length - 1));

        if (score < 1) {
            post_title.innerHTML = "Thanks for playing.";
            replay.className = "btn";
            onion_button.className += "hidden";
            not_onion_button.className += "hidden";
        } else {
            post_title.innerHTML = json_data[index].content;
        }
        // more readable than:
        //post_title.innerHTML = score < 1 ? "Thanks for playing. Score: " + score : json_data[index].content;

        json_data.splice(index, 1);
        score_display.innerHTML = score;
    } else {
        post_title.innerHTML = "Thanks for playing. Score: " + score;
    }
}

replay.onclick = function() {
    window.location.reload(true);
}
