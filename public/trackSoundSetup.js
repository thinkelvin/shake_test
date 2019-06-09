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
var trackStarted = true;
var trackLoaded = 0;
var trackEnded = 0;

function trackSoundSetup() {
    if (!trackStarted && trackLoaded==4) {
        
      //if (track1Ready && track2Ready && track3Ready && track4Ready ){
          //track1Sound.volume(0.5);track2Sound.volume(0.5);track3Sound.volume(0.5); track4Sound.volume(0.5);
          track1Sound.play(); track2Sound.play(); track3Sound.play();track4Sound.play();  
        //   track1Ready = false; track2Ready = false; track3Ready = false; track4Ready = false;
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