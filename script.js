xCoordinate = 0;
yCoordinate = 0;
width = 0;
height = 0;
apple = "";
toNumber = "";
speakingData = "";

function preload() {
  apple = loadImage("apple.png");
}

drawApple = "";

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {
  console.log(event); 
  data = event.results[0][0].transcript;
  document.getElementById("status").innerHTML = "The speech has been recognized: " + data;
  toNumber = Number(data);
  if(Number.isInteger(toNumber)) {
    document.getElementById("status").innerHTML = "Started drawing";
    drawApple = "set";
  }
  else {
    document.getElementById("status").innerHTML = "Try again"
  }
}

function setup() {
  width = window.innerWidth;
  height = window.innerHeight;
  createCanvas(width, height-150);
  canvas.position(50, 130);
}

function draw() {
  if(drawApple == "set") {
    for(var i = 1; i <= toNumber; i++) {
      xCoordinate = Math.floor(Math.random()*670);
      yCoordinate = Math.floor(Math.random()*400);
      image(apple, xCoordinate, yCoordinate, 40, 40);
    }
    document.getElementById("status").innerHTML = toNumber + " apples are drawn";
    speakingData = toNumber + "apples have been drawn"
    speak();
    drawApple = "";
  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speakingData);

    synth.speak(utterThis);

    speakingData = "";
}
