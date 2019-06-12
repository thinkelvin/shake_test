// variables for track
var trackMuted = [];
var trackSounds = [];
var trackStarted = false;
var trackLoaded = 0;
var trackEnded = 0;
var trackIDs = [];
var firstLoop = true;
var track1Sound, track2Sound, track3Sound, track4Sound;

function trackSoundUpdate() {
  track1Sound.mute(trackMuted[0]);
  track2Sound.mute(trackMuted[1]);
  track3Sound.mute(trackMuted[2]);
  track4Sound.mute(trackMuted[3]);

  if (!trackStarted && trackLoaded == 4) {
    if (firstLoop) {
      trackIDs[0] = track1Sound.play();
      trackIDs[1] = track2Sound.play();
      trackIDs[2] = track3Sound.play();
      trackIDs[3] = track4Sound.play();
      firstLoop = false;
    } else {
      track1Sound.play(trackIDs[0]);
      track2Sound.play(trackIDs[1]);
      track3Sound.play(trackIDs[2]);
      track4Sound.play(trackIDs[3]);
    }
    trackStarted = true;
    track1Sound.once('end', function () {
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

  } else if (trackEnded == 4) {
    trackEnded = 0;
    trackLoaded = 4;
    trackStarted = false;
    console.log('finised all tracks');
  }

}