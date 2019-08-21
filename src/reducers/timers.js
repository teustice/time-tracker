export function timers(state = [], action) {
  switch (action.type) {
    case 'GET_TIMERS_REQUEST':
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'GET_TIMERS_SUCCESS':
      return action.data;
    case 'GET_TIMERS_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    case 'CREATE_TIMERS_REQUEST':
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'CREATE_TIMERS_SUCCESS':
      return [...state, action.data]
    case 'CREATE_TIMERS_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    default:
      return state;
  }
}

export function createTimer(state = [], action) {
  switch (action.type) {

    default:
      return state;
  }
}

export function deleteTimer(state = [], action) {
  switch (action.type) {
    case 'DELETE_TIMERS_REQUEST':
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'DELETE_TIMERS_SUCCESS':
      return {data: action.data};
    case 'DELETE_TIMERS_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    default:
      return state;
  }
}

export function updateTimer(state = [], action) {
  switch (action.type) {
    case 'UPDATE_TIMERS_REQUEST':
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'UPDATE_TIMERS_SUCCESS':
      return {data: action.data};
    case 'UPDATE_TIMERS_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    default:
      return state;
  }
}
