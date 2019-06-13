
  var trackTap = [];
  var trackOn = -1;
    var track1Element;
    var track2Element;
    var track3Element;
    var track4Element;
  function touchUISetup() {
    // set up touch responses
    track1Element = document.getElementById('track1');
    track2Element = document.getElementById('track2');
    track3Element = document.getElementById('track3');
    track4Element = document.getElementById('track4');
    var mc1 = new Hammer(track1Element);
    var mc2 = new Hammer(track2Element);
    var mc3 = new Hammer(track3Element);
    var mc4 = new Hammer(track4Element);
    for (let i = 0; i < 4; i++) {
      trackTap[i] = false;
    }

    mc1.on("tap", function (ev) {
      trackTap[0] = !trackTap[0];
      if (trackTap[0]) {
        trackOn = 0;
        track1Element.style.backgroundColor = "white";
        track2Element.style.backgroundColor = "hsl(113, 100%, 30%)";
        track3Element.style.backgroundColor = "hsl(189, 100%, 30%)";
        track4Element.style.backgroundColor = "hsl(298, 100%, 30%)";
      } else {
        track1Element.style.backgroundColor = "hsl(0, 100%, 30%)";
        trackOn = -1;
      }
      for (let i = 0; i < 4; i++) {
        if (trackOn >= 0 && trackOn == i) trackTap[trackOn] = true;
        else trackTap[i] = false;
      }
    });

    mc2.on("tap", function (ev) {
      trackTap[1] = !trackTap[1];
      if (trackTap[1]) {
        trackOn = 1;
        track1Element.style.backgroundColor = "hsl(0, 100%, 30%)";
        track2Element.style.backgroundColor = "white";
        track3Element.style.backgroundColor = "hsl(189, 100%, 30%)";
        track4Element.style.backgroundColor = "hsl(298, 100%, 30%)";
      } else {
        trackOn = -1;
        track2Element.style.backgroundColor = "hsl(113, 100%, 30%)";
      }
      for (let i = 0; i < 4; i++) {
        if (trackOn > 0 && trackOn == i) trackTap[trackOn] = true;
        else trackTap[i] = false;
      }
    });

    mc3.on("tap", function (ev) {
      trackTap[2] = !trackTap[2];
      if (trackTap[2]) {
        trackOn = 2;
        track1Element.style.backgroundColor = "hsl(0, 100%, 30%)";
        track2Element.style.backgroundColor = "hsl(113, 100%, 30%)";
        track3Element.style.backgroundColor = "white";
        track4Element.style.backgroundColor = "hsl(298, 100%, 30%)";
      } else {
        trackOn = -1;
        track3Element.style.backgroundColor = "hsl(189, 100%, 30%)";
      }
      for (let i = 0; i < 4; i++) {
        if (trackOn > 0 && trackOn == i) trackTap[trackOn] = true;
        else trackTap[i] = false;
      }
    });

    mc4.on("tap", function (ev) {
      trackTap[3] = !trackTap[3];
      if (trackTap[3]) {
        trackOn = 3
        track1Element.style.backgroundColor = "hsl(0, 100%, 30%)";
        track2Element.style.backgroundColor = "hsl(113, 100%, 30%)";
        track3Element.style.backgroundColor = "hsl(189, 100%, 30%)";
        track4Element.style.backgroundColor = "white";
      } else {
        trackOn = -1;
        track4Element.style.backgroundColor = "hsl(298, 100%, 30%)";
      }
      for (let i = 0; i < 4; i++) {
        if (trackOn > 0 && trackOn == i) trackTap[trackOn] = true;
        else trackTap[i] = false;
      }
    });


  }