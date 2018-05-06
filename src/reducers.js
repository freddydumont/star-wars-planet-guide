import { combineReducers } from 'redux';

function planets(state = null, action) {
  switch (action.type) {
    case 'FETCH_PLANETS_FULFILLED':
      // combine the results of all promises into a single array
      const planets = action.payload.map(page => page.data.results);
      // return an array of merged planet objects
      return [].concat(...planets);
    default:
      return state;
  }
}

function loading(state = null, action) {
  switch (action.type) {
    case 'FETCH_PLANETS_PENDING':
      return true;
    case 'FETCH_PLANETS_FULFILLED':
      return false;
    default:
      return state;
  }
}

const reducer = combineReducers({ planets, loading });
export default reducer;
