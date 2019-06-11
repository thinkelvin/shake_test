// variables for track

var track1Sound;
var track2Sound;
var track3Sound;
var track4Sound;
var trackSounds = [];
var track1Ready = false;
var track2Ready = false;
var track3Ready = false;
var track4Ready = false;
var track1End = false;
var track2End = false;
var track3End = false;
var track4End = false;
var trackStarted = true;
var trackLoaded = 0;
var trackEnded = 0;
var trackID = [];

function trackSoundSetup() {
    if (!trackStarted && trackLoaded==4) {
          trackID[0] = trackSounds[0].play();
          trackID[1] = trackSounds[1].play();
          trackID[2] = trackSounds[2].play();
          trackID[3] = trackSounds[3].play();
          trackStarted = true;
          trackSounds[0].once('end', function () {
            trackEnded++;
          });
          trackSounds[1].once('end', function () {
            trackEnded++;
          });
          trackSounds[2].once('end', function () {
            trackEnded++;
          });
          trackSounds[3].once('end', function () {
            trackEnded++;
          });
      //}
    } else if (trackEnded == 4) {
              //if (track1End && track2End && track3End && track4End) {
            trackEnded = 0;
            trackLoaded = 4;
            trackStarted = false;
            //track1End = false;track2End = false;track3End = false;track4End = false;
            console.log('finised all tracks');
        
    }
     
}