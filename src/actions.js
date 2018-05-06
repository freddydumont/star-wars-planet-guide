import axios from 'axios';

export const FETCH_PLANETS = 'FETCH_PLANETS';

export function fetchPlanets() {
  const fetchPlanets = axios.create({
    baseURL: 'https://swapi.co/api/planets',
  });

  // generate an array of promises based on data to fetch from api
  const PromisedPlanets = [];
  for (let i = 1; i < 8; i++) {
    PromisedPlanets.push(fetchPlanets.get(`/?page=${i}`));
  }

  return {
    type: FETCH_PLANETS,
    payload: axios.all(PromisedPlanets),
  };
}
