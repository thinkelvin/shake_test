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
var progressBarWidth1 = 0;
var progressBarWidth2 = 0;
var progressBarWidth3 = 0;
var progressBarWidth4 = 0;
var progressOffset = 100;
var loadingProgress1;
var loadingProgress2;
var loadingProgress3;
var loadingProgress4;
var landingPage;

var track1Viz;
var track2Viz;
var track3Viz;
var track4Viz;
var analyser1;
var bufferLength1;
var dataArray1;

var _debug = false; // turn on/off accelerationX plot for debug

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
  track1Viz = document.getElementById("track1Viz");
  track2Viz = document.getElementById("track2Viz");
  track3Viz = document.getElementById("track3Viz");
  track4Viz = document.getElementById("track4Viz");
  // bkColor2 = document.getElementById("track2");
  // bkColor3 = document.getElementById("track3");
  // bkColor4 = document.getElementById("track4");
  analyser1 = Howler.ctx.createAnalyser();
  Howler.masterGain.connect(analyser1);
  analyser1.connect(Howler.ctx.destination);
  analyser1.fftSzie = 256;
  bufferLength1 = analyser1.frequencyBinCount;
  dataArray1 = new Uint8Array(bufferLength1);

  if (_debug) {
    document.getElementById('accGraph').style.display = "block";
  } else {
    document.getElementById('accGraph').style.display = "none";
  }

  loadingProgress1 = document.getElementById("loading1");
  loadingProgress2 = document.getElementById("loading2");
  loadingProgress3 = document.getElementById("loading3");
  loadingProgress4 = document.getElementById("loading4");
  landingPage = document.getElementById("landingPage");

  pAccX = 0;
  bufferReady = false;
  playing = false;
  preSignal = 0;
  Bump = false;
  NbBumps = 0;
  NbBumps_remote = 0;
  NbBumps_sync = 0;
  //document.getElementById("localBump").innerHTML = "Local Bumps = " + NbBumps.toString();
  window.addEventListener("devicemotion", accUpdate, true);
  // window.addEventListener("MozOrientation", accUpdate, true);
  socket = io(); // create socket connection back to hosting server
  socket.on('remoteBump', remoteBump); // handle the shake by another client
  socket.on('syncBump', syncBump);
  touchUISetup();

  var landingPageTap = new Hammer(landingPage);
  landingPageTap.on("tap", function (ev) {
    if (trackLoaded == 4) {
      landingPage.style.display = "none";
      trackStarted = false;
      screenfull.request();
    }
  });
}


function draw() {
  trackSoundSetup();

  soundViz();
  //var curLimit = 25 * trackLoaded;
  if (trackLoaded >0 && progressBarWidth1 <= 100) {
    loadingProgress1.style.width = progressBarWidth1 + '%';
    progressBarWidth1 += 5;
  }
  if (trackLoaded >1 && progressBarWidth2 <= 100) {
      loadingProgress2.style.width = progressBarWidth2 + '%';
      progressBarWidth2 += 5;
  }
  if (trackLoaded >2 && progressBarWidth3 <= 100) {
    loadingProgress3.style.width = progressBarWidth3 + '%';
    progressBarWidth3 += 5;
  }
    if (trackLoaded >3 && progressBarWidth4 <= 100) {
      loadingProgress4.style.width = progressBarWidth4 + '%';
      progressBarWidth4 += 5;
    }


  if (!bufferReady) { // need to fill up the buffer before computing mean and sd
    fillBuffer(dAccX);
    Level = 0;
    //console.log('filling buffer...');
  } else {
    if (lvlCheckDelay == 0) {
      Level = detectLevelChange(dAccX); // +1: moveto right, -1: moveto left, 0: no shake
      lvlCheckDelay++;
      if (Level > 0) { // shake is detected
        lvlCheckDelay = 20;
        NbBumps++;
        document.getElementById("localBump").innerHTML = NbBumps.toString();
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
  document.getElementById("remoteBump").innerHTML = NbBumps_remote.toString();
}

function syncBump() {
  NbBumps_sync++;
  document.getElementById("syncBump").innerHTML = NbBumps_sync.toString();
}


function accUpdate(e) {
  pAccX = accX;
  accX = e.acceleration.x;
  //dAccX = accX - pAccX;
  dAccX = Math.abs(accX - pAccX);
  if (dAccX < 3) dAccX=0;
}