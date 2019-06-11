// variables for track

var trackSounds = [];
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
            trackEnded = 0;
            trackLoaded = 4;
            trackStarted = false;
            console.log('finised all tracks');
        
    }
     
}