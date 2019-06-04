// variables for track

var track1Sound;
var track2Sound;
var track3Sound;
var track4Sound;
var track1Ready = false;
var track2Ready = false;
var track3Ready = false;
var track4Ready = false;
var track1End = false;
var track2End = false;
var track3End = false;
var track4End = false;
var trackStarted = false;

function trackSoundSetup() {
    if (!trackStarted) {
        if (track1Ready && track2Ready && track3Ready && track4Ready ){
          track1Sound.volume(0.5);track2Sound.volume(0.5);track3Sound.volume(0.5); track4Sound.volume(0.5);
          track1Sound.play(); track2Sound.play(); track3Sound.play();track4Sound.play();  
        //   track1Ready = false; track2Ready = false; track3Ready = false; track4Ready = false;
          trackStarted = true;
          track1Sound.on('end', function () {
            track1End = true;
          });
          track2Sound.on('end', function () {
            track2End = true;
          });
          track3Sound.on('end', function () {
            track3End = true;
          });
          track4Sound.on('end', function () {
            track4End = true;
          });
      }
    } else {
        if (track1End && track2End && tack3End && track4End) {
            trackStarted = false;
            console.log('finised all tracks');
        }
    }
     
}