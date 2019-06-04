var accX;
var pAccX; // last accX reading
var dAccX; 

function getLevel() {
    return Level*30;
  }
  
  function getaccX() {
    //return accX;
    return dAccX;
  }
  
  Plotly.plot('accGraph', [
    {
      y: [getaccX()],
      mode: 'lines',
      type: 'line',
      opacity: 0.5,
      line: {
        width: 2,
        color: 'green'
      }
    },
    {
      y: [getLevel()],
      mode: 'lines',
      type: 'line'
    }  
  
  ]);
  
  var cnt = 0;
  var timePlot = 1000/FPS; // update the data at FPS
  var displayRange = 200; // x-axis time range
  setInterval(function() {
    Plotly.extendTraces('accGraph', {
      y: [
        [getaccX()],[getLevel()]
      ]
    }, [0,1]); // normalize y datas into [0,1] range
    cnt+=XSpeed;
    //if (cnt > displayRange) {
      Plotly.relayout('accGraph', {
        xaxis: {
          range: [cnt -displayRange , cnt+displayRange]
        }
      });
    //}
  }, 50); // millisecond to update