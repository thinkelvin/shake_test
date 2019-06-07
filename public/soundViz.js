

function soundViz() {
    analyser1.getByteFrequencyData(dataArray1);
    let segWidth = bufferLength1 * 0.25;
    var seg1 = dataArray1.slice(0, segWidth - 1);
    var seg2 = dataArray1.slice(segWidth, 2 * segWidth - 1);
    var seg3 = dataArray1.slice(2 * segWidth, 3 * segWidth - 1);
    var seg4 = dataArray1.slice(3 * segWidth, 4 * segWidth - 1);
    var pMin = 10;
    var pMax = 70;
    var p1 = Math.max(...seg1) * pMax / 256;
    var p2 = Math.max(...seg2) * pMax / 256;
    var p3 = Math.max(...seg3) * pMax / 256;
    var p4 = Math.max(...seg4) * pMax / 256;

    if (p1 < pMin) p1 = pMin;
    if (p2 < pMin) p2 = pMin;
    if (p3 < pMin) p3 = pMin;
    if (p4 < pMin) p4 = pMin;

    var colorHSL1 = 'hsl(' + 0 + ',' + 100 + '%,' + p1 + '%)';
    var colorHSL2 = 'hsl(' + 113 + ',' + 100 + '%,' + p2 + '%)';
    var colorHSL3 = 'hsl(' + 189 + ',' + 100 + '%,' + p3 + '%)';
    var colorHSL4 = 'hsl(' + 298 + ',' + 100 + '%,' + p4 + '%)';
    //var p = Math.max(...dataArray1) % 100;
    //var colorHSL1 = 'hsl(' + 100 + ',' + 100 + '%,' + p + '%)';
    bkColor1.style.setProperty('background-color', colorHSL1);
    bkColor2.style.setProperty('background-color', colorHSL2);
    bkColor3.style.setProperty('background-color', colorHSL3);
    bkColor4.style.setProperty('background-color', colorHSL4);

}