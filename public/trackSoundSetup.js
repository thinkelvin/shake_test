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
          trackID[1] = track2Sound.play();
          trackID[2] = track3Sound.play();
          trackID[3] = track4Sound.play();
          trackStarted = true;
          trackSounds[0].once('end', function () {
            trackEnded++;
          });
          track2Sound.once('end', function () {
            trackEnded++;
          });
          track3Sound.once('end', function () {
            trackEnded++;
          });
          track4Sound.once('end', function () {
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