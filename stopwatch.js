window.onload = reset();
var [m, s, ms] = [0, 0, 0];
var obj = { m, s, ms };

var stopwatch;
function reset() {
  [m, s, ms] = [0, 0, 0];

  lapclr();
  document.getElementById("start").disabled = false;
  document.getElementById("lap").disabled = true;
  if (stopwatch) {
    clearInterval(stopwatch);
  }
  document.getElementById("stopwatch").innerHTML = `00 : 00 . 00`;
}

function start() {
  document.getElementById("start").disabled = true;
  document.getElementById("stop").disabled = false;
  document.getElementById("lap").disabled = false;

  stopwatch = setInterval(() => {
    ms += 1;
    if (ms >= 99) {
      s += 1;
      ms = 0;
      if (s >= 59) {
        m += 1;
        s = 0;
      }
    }

    let [min, sec, millisec] = timeToStr(m, s, ms);
    document.getElementById(
      "stopwatch"
    ).innerHTML = `${min} : ${sec} . ${millisec}`;
  }, 10);
}

function stop() {
  document.getElementById("start").disabled = false;
  if (stopwatch) {
    clearInterval(stopwatch);
  }
  clearInterval(stopwatch);
}

timeToStr = (m, s, ms) => {
  let min = m < 10 ? "0" + m : m;
  let sec = s < 10 ? "0" + s : s;
  let millisec = ms < 10 ? "0" + ms : ms;
  return [min, sec, millisec];
};

lapTime = (ptime, time) => {
  x = ptime[ptime.length - 1];
  y = x[x.length - 1];

  console.log(y);
  ms_ptime = y[0] * 6000 + y[1] * 100 + y[2];
  ms_time = time[0] * 6000 + time[1] * 100 + time[2];
  lap_ms = ms_time - ms_ptime;

  lap_s = Math.floor(lap_ms / 100);
  lap_m = Math.floor(lap_s / 60);
  lap_ms = lap_ms - (lap_m * 6000 + lap_s * 100);

  return [lap_m, lap_s, lap_ms];
};

function lap() {
  var time = [m, s, ms];

  let [min, sec, millisec] = timeToStr(m, s, ms);
  let total_time = `${min} : ${sec} . ${millisec}`;

  if (localStorage.getItem("lapsJson") == null) {
    lapsJsonarr = [];
    lapsJsonarr.push([time, time]);

    console.log(time, time);
    lapsJsonStrarr = [];
    lapsJsonStrarr.push([total_time, total_time]);
    localStorage.setItem("lapsJson", JSON.stringify(lapsJsonStrarr));
  } else {
    let [lm, ls, lms] = lapTime(lapsJsonarr, time);
    var ltime = [lm, ls, lms];
    lapsJsonarr.push([ltime, time]);

    [min, sec, millisec] = timeToStr(lm, ls, lms);
    let lap_time = `${min} : ${sec} . ${millisec}`;
    console.log(ltime, time);
    lapsJsonStrarr.push([lap_time, total_time]);
    localStorage.setItem("lapsJson", JSON.stringify(lapsJsonStrarr));
  }

  let str= '';
lapsJsonStrarr.forEach((element, index) => {
    str+= `
    <tr>
        <th scope="row">${index+1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
    </tr>
    `;
});
document.getElementById("laptbl").innerHTML= str;
}

function lapclr(){
    localStorage.clear();
    document.getElementById("laptbl").innerHTML= `
    <tr>
        <th scope="row">1</th>
        <td>00 : 00 . 00</td><td>00 : 00 . 00</td>
    </tr>
    `;
}