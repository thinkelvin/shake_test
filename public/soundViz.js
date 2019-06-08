       var p1, p2, p3, p4;


       function soundViz() {
           analyser1.getByteFrequencyData(dataArray1);
           let segWidth = bufferLength1 * 0.25;
           var seg1 = dataArray1.slice(3 * segWidth, 4 * segWidth - 1);
           var seg2 = dataArray1.slice(2 * segWidth, 3 * segWidth - 1);
           var seg3 = dataArray1.slice(segWidth, 2 * segWidth - 1);
           var seg4 = dataArray1.slice(0, segWidth - 1);
           p1 = seg1.reduce(getSum) / segWidth;
           p2 = seg2.reduce(getSum) / segWidth;
           p3 = seg3.reduce(getSum) / segWidth;
           p4 = seg4.reduce(getSum) / segWidth;
           p1 = p1 * 100 * 4 / 256;
           p2 = p2 * 100 * 1.5 / 256;
           p3 = p3 * 100 * 1.2 / 256;
           p4 = p4 * 100 * 1.3 / 256;

           bar1.style.width = p1 + '%';
           // bar2.style.width = p2 + '%';
           // bar3.style.width = p3 + '%';
           // bar4.style.width = p4 + '%';

           //var p = Math.max(...dataArray1) % 100;
           //var colorHSL1 = 'hsl(' + 100 + ',' + 100 + '%,' + p + '%)';
           // if (!track1Tap) bkColor1.style.setProperty('background-color', colorHSL1);
           // if (!track2Tap) bkColor2.style.setProperty('background-color', colorHSL2);
           // if (!track3Tap) bkColor3.style.setProperty('background-color', colorHSL3);
           // if (!track4Tap) bkColor4.style.setProperty('background-color', colorHSL4);

       }