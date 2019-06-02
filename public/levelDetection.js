var bufferReady;
var dataBuffer = [];
var bufferSize = 20;
var prevData;
var prevMean;
var prevSD;
var Influence = 0;
var Threshold = 4;

function fillBuffer(d) {
  dataBuffer.push(d);
  if (dataBuffer.length> bufferSize) {
    bufferReady = true;
    dataBuffer.shift(); // take out the first to keep the buffer size
  } 
}

function detectLevelChange(data) {
  let signal = 0;
  prevMean = Mean();
  prevSD = SD();
//  document.getElementById("mean").innerHTML = "Mean = " + prevMean.toString();
//   document.getElementById("sd").innerHTML = "SD = " + prevSD.toString();

  if (abs(data-prevMean)>(Threshold*prevSD)) {
    if (data>prevMean)
      signal = 1;
    else
      signal = -1;
    prevData = Influence*data + (1-Influence)*prevData;
  }
  else {
    signal = 0;
    prevData = data;
  }
  fillBuffer(prevData);
  return signal;
}

function Mean() {
  let m=0;
  let sum=0;
  for (let i=0; i<bufferSize; i++) {
    sum+=dataBuffer[i];  
  }
  m = sum/bufferSize;
  return m;
}

function SD() {
  //let m = Mean();
  let m = prevMean;
  let sd = 0;
  for (let i=0; i<bufferSize; i++){
    sd += pow(dataBuffer[i]-m,2);  
  }
  return sqrt(sd/bufferSize);
}