import React from 'react';
import { combineReducers } from 'redux';
import {
  PLANETS_REQUESTED,
  PLANETS_RECEIVED,
  PLANETS_REQUEST_FAILED,
  PEOPLE_RECEIVED,
  FETCH_RESIDENTS_PENDING,
  FETCH_RESIDENTS_FULFILLED,
  STORE_NO_RESIDENT,
} from './actions';

function planets(state = null, action) {
  switch (action.type) {
    case PLANETS_RECEIVED:
      // combine the results of all promises into a single array
      const planets = action.payload.map(page => page.data.results);
      // return an array of merged planet objects
      return [].concat(...planets);
    default:
      return state;
  }
}

function people(state = null, action) {
  switch (action.type) {
    case PEOPLE_RECEIVED:
      const results = action.payload.map(page => page.data.results);
      const people = [].concat(...results);
      // turn each person into a url:name pair
      return people.reduce((obj, person) => {
        obj[person.url] = person.name;
        return obj;
      }, {});
    default:
      return state;
  }
}

function fetchPlanetError(state = false, action) {
  switch (action.type) {
    case PLANETS_REQUEST_FAILED:
      return true;
    case PLANETS_RECEIVED:
    case PLANETS_REQUESTED:
      return false;
    default:
      return state;
  }
}

function loading(state = true, action) {
  switch (action.type) {
    case PLANETS_REQUESTED:
      return true;
    case PLANETS_RECEIVED:
    case PLANETS_REQUEST_FAILED:
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
  people,
  loading,
  residents,
  fetchPlanetError,
});
export default reducer;
