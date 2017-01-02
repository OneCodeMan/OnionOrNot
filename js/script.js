/*

The JSON format
[
    { content: #string#, sub: "nottheonion" / "theonion" }, ...
]

git push origin gh-pages

*/

function removeDuplicateObjects(arr, property) {
    var newArr = [];
    var lookup = {};

    for (var i in arr) {
        lookup[arr[i][property]] = arr[i];
    }

    for (i in lookup) {
        newArr.push(lookup[i]);
    }

    return newArr;
}

var postTitle = document.getElementById("post-title");
var onionButton = document.getElementById("onion-chosen");
var notOnionButton = document.getElementById("not-onion-chosen");
var replay = document.getElementById("replay");
var livesDisplay = document.getElementById("lives");

var req = new XMLHttpRequest();
var jsonUrl = "https://api.myjson.com/bins/1505d7";
var lives = 3;
var score = 0;
var index = 0;
var options = ["theonion", "nottheonion"];

req.open('GET', jsonUrl);
req.onload = function() {

    if (req.status === 200) {
        var jsonRawData = JSON.parse(req.responseText);

        jsonData = removeDuplicateObjects(jsonRawData, "content");

        onionButton.onclick = () => update(0);
        notOnionButton.onclick = () => update(1);
        update(null);

    } else {
        console.log("Error");
    }
};

req.send();

// updates score, updates title, and removes already used indices
var update = function(userGuess) {
    if (jsonData.length > 0) {
        if (userGuess != null) {
            if (options[userGuess] == jsonData[index].sub) {
                score++;
            } else {
                lives--;
            }
            livesDisplay.innerHTML = lives;
        }
        index = Math.floor(Math.random() * (jsonData.length - 1));

        if (lives < 1) {
            postTitle.innerHTML = "Thanks for playing. Score: " + score;
            replay.className = "btn";
            onionButton.className += " hidden";
            notOnionButton.className += " hidden";
        } else {
            postTitle.innerHTML = jsonData[index].content;
        }
        // more readable than:
        //post_title.innerHTML = score < 1 ? "Thanks for playing. Score: " + score : json_data[index].content;

        jsonData.splice(index, 1);
        livesDisplay.innerHTML = lives;
    } else {
        postTitle.innerHTML = "Thanks for playing. Score: " + score;
    }
}

replay.onclick = function() {
    window.location.reload(true);
}
