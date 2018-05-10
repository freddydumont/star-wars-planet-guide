import axios from 'axios';
import { call, takeEvery, put } from 'redux-saga/effects';
import { PLANETS_REQUESTED, PEOPLE_REQUESTED } from './actions';

/**
 * GETs all pages of a resource from SWAPI
 * @param {string} resource The type of data requested eg. 'people'
 * @param {number} pageCount `resource`'s amount of pages
 */
function fetchResource(resource, pageCount) {
  const api = axios.create({ baseURL: `https://swapi.co/api/${resource}` });

  let promisedResource = [];
  for (let i = 0; i < pageCount; i++) {
    promisedResource.push(api.get(`/?page=${i + 1}`));
  }

  return axios.all(promisedResource);
}

function* fetchResourceSaga(resource, pageCount) {
  const RESOURCE = resource.toUpperCase();
  try {
    const receivedResource = yield call(fetchResource, resource, pageCount);
    yield put({ type: `${RESOURCE}_RECEIVED`, payload: receivedResource });
  } catch (error) {
    yield put({ type: `${RESOURCE}_REQUEST_FAILED`, payload: error });
  }
}

export default function* rootSaga() {
  yield takeEvery(PLANETS_REQUESTED, fetchResourceSaga, 'planets', 7);
  yield takeEvery(PEOPLE_REQUESTED, fetchResourceSaga, 'people', 9);
}
