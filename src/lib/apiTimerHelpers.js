
function renderElapsedString(elapsed, runningSince) {
  let totalElapsed = elapsed;
  let started = new Date(runningSince).getTime(); //convert date to ms
  if (started) {
    totalElapsed += Date.now() - started;
  }
  return millisecondsToHuman(totalElapsed);
}

function millisecondsToHuman(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor(ms / 1000 / 60 / 60);

  const humanized = [
    pad(hours.toString(), 2),
    pad(minutes.toString(), 2),
    pad(seconds.toString(), 2),
  ].join(':');

  return humanized;
}

function pad(numberString, size) {
  let padded = numberString;
  while (padded.length < size) padded = `0${padded}`;
  return padded;
}

// function newTimer(attrs = {}) {
//   // id: {type: String, required: true},
//
//   const timer = {
//     projectID: 1224465,
//     duration: 0,
//     isLogged: false,
//     note: attrs.title,
//     startedAt: Date.now()
//   };
//
//   return timer;
// }

function findById(array, id, cb) {
  array.forEach((el) => {
    if (el._id === id) {
      cb(el);
      return;
    }
  });
}

function getTimers(success) {
  return fetch('https://fbapi.cheshirebeane.com/api/timers', {
    headers: {
      Accept: 'application/json',
    },
  }).then(checkStatus)
    .then(parseJSON)
    .then(success);
}

function createTimer(data) {
  data.startedAt = Date.now();
  data.initialStartTime = Date.now();

  return fetch('https://fbapi.cheshirebeane.com/api/timers', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(checkStatus);
}

function updateTimer(data) {
  return fetch(`https://fbapi.cheshirebeane.com/api/timers/${data.id}`, {
    method: 'put',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(checkStatus);
}

function deleteTimer(data) {
  return fetch(`https://fbapi.cheshirebeane.com/api/timers/${data.id}`, {
    method: 'delete',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(checkStatus);
}

function startTimer(data) {
  return fetch(`https://fbapi.cheshirebeane.com/api/timers/start/${data.id}`, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(checkStatus);
}

function stopTimer(data) {
  return fetch(`https://fbapi.cheshirebeane.com/api/timers/stop/${data._id}`, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(checkStatus);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error);
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}


module.exports = {
  renderElapsedString,
  millisecondsToHuman,
  pad,
  getTimers,
  createTimer,
  updateTimer,
  startTimer,
  stopTimer,
  deleteTimer,
  // newTimer,
  findById
}
