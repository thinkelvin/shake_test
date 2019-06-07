var accX;
var pAccX; // last accX reading
var dAccX;
//var accXMax, accXMin;
var Level; // outliner detection
var prevLevel = 0; // previous Level change
var lvlCheckDelay = 0; // control if level check or not
var Status = 0; // keep track of the Level change

var playing;
var prevSignal;
var NbBumps;
var NbBumps_remote;
var NbBumps_sync;


var socket;
var progressBarWidth = 0;
var loadingProgress;
var logoPage;

var bkColor1 = document.getElementById("track1");
var bkColor2 = document.getElementById("track2");
var bkColor3 = document.getElementById("track3");
var bkColor4 = document.getElementById("track4");
var analyser1;



var _debug = true; // turn on/off accelerationX plot for debug

function preload() {
  track1Sound = new Howl({
    src: ['./media/track1.mp3'],
    preload: true,
    onload: function () {
      trackLoaded++;
    }
  });
  track2Sound = new Howl({
    src: ['./media/track2.mp3'],
    preload: true,
    onload: function () {
      trackLoaded++;
    }
  });
  track3Sound = new Howl({
    src: ['./media/track3.mp3'],
    preload: true,
    onload: function () {
      trackLoaded++;
    }
  });
  track4Sound = new Howl({
    src: ['./media/track4.mp3'],
    preload: true,
    onload: function () {
      trackLoaded++;
    }
  });

}

function setup() {
  analyser1 = Howler.ctx.createAnalyser();
  if (_debug) {
    document.getElementById('accGraph').style.display = "block";
  } else {
    document.getElementById('accGraph').style.display = "none";
  }

  loadingProgress = document.getElementById("loading");
  logoPage = document.getElementById("logo");

  pAccX = 0;
  bufferReady = false;
  playing = false;
  preSignal = 0;
  Bump = false;
  NbBumps = 0;
  NbBumps_remote = 0;
  NbBumps_sync = 0;
  document.getElementById("localBump").innerHTML = "Local Bumps = " + NbBumps.toString();
  window.addEventListener("devicemotion", accUpdate, true);
  // window.addEventListener("MozOrientation", accUpdate, true);
  socket = io(); // create socket connection back to hosting server
  socket.on('remoteBump', remoteBump); // handle the shake by another client
  socket.on('syncBump', syncBump);
  touchUISetup();

  var logoPageTap = new Hammer(logoPage);
  logoPageTap.on("tap", function (ev) {
    if (trackLoaded == 4) {
      logoPage.style.display = "none";
      trackStarted = false;
      screenfull.request();
    }
  });
}


function draw() {
  trackSoundSetup();
  if (trackLoaded==4) {
    soundViz();
}
  var curLimit = 25 * trackLoaded;
  if (progressBarWidth <= curLimit) {
    loadingProgress.style.width = progressBarWidth + '%';
    progressBarWidth += 5;
  }


  if (!bufferReady) { // need to fill up the buffer before computing mean and sd
    fillBuffer(dAccX);
    Level = 0;
    console.log('filling buffer...');
  } else {
    if (lvlCheckDelay == 0) {
      Level = detectLevelChange(dAccX); // +1: moveto right, -1: moveto left, 0: no shake
      lvlCheckDelay++;
      if (Level>0) { // shake is detected
        lvlCheckDelay = 40;
        NbBumps++;
        document.getElementById("localBump").innerHTML = "Local Bumps = " + NbBumps.toString();
        socket.emit('bump', "bump"); // tell server the client mobile shakes
      }
      /*
      if ((Level * prevLevel) == -1) { // A transition is detected
        lvlCheckDelay = 40;
        NbBumps++;
        document.getElementById("localBump").innerHTML = "Local Bumps = " + NbBumps.toString();
        socket.emit('bump', "bump"); // tell server the client mobile shakes
      }
      prevLevel = Level;
      */
    }
    lvlCheckDelay--;
  }
}

function remoteBump() {
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
  //dAccX = accX - pAccX;
  dAccX = Math.abs(accX-pAccX);
}