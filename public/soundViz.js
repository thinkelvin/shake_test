

        function getSum(total, num) {
            return total + num;
        }
       function soundViz() {
           analyser1.getByteFrequencyData(dataArray1);
           let segWidth = bufferLength1 * 0.25;
           var seg1 = dataArray1.slice(3 * segWidth, 4 * segWidth - 1);
           var seg2 = dataArray1.slice(2 * segWidth, 3 * segWidth - 1);
           var seg3 = dataArray1.slice(segWidth, 2 * segWidth - 1);
           var seg4 = dataArray1.slice(0, segWidth - 1);
            var p1, p2, p3, p4;
           p1 = seg1.reduce(getSum) / segWidth;
           p2 = seg2.reduce(getSum) / segWidth;
           p3 = seg3.reduce(getSum) / segWidth;
           p4 = seg4.reduce(getSum) / segWidth;
           p1 = p1 * 100 * 4 / 256;
           p2 = p2 * 100 * 1.5 / 256;
           p3 = p3 * 100 * 1.2 / 256;
           p4 = p4 * 100 * 1.3 / 256;

           if (!track1Tap) bar1.style.width = p1 + '%';
           else bar1.style.width = '0%';
           if (!track2Tap) bar2.style.width = p2 + '%';
           else bar2.style.width = '0%';
           if (!track3Tap) bar3.style.width = p3 + '%';
           else bar3.style.width = '0%';
           if (!track4Tap) bar4.style.width = p4 + '%';
           else bar4.style.width = '0%';

       }