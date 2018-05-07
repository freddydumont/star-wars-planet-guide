import axios from 'axios';

export const FETCH_PLANETS = 'FETCH_PLANETS';
export const FETCH_PLANETS_PENDING = 'FETCH_PLANETS_PENDING';
export const FETCH_PLANETS_FULFILLED = 'FETCH_PLANETS_FULFILLED';

export function fetchPlanets() {
  const fetchPlanets = axios.create({
    baseURL: 'https://swapi.co/api/planets',
  });

  // generate an array of promises based on data to fetch from api
  const promisedPlanets = [];
  for (let i = 1; i < 8; i++) {
    promisedPlanets.push(fetchPlanets.get(`/?page=${i}`));
  }

  return {
    type: FETCH_PLANETS,
    payload: axios.all(promisedPlanets),
  };
}

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
