
var XSpeed = 1; // shifting speed of x-axis
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
  
  var displayRange = 200; // x-axis time range
  if (_debug) {
    setInterval(function () {
      Plotly.extendTraces('accGraph', {
        y: [
          [getaccX()],
          [getLevel()]
        ]
      }, [0, 1]); // normalize y datas into [0,1] range
      cnt += XSpeed;
      //if (cnt > displayRange) {
      Plotly.relayout('accGraph', {
        xaxis: {
          range: [cnt - displayRange, cnt + displayRange]
        }
      });
      //}
    }, 50); // millisecond to update
  }