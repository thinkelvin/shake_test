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


            //    Disable the viz if tap
            if (!trackMuted[0]) track1Viz.style.width = p1 + '%';
            else track1Viz.style.width = '0%';
            if (!trackMuted[1]) track2Viz.style.width = p2 + '%';
            else track2Viz.style.width = '0%';
            if (!trackMuted[2]) track3Viz.style.width = p3 + '%';
            else track3Viz.style.width = '0%';
            if (!trackMuted[3]) track4Viz.style.width = p4 + '%';
            else track4Viz.style.width = '0%';

        }