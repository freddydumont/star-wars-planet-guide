import { combineReducers } from 'redux';
import {
  FETCH_RESIDENTS_PENDING,
  FETCH_RESIDENTS_FULFILLED,
  FETCH_PLANETS_PENDING,
  FETCH_PLANETS_FULFILLED,
} from './actions';

function planets(state = null, action) {
  switch (action.type) {
    case FETCH_PLANETS_FULFILLED:
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
    case FETCH_PLANETS_PENDING:
      return true;
    case FETCH_PLANETS_FULFILLED:
      return false;
    default:
      return state;
  }
}

function residents(state = {}, action) {
  switch (action.type) {
    case FETCH_RESIDENTS_PENDING:
      return {
        ...state,
        [action.meta]: 'loading',
      };
    case FETCH_RESIDENTS_FULFILLED:
      return {
        ...state,
        [action.meta]: action.payload.map(resident => resident.data.name),
      };
    default:
      return state;
  }
}

const reducer = combineReducers({ planets, loading, residents });
export default reducer;
