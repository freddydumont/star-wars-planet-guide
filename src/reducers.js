import { combineReducers } from 'redux';
import {
  PLANETS_REQUESTED,
  PLANETS_RECEIVED,
  PLANETS_REQUEST_FAILED,
  PEOPLE_REQUESTED,
  PEOPLE_RECEIVED,
  PEOPLE_REQUEST_FAILED,
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

function errors(state = { planets: false, people: false }, action) {
  switch (action.type) {
    case PLANETS_REQUESTED:
    case PLANETS_RECEIVED:
      return {
        ...state,
        planets: false,
      };
    case PEOPLE_REQUESTED:
    case PEOPLE_RECEIVED:
      return {
        ...state,
        people: false,
      };
    case PLANETS_REQUEST_FAILED:
      return {
        ...state,
        planets: true,
      };
    case PEOPLE_REQUEST_FAILED:
      return {
        ...state,
        people: true,
      };
    default:
      return state;
  }
}

function loading(state = { planets: true, people: true }, action) {
  switch (action.type) {
    case PLANETS_REQUESTED:
      return {
        ...state,
        planets: true,
      };
    case PLANETS_RECEIVED:
    case PLANETS_REQUEST_FAILED:
      return {
        ...state,
        planets: false,
      };
    case PEOPLE_REQUESTED:
      return {
        ...state,
        people: true,
      };
    case PEOPLE_RECEIVED:
    case PEOPLE_REQUEST_FAILED:
      return {
        ...state,
        people: false,
      };
    default:
      return state;
  }
}

const reducer = combineReducers({
  planets,
  people,
  loading,
  errors,
});
export default reducer;
