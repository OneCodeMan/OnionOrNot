/*
TODO: Clean the code up lolz
*/
function generateRandNum(min, max) {
    minimum = Math.ceil(min);
    maximum = Math.floor(max);
    return Math.floor(Math.random() * (maximum - minimum)) + minimum;
}

function generateNewPost(json_data) {
    var rand_num = generateRandNum(0, json_data.length);
    console.log("generateNew length: ", json_data.length);
    var rand_post = json_data[rand_num];
    return rand_post;
}

var post_title = document.getElementById("post-title");
var onion_button = document.getElementById("onion-chosen");
var not_onion_button = document.getElementById("not-onion-chosen");
var score_display = document.getElementById("score");

var req = new XMLHttpRequest();
var json_url = "https://api.myjson.com/bins/s474n";
var score = 0;

req.open('GET', json_url);
req.onload = function() {

    if (req.status === 200) {
        var json_data = JSON.parse(req.responseText);
        var rand_post = generateNewPost(json_data);

        post_title.innerHTML = rand_post.content;
        score_display.innerHTML = score;

        onion_button.onclick = function() {
            if (rand_post.sub === "theonion") {
                score++;
                score_display.innerHTML = score;
            } else {
                score--;
                score_display.innerHTML = score;
            }

            // update title
            rand_post = generateNewPost(json_data);
            var index = json_data.indexOf(rand_post);


            console.log("Index: ", index);
            console.log("Length of json_data: ", json_data.length);
            json_data.splice(index, 1);
            console.log("Length of json_data after splice: ", json_data.length);


            post_title.innerHTML = rand_post.content;

        }

        not_onion_button.onclick = function() {
            if (rand_post.sub === "nottheonion") {
                score++;
                score_display.innerHTML = score;
            } else {
                score--;
                score_display.innerHTML = score;
            }

            // update title
            rand_post = generateNewPost(json_data);
            var index = json_data.indexOf(rand_post);


            console.log("Index: ", index);
            console.log("Length of json_data: ", json_data.length);
            json_data.splice(index, 1);
            console.log("Length of json_data after splice: ", json_data.length);

            post_title.innerHTML = rand_post.content;
        }

    } else {
        console.log("Error");
    }
};

req.send();
