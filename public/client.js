var accX;
var pAccX; // last accX reading
var dAccX;
//var accXMax, accXMin;
var Level; // outliner detection
var prevLevel = 0; // previous Level change
var lvlCheckDelay = 0; // control if level check or not
var Status = 0; // keep track of the Level change

// var playing;
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
var loadingProgress1BK;
var loadingProgress2BK;
var loadingProgress3BK;
var loadingProgress4BK;
var landingPage;
var barStep = 4;
var barProgressOffset = 25;
var allPlayed = 0;
var projectName;

var track1Viz;
var track2Viz;
var track3Viz;
var track4Viz;
var analyser1;
var bufferLength1;
var dataArray1;
var mainPage;
var clientID;

var globalTrackTimes = []; // collect all active track shake times received
var localTrackTimes = []; // collect all local inactive shake times
var trackCheck = -1;

var _debug = false; // turn on/off accelerationX plot for debug

function preload() {
  track1Sound = new Howl({
    src: ['./media/track1.mp3'],
    volume: 0.5,
    preload: true,
    onload: function () {
      trackLoaded++;
    }
  });
  track2Sound = new Howl({
    src: ['./media/track2.mp3'],
    volume: 0.5,
    preload: true,
    onload: function () {
      trackLoaded++;
    }
  });
  track3Sound = new Howl({
    src: ['./media/track3.mp3'],
    volume: 0.5,
    preload: true,
    onload: function () {
      trackLoaded++;
    }
  });
  track4Sound = new Howl({
    src: ['./media/track4.mp3'],
    volume: 0.5,
    preload: true,
    onload: function () {
      trackLoaded++;
    }
  });

}

function setup() {
  mainPage = document.getElementById("main");
  track1Viz = document.getElementById("track1Viz");
  track2Viz = document.getElementById("track2Viz");
  track3Viz = document.getElementById("track3Viz");
  track4Viz = document.getElementById("track4Viz");

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

  landingPage = document.getElementById("landingPage");
  projectName = document.getElementById("projectName");
  loadingProgress1 = document.getElementById("loading1");
  loadingProgress2 = document.getElementById("loading2");
  loadingProgress3 = document.getElementById("loading3");
  loadingProgress4 = document.getElementById("loading4");

  loadingProgress1BK = document.getElementById("loading1bk");
  loadingProgress2BK = document.getElementById("loading2bk");
  loadingProgress3BK = document.getElementById("loading3bk");
  loadingProgress4BK = document.getElementById("loading4bk");

  pAccX = 0;
  bufferReady = false;
  // playing = false;
  preSignal = 0;
  Bump = false;
  NbBumps = 0;
  NbBumps_remote = 0;
  NbBumps_sync = 0;
  //document.getElementById("localBump").innerHTML = "Local Bumps = " + NbBumps.toString();
  window.addEventListener("devicemotion", accUpdate, true);
  // window.addEventListener("MozOrientation", accUpdate, true);
  socket = io(); // create socket connection back to hosting server
  socket.on('initClient', initClient);
  socket.on('trackSync', trackSync); // check if the active track is wanted
  socket.on('trackLocal', trackLocal);
  touchUISetup();

  var landingPageTap = new Hammer(landingPage);
  landingPageTap.on("tap", function (ev) {
    if (trackLoaded == 4 && allPlayed) {
      landingPage.style.display = "none";
      trackStarted = false;
      mainPage.style.display = "block";
      screenfull.request();
    }
  });

  // Initialize four tracks sync times
  while (globalTrackTimes.push([]) < 4);
  while (localTrackTimes.push([]) < 4);
}



function draw() {

  if (!allPlayed) {
    openingAnimation();
  }
  trackSoundUpdate();
  soundViz();

  // console.log(trackOn);
  // if (trackTapped) console.log(trackIDs[trackOn]);

  if (!bufferReady) { // need to fill up the buffer before computing mean and sd
    fillBuffer(dAccX);
    Level = 0;
    //console.log('filling buffer...');
  } else {
    if (lvlCheckDelay == 0) {
      Level = detectLevelChange(dAccX); // +1: moveto right, -1: moveto left, 0: no shake
      lvlCheckDelay++;
      if (Level > 0 && trackOn >= 0) { // shake with track tapped
        lvlCheckDelay = 20;
        NbBumps++;
        var trackInfo = {
          trackID: trackOn
        }
        if (!trackMuted[trackOn]) { // Tell the server to broadcast if an active track is tapped and shaken
          socket.emit('trackShake', trackInfo); // tell server the client mobile shakes
        } else {
          // Check if the inactive track should be enabled
          socket.emit('trackLocal', trackInfo);
          //trackLocal();
          //trackCheck = trackOn;
        }
        trackDeHighlight();
      }
    }
    lvlCheckDelay--;
  }

  trackMatch();
}

function trackMatch() {
  if (trackCheck >= 0) {
    var localLen = localTrackTimes[trackCheck].length;
    var globalLen = globalTrackTimes[trackCheck].length;
    if (localLen > 0 && globalLen > 0) {
      var t1 = localTrackTimes[trackCheck].pop();
      var t2 = globalTrackTimes[trackCheck].pop();
      if (Math.abs(t1 - t2) < 1000) { // match within 1 second of shake
        trackMuted[trackCheck] = false;
        trackCheck = -1;
      }
    }
  }

}

function trackSync(data) {
  // Remember the time when active track is shaken
  var theTrack = data.trackID;
  // if (trackMuted[theTrack]) { // No need to remember if the track is not muted
  var curTime = Date.now();
  globalTrackTimes[theTrack].push(curTime);
  
  // }

}

function trackLocal(data) {
  var curTime = Date.now();
  trackCheck = data.trackID;
  localTrackTimes[trackCheck].push(curTime);
}

function trackDeHighlight() {
  if (trackOn >= 0) {
    switch (trackOn) {
      case 0:
        track1Element.style.backgroundColor = "hsl(0, 100%, 30%)";
        break;
      case 1:
        track2Element.style.backgroundColor = "hsl(113, 100%, 30%)";
        break;
      case 2:
        track3Element.style.backgroundColor = "hsl(189, 100%, 30%)";
        break;
      case 3:
        track4Element.style.backgroundColor = "hsl(298, 100%, 30%)";
        break;
    }
    trackTap[trackOn] = false;
    trackOn = -1;
  }
}

function openingAnimation() {
  if (trackLoaded > 0 && progressBarWidth1 <= 100) {
    loadingProgress1.style.width = progressBarWidth1 + '%';
    progressBarWidth1 += barStep;
  }
  if (trackLoaded > 0 && progressBarWidth1 <= 200 && progressBarWidth1 > 100) {
    loadingProgress1BK.style.width = (progressBarWidth1 - 100) + '%';
    progressBarWidth1 += barStep;
  }
  if (trackLoaded > 1 && progressBarWidth2 <= 100 && progressBarWidth1 > barProgressOffset) {
    loadingProgress2.style.width = progressBarWidth2 + '%';
    progressBarWidth2 += barStep;
  }
  if (trackLoaded > 1 && progressBarWidth2 <= 200 && progressBarWidth2 > 100) {
    loadingProgress2BK.style.width = (progressBarWidth2 - 100) + '%';
    progressBarWidth2 += barStep;
  }

  if (trackLoaded > 2 && progressBarWidth3 <= 100 && progressBarWidth2 > barProgressOffset) {
    loadingProgress3.style.width = progressBarWidth3 + '%';
    progressBarWidth3 += barStep;
  }
  if (trackLoaded > 2 && progressBarWidth3 <= 200 && progressBarWidth3 > 100) {
    loadingProgress3BK.style.width = (progressBarWidth3 - 100) + '%';
    progressBarWidth3 += barStep;
  }
  if (trackLoaded > 3 && progressBarWidth4 <= 100 && progressBarWidth3 > barProgressOffset) {
    loadingProgress4.style.width = progressBarWidth4 + '%';
    progressBarWidth4 += barStep;
  }
  if (trackLoaded > 3 && progressBarWidth4 <= 200 && progressBarWidth4 > 100) {
    loadingProgress4BK.style.width = (progressBarWidth4 - 100) + '%';
    progressBarWidth4 += barStep;
  }
  if (progressBarWidth1 > 200 && progressBarWidth2 > 200 && progressBarWidth3 > 200 && progressBarWidth4 > 200) {
    allPlayed = true;
    document.getElementById('projectNameColor').style.opacity = 1;
    document.getElementById('projectName').style.opacity = 0;
    document.getElementById('projectName').style.transition = "all 1s ease-in";
  }

}

function initClient(data) {
  clientID = data.clientID;
  if (startTracks == 4) {
  trackMuted[0] = false;
  trackMuted[1] = false;
  trackMuted[2] = false;
  trackMuted[3] = false;
  } else {
  trackMuted[0] = true;
  trackMuted[1] = true;
  trackMuted[2] = true;
  trackMuted[3] = true;
  trackMuted[data.trackPlay] = false;
  }
}




function accUpdate(e) {
  pAccX = accX;
  accX = e.acceleration.x;
  //dAccX = accX - pAccX;
  dAccX = Math.abs(accX - pAccX);
  if (dAccX < 3) dAccX = 0;
}