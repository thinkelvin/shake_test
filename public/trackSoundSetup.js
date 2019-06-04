// variables for track

var track1Sound;
var track2Sound;
var track3Sound;
var track4Sound;
var track1Ready = false;
var track2Ready = false;
var track3Ready = false;
var track4Ready = false;
// var track1End = false;
// var track2End = false;
// var track3End = false;
// var track4End = false;
// var trackStarted = false;

function trackSoundSetup() {
        if (track1Ready && track2Ready && track3Ready && track4Ready ){
          track1Sound.volume(0.5);track2Sound.volume(0.5);track3Sound.volume(0.5); track4Sound.volume(0.5);
          track1Sound.play(); track2Sound.play(); track3Sound.play();track4Sound.play();  
          track1Ready = false; track2Ready = false; track3Ready = false; track4Ready = false;
          track1.on('end', function () {
            track1Ready = true;
          });
          track2.on('end', function () {
            track2Ready = true;
          });
          track3.on('end', function () {
            track3Ready = true;
          });
          track4.on('end', function () {
            track4Ready = true;
          });
      }
     
}