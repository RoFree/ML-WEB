// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Real time Object Detection using YOLO and p5.js
=== */

var db = firebase.firestore();
let video;
let yolo;
let status;
let objects = [];
var check = "null"
function setup() {
  createCanvas(320, 240);
  video = createCapture(VIDEO);
  video.size(320, 240);

  // Create a YOLO method
  yolo = ml5.YOLO(video, startDetecting);

  // Hide the or iginal video
  video.hide();
  status = select('#status');
}

function draw() {
  image(video, 0, 0, width, height);
  for (let i = 0; i < objects.length; i++) {
    noStroke();
    fill(0, 255, 0);
    text(objects[i].className, objects[i].x * width, objects[i].y * height - 5);
    noFill();
    strokeWeight(4);
    stroke(0, 255, 0);
    rect(objects[i].x * width, objects[i].y * height, objects[i].w * width, objects[i].h * height);
  }
}

function startDetecting() {
  status.html('Model loaded!');
  detect();
}

function detect() {
  yolo.detect(function(err, results) {
    objects = results;
    db.collection("users").doc("test").get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
    check = 
   // if (localStorage.getItem("log") == results){
   //   window.location.assign("secret.html");
   // }
    detect();
  });
}

