  var track1Tap = false;
  var track2Tap = false;
  var track3Tap = false;
  var track4Tap = false;
  var trackElements = [];
  var mcs = [];
  var trackTapped = false;
  var trackOn = -1;

  function touchUISetup() {
    // set up touch responses

    var track1Element = document.getElementById('track1');
    var track2Element = document.getElementById('track2');
    var track3Element = document.getElementById('track3');
    var track4Element = document.getElementById('track4');
    var mc1 = new Hammer(track1Element);
    var mc2 = new Hammer(track2Element);
    var mc3 = new Hammer(track3Element);
    var mc4 = new Hammer(track4Element);

    // trackElements[0] = document.getElementById('track1');
    // trackElements[1] = document.getElementById('track2');
    // trackElements[2] = document.getElementById('track3');
    // trackElements[3] = document.getElementById('track4');
    // var mc1 = new Hammer(trackElements[0]);
    // var mc2 = new Hammer(trackElements[1]);
    // var mc3 = new Hammer(trackElements[2]);
    // var mc4 = new Hammer(trackElements[3]);


    // for (var i=0; i<4; i++) {
    //   mcs[i].on("tap", function(ev) {
    //     trackTapped = !trackTapped;
    //     if (trackTapped) trackOn=i;
    //     else trackOn = -1;
    //   });
    // }
    


    mc1.on("tap", function (ev) {
      track1Tap = !track1Tap;
      trackTapped = !trackTapped;
      if (trackTapped) trackOn = 1;

      track1Sound.mute(track1Tap);
      if (track1Tap) {
        track1Element.style.backgroundColor = "white";
      } else {
        track1Element.style.backgroundColor = "hsl(0, 100%, 30%)";
      }
    });
    mc2.on("tap", function (ev) {
      track2Tap = !track2Tap;
      trackTapped = !trackTapped;
      if (trackTapped) trackOn = 2;
      track2Sound.mute(track2Tap);
      if (track2Tap) {
        track2Element.style.backgroundColor = "white";
      } else {
        track2Element.style.backgroundColor = "hsl(113, 100%, 30%)";
      }
    });
    mc3.on("tap", function (ev) {
      track3Tap = !track3Tap;
            trackTapped = !trackTapped;
            if (trackTapped) trackOn = 3;
      track3Sound.mute(track3Tap);
      if (track3Tap) {
        track3Element.style.backgroundColor = "white";
      } else {
        track3Element.style.backgroundColor = "hsl(189, 100%, 30%)";
      }
    });
    mc4.on("tap", function (ev) {
      track4Tap = !track4Tap;
            trackTapped = !trackTapped;
            if (trackTapped) trackOn = 4;
      track4Sound.mute(track4Tap);
      if (track4Tap) {
        track4Element.style.backgroundColor = "white";
      } else {
        track4Element.style.backgroundColor = "hsl(298, 100%, 30%)";
      }
    });

    console.log(trackOn);
  }