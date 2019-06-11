  var track1Tap = false;
  var track2Tap = false;
  var track3Tap = false;
  var track4Tap = false;
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

    mc1.on("tap", function (ev) {
      track1Tap = !track1Tap;
      trackTapped = track1Tap;
      //track1Sound.mute(track1Tap);
      if (track1Tap) {
        trackOn = 0;
        track1Element.style.backgroundColor = "white";
        track2Element.style.backgroundColor = "hsl(113, 100%, 30%)";
        track3Element.style.backgroundColor = "hsl(189, 100%, 30%)";
        track4Element.style.backgroundColor = "hsl(298, 100%, 30%)";
        track2Tap = false; track3Tap = false; track4Tap = false;
      } else {
        track1Element.style.backgroundColor = "hsl(0, 100%, 30%)";
      }
    });

    mc2.on("tap", function (ev) {
      track2Tap = !track2Tap;
      trackTapped = track2Tap;
      //track2Sound.mute(track2Tap);
      if (track2Tap) {
         trackOn = 1;
        track1Element.style.backgroundColor = "hsl(0, 100%, 30%)";
        track2Element.style.backgroundColor = "white";
        track3Element.style.backgroundColor = "hsl(189, 100%, 30%)";
        track4Element.style.backgroundColor = "hsl(298, 100%, 30%)";
        track1Tap = false; track3Tap = false; track4Tap = false;
      } else {
       
        track2Element.style.backgroundColor = "hsl(113, 100%, 30%)";
      }
    });

    mc3.on("tap", function (ev) {
      track3Tap = !track3Tap;
      trackTapped = track3Tap;
      //track3Sound.mute(track3Tap);
      if (track3Tap) {
        trackOn = 2;
        track1Element.style.backgroundColor = "hsl(0, 100%, 30%)";
        track2Element.style.backgroundColor = "hsl(113, 100%, 30%)";
        track3Element.style.backgroundColor = "white";
        track4Element.style.backgroundColor = "hsl(298, 100%, 30%)";
        track1Tap = false; track2Tap = false; track4Tap = false;
      } else {
        
        track3Element.style.backgroundColor = "hsl(189, 100%, 30%)";
      }
    });

    mc4.on("tap", function (ev) {
      track4Tap = !track4Tap;
      trackTapped = track4Tap;
      //track4Sound.mute(track4Tap);
      if (track4Tap) {
              trackOn = 3
        track1Element.style.backgroundColor = "hsl(0, 100%, 30%)";
        track2Element.style.backgroundColor = "hsl(113, 100%, 30%)";
        track3Element.style.backgroundColor = "hsl(189, 100%, 30%)";
  
        track4Element.style.backgroundColor = "white";
        track1Tap = false; track2Tap = false; track3Tap = false;
      } else {
        ;
        track4Element.style.backgroundColor = "hsl(298, 100%, 30%)";
      }
    });


  }