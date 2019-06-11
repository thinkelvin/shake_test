// variables for track

var trackSounds = [];
var trackStarted = true;
var trackLoaded = 0;
var trackEnded = 0;
var trackIDs = [];

function trackSoundSetup() {
  if (!trackStarted && trackLoaded == 4) {
    trackIDs[0] = trackSounds[0].play();
    trackIDs[1] = trackSounds[1].play();
    trackIDs[2] = trackSounds[2].play();
    trackIDs[3] = trackSounds[3].play();
    trackStarted = true;
    trackSounds[0].on('end', function () {
      
      trackEnded++;
    });
    trackSounds[1].on('end', function () {
      
      trackEnded++;
    });
    trackSounds[2].on('end', function () {
     
      trackEnded++;
    });
    trackSounds[3].on('end', function () {
    
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