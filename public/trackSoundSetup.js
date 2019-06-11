// variables for track

var trackSounds = [];
var trackStarted = true;
var trackLoaded = 0;
var trackEnded = 0;
var trackIDs = [];
var firstTimeSetup = true;

function trackSoundSetup() {
  if (firstTimeSetup && trackLoaded==4) {
        trackIDs[0] = trackSounds[0].play();
        trackIDs[1] = trackSounds[1].play();
        trackIDs[2] = trackSounds[2].play();
        trackIDs[3] = trackSounds[3].play();
        firstTimeSetup = false;
  }
  else if (!trackStarted && trackLoaded == 4) {
    trackSounds[0].play(trackIDs[0]);
    trackSounds[1].play(trackIDs[1]);
    trackSounds[2].play(trackIDs[2]);
    trackSounds[3].play(trackIDs[3]);
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