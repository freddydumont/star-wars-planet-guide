import React from 'react';
import { combineReducers } from 'redux';
import {
  FETCH_RESIDENTS_PENDING,
  FETCH_RESIDENTS_FULFILLED,
  FETCH_PLANETS_PENDING,
  FETCH_PLANETS_FULFILLED,
  FETCH_PLANETS_REJECTED,
  STORE_NO_RESIDENT,
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

function fetchPlanetError(state = false, action) {
  switch (action.type) {
    case FETCH_PLANETS_REJECTED:
      return true;
    case FETCH_PLANETS_FULFILLED:
    case FETCH_PLANETS_PENDING:
      return false;
    default:
      return state;
  }
}

function loading(state = null, action) {
  switch (action.type) {
    case FETCH_PLANETS_PENDING:
      return true;
    case FETCH_PLANETS_FULFILLED:
    case FETCH_PLANETS_REJECTED:
      return false;
    default:
      return state;
  }
}

function residents(state = {}, action) {
  switch (action.type) {
    case STORE_NO_RESIDENT:
      return {
        ...state,
        [action.payload]: [<dd key="no">No known resident</dd>],
      };
    case FETCH_RESIDENTS_PENDING:
      return {
        ...state,
        [action.meta]: [<dd key="loading">Searching for residents...</dd>],
      };
    case FETCH_RESIDENTS_FULFILLED:
      return {
        ...state,
        [action.meta]: action.payload.map(resident => (
          <dd key={resident.data.name}>{resident.data.name}</dd>
        )),
      };
    default:
      return state;
  }
}

const reducer = combineReducers({
  planets,
  loading,
  residents,
  fetchPlanetError,
});
export default reducer;
