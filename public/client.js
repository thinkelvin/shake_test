var accX;
var accXMax, accXMin;
var Level; // outliner detection
var prevLevel=0; // previous Level change
var lvlCheckDelay=0; // control if level check or not
var Status=0; // keep track of the Level change
var song;
var playing;
var prevSignal;
var NbBumps;
var FPS = 30;
var XSpeed = 1; // shifting speed of x-axis
var socket;

function preload() {
  //song = loadSound('song.mp3');
}

function setup() {
  frameRate(FPS);
  accXMax = -10000;
  accXMin = 10000;
  bufferReady = false;
  playing = false;
  preSignal = 0;
  Bump = false;
  NbBumps = 0;
  document.getElementById("localBump").innerHTML = "Local Bumps = " + NbBumps.toString();
  window.addEventListener("devicemotion", accUpate,true);
  socket = io(); // create socket connection back to hosting server
}

function accUpate(e) {
  accX = e.acceleration.x;
}


function draw() {
  Threshold = document.getElementById('rangeinput').value;
  
  // keep track of max/min accX for debugging
  //accX = accelerationX;
  //accX = aX;
  // if (accX > accXMax) accXMax = accX;
  // if (accX < accXMin) accXMin = accX;
  // document.getElementById("max").innerHTML = "Max = " + accXMax.toString();
  // document.getElementById("min").innerHTML = "Min = " + accXMin.toString();  
  
  if (!bufferReady) { // need to fill up the buffer before computing mean and sd
    fillBuffer(accX);
    Level=0;
    console.log('filling buffer...');
  } else {
    if (lvlCheckDelay ==0) {
      Level = detectChange(accX); // +1: moveto right, -1: moveto left, 0: no shake
      lvlCheckDelay++;
      if ((Level * prevLevel)==-1) { // A transition is detected
        lvlCheckDelay=20;
        NbBumps++;
        document.getElementById("localBump").innerHTML = "Local Bumps = " + NbBumps.toString();
        socket.emit('shake',"shake"); // tell server the client mobile shakes
      }
      prevLevel = Level;
    }
    lvlCheckDelay--;
  }
}


function getData() {
  return Level*30;
}

function getaccX() {
  return accX;
}

Plotly.plot('myDiv', [
  {
    y: [getaccX()],
    mode: 'lines',
    type: 'line',
    opacity: 0.5,
    line: {
      width: 2,
      color: 'green'
    }
  },
  {
    y: [getData()],
    mode: 'lines',
    type: 'line'
  }  

]);

var cnt = 0;
var timePlot = 1000/FPS; // update the data at FPS
var displayRange = 200; // x-axis time range
setInterval(function() {
  Plotly.extendTraces('myDiv', {
    y: [
      [getaccX()],[getData()]
    ]
  }, [0,1]); // normalize y datas into [0,1] range
  cnt+=XSpeed;
  //if (cnt > displayRange) {
    Plotly.relayout('myDiv', {
      xaxis: {
        range: [cnt -displayRange , cnt+displayRange]
      }
    });
  //}
}, 1); // millisecond to update