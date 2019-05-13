import apiUrl from '../lib/apiUrl';

export function getTimers(callback) {
  return function(dispatch) {
    dispatch({
      type: 'GET_TIMERS_REQUEST'
    });
    return fetch(`${apiUrl}/timers`)
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'GET_TIMERS_FAILURE',
            error: body.error
          });
        } else {
          dispatch({
            type: 'GET_TIMERS_SUCCESS',
            data: body
          });

          callback && callback();

        }
      })
  }
}

export function createTimer(body, callback) {
  return function(dispatch) {
    dispatch({
      type: 'CREATE_TIMERS_REQUEST'
    });
    return fetch(`${apiUrl}/timers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'CREATE_TIMERS_FAILURE',
            error: body.error
          });
        } else {
          dispatch({
            type: 'CREATE_TIMERS_SUCCESS',
            data: body
          });
          callback && callback();
          dispatch(getTimers());
        }
      });
  }
}

export function createTimerBatch(body, callback) {
  return function(dispatch) {
    dispatch({
      type: 'CREATE_TIMERS_BATCH_REQUEST'
    });
    return fetch(`${apiUrl}/timers/batch`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'CREATE_TIMERS_BATCH_FAILURE',
            error: body.error
          });
          callback && callback('Error');
        } else {
          dispatch({
            type: 'CREATE_TIMERS_BATCH_SUCCESS',
            data: body
          });
          dispatch(getTimers());
          callback && callback();
        }
      });
  }
}

export function updateTimer(body, id, callback) {
  return function(dispatch) {
    dispatch({
      type: 'UPDATE_TIMERS_REQUEST'
    });
    return fetch(`${apiUrl}/timers/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'UPDATE_TIMERS_FAILURE',
            error: body.error
          });
        } else {
          dispatch({
            type: 'UPDATE_TIMERS_SUCCESS',
            data: body
          });
          callback && callback();
          dispatch(getTimers());
        }
      });
  }
}

export function deleteTimer(id, callback) {
  return function(dispatch) {
    dispatch({
      type: 'DELETE_TIMERS_REQUEST'
    });
    return fetch(`${apiUrl}/timers/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'DELETE_TIMERS_FAILURE',
            error: body.error
          });
        } else {
          dispatch({
            type: 'DELETE_TIMERS_SUCCESS',
            data: body
          });
          callback && callback();
          dispatch(getTimers());
        }
      });
  }
}
