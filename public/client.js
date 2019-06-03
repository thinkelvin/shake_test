var accX;
var pAccX; // last accX reading
var dAccX; 
var accXMax, accXMin;
var Level; // outliner detection
var prevLevel=0; // previous Level change
var lvlCheckDelay=0; // control if level check or not
var Status=0; // keep track of the Level change
var song;
var playing;
var prevSignal;
var NbBumps;
var NbBumps_remote;
var NbBumps_sync;
var FPS = 30;
var XSpeed = 1; // shifting speed of x-axis
var socket;
// variables for track
var track1Tap = false;
var track2Tap = false;
var track3Tap = false;
var track4Tap = false;
var track1Sound;

function preload() {
  track1Sound = new Howl({ src: ['./media/track1.mp3'], autoplay: false });
}

function setup() {
  frameRate(FPS);
  accXMax = -10000;
  accXMin = 10000;
  pAccX = 0;
  bufferReady = false;
  playing = false;
  preSignal = 0;
  Bump = false;
  NbBumps = 0;
  NbBumps_remote = 0;
  NbBumps_sync = 0;
  document.getElementById("localBump").innerHTML = "Local Bumps = " + NbBumps.toString();
  window.addEventListener("devicemotion", accUpdate,true);
  // window.addEventListener("MozOrientation", accUpdate, true);
  socket = io(); // create socket connection back to hosting server
  socket.on('remoteBump', remoteBump); // handle the shake by another client
  socket.on('syncBump', syncBump);
  trackSetup();

}

function trackSetup() {
  // set up touch responses
  var track1Element = document.getElementById('track1');
  var track2Element = document.getElementById('track2');
  var track3Element = document.getElementById('track3');
  var track4Element = document.getElementById('track4');
  var mc1 = new Hammer(track1Element);
  var mc2 = new Hammer(track2Element);
  var mc3 = new Hammer(track3Element);
  var mc4 = new Hammer(track4Element);
  mc1.on("tap", function (ev) {
    track1Tap = !track1Tap;
    if (track1Tap) {
      track1Element.style.backgroundColor = "black";
      track1Sound.play();
    }
    else {
      track1Element.style.backgroundColor = "#ee0a0a";
      track1Sound.pause();
    }
  });
  mc2.on("tap", function (ev) {
    track2Tap = !track2Tap;
    if (track2Tap) {
      track2Element.style.backgroundColor = "black";
    }
    else {
      track2Element.style.backgroundColor = "#25ee0a";
    }
  });
  mc3.on("tap", function (ev) {
    track3Tap = !track3Tap;
    if (track3Tap) {
      track3Element.style.backgroundColor = "black";
    }
    else {
      track3Element.style.backgroundColor = "#0accee";
    }
  });
  mc4.on("tap", function (ev) {
    track4Tap = !track4Tap;
    if (track4Tap) {
      track4Element.style.backgroundColor = "black";
    }
    else {
      track4Element.style.backgroundColor = "#e60aee";
    }
  });
}

function remoteBump(){
  NbBumps_remote++;
  document.getElementById("remoteBump").innerHTML = "Remote Bumps = " + NbBumps_remote.toString();
}

function syncBump() {
  NbBumps_sync++;
  document.getElementById("syncBump").innerHTML = "Sync Bumps = " + NbBumps_sync.toString();
}


function accUpdate(e) {
  pAccX = accX;
  accX = e.acceleration.x;
  dAccX = accX - pAccX;
}


function draw() {
  //Threshold = document.getElementById('rangeinput').value;
  
  if (!bufferReady) { // need to fill up the buffer before computing mean and sd
    fillBuffer(dAccX);
    Level=0;
    console.log('filling buffer...');
  } else {
    if (lvlCheckDelay ==0) {
      Level = detectLevelChange(dAccX); // +1: moveto right, -1: moveto left, 0: no shake
      lvlCheckDelay++;
      if ((Level * prevLevel)==-1) { // A transition is detected
        lvlCheckDelay=20;
        NbBumps++;
        document.getElementById("localBump").innerHTML = "Local Bumps = " + NbBumps.toString();
        socket.emit('bump',"bump"); // tell server the client mobile shakes
        //socket.broadcast.emit('shake',"shake");
      }
      prevLevel = Level;
    }
    lvlCheckDelay--;
  }
}


function getLevel() {
  return Level*30;
}

function getaccX() {
  //return accX;
  return dAccX;
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
    y: [getLevel()],
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
      [getaccX()],[getLevel()]
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
}, 50); // millisecond to update