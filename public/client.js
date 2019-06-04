


var playing;
var prevSignal;
var NbBumps;
var NbBumps_remote;
var NbBumps_sync;
var FPS = 30;
var XSpeed = 1; // shifting speed of x-axis
var socket;


function preload() {
  track1Sound = new Howl({ src: ['./media/track1.mp3'], autoplay: true, onload: function(){track1Ready=true;} });
  track2Sound = new Howl({ src: ['./media/track2.mp3'], autoplay: true, onload: function(){track2Ready=true;} });
  track3Sound = new Howl({ src: ['./media/track3.mp3'], autoplay: true, onload: function(){track3Ready=true;}  });
  track4Sound = new Howl({ src: ['./media/track4.mp3'], autoplay: true, onload: function(){track4Ready=true;}  });      
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
  trackTouchSetup();
}

function draw() {
  trackSoundSetup();

  if (!bufferReady) { // need to fill up the buffer before computing mean and sd
    fillBuffer(dAccX);
    Level = 0;
    console.log('filling buffer...');
  } else {
    if (lvlCheckDelay == 0) {
      Level = detectLevelChange(dAccX); // +1: moveto right, -1: moveto left, 0: no shake
      lvlCheckDelay++;
      if ((Level * prevLevel) == -1) { // A transition is detected
        lvlCheckDelay = 20;
        NbBumps++;
        document.getElementById("localBump").innerHTML = "Local Bumps = " + NbBumps.toString();
        socket.emit('bump', "bump"); // tell server the client mobile shakes
        //socket.broadcast.emit('shake',"shake");
      }
      prevLevel = Level;
    }
    lvlCheckDelay--;
  }
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
  //pAccX = accX;
  accX = e.acceleration.x;
  dAccX = accX;
  //dAccX = accX - pAccX;
}



