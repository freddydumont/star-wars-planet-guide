import axios from 'axios';

// PLANETS
export const PLANETS_REQUESTED = 'PLANETS_REQUESTED';
export const PLANETS_RECEIVED = 'PLANETS_RECEIVED';
export const PLANETS_REQUEST_FAILED = 'PLANETS_REQUEST_FAILED';

export const requestPlanets = () => ({ type: PLANETS_REQUESTED });

export const FETCH_RESIDENTS = 'FETCH_RESIDENTS';
export const FETCH_RESIDENTS_PENDING = 'FETCH_RESIDENTS_PENDING';
export const FETCH_RESIDENTS_FULFILLED = 'FETCH_RESIDENTS_FULFILLED';

export function fetchResidents(residents, planet) {
  // generate an array of promises based on the residents array
  const promisedResidents = residents.map(resident => axios.get(resident));

  return {
    type: FETCH_RESIDENTS,
    payload: axios.all(promisedResidents),
    meta: planet,
  };
}

export const STORE_NO_RESIDENT = 'STORE_NO_RESIDENT';

export function storeNoResident(planet) {
  return {
    type: STORE_NO_RESIDENT,
    payload: planet,
  };
}
