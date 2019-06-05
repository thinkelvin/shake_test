
function touchUISetup() {
  // set up touch responses
  var track1Tap = false;
  var track2Tap = false;
  var track3Tap = false;
  var track4Tap = false;
  var track1Element = document.getElementById('track1');
  var track2Element = document.getElementById('track2');
  var track3Element = document.getElementById('track3');
  var track4Element = document.getElementById('track4');
  var mc1 = new Hammer(track1Element);
  var mc2 = new Hammer(track2Element);
  var mc3 = new Hammer(track3Element);
  var mc4 = new Hammer(track4Element);
  mc1.on("tap press", function (ev) {
    track1Tap = !track1Tap;
    track1Sound.mute(track1Tap);
    if (track1Tap) {
      track1Element.style.backgroundColor = "black";
    }
    else {
      track1Element.style.backgroundColor = "#ee0a0a";
    }
  });
  mc2.on("tap press", function (ev) {
    track2Tap = !track2Tap;
    track2Sound.mute(track2Tap);
    if (track2Tap) {
      track2Element.style.backgroundColor = "black";
    }
    else {
      track2Element.style.backgroundColor = "#25ee0a";
    }
  });
  mc3.on("tap press", function (ev) {
    track3Tap = !track3Tap;
    track3Sound.mute(track3Tap);
    if (track3Tap) {
      track3Element.style.backgroundColor = "black";
    }
    else {
      track3Element.style.backgroundColor = "#0accee";
    }
  });
  mc4.on("tap press", function (ev) {
    track4Tap = !track4Tap;
    track4Sound.mute(track4Tap);
    if (track4Tap) {
      track4Element.style.backgroundColor = "black";
    }
    else {
      track4Element.style.backgroundColor = "#e60aee";
    }
  });
}
  