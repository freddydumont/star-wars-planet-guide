import React, { Component } from 'react';
import { Container } from 'reactstrap';
import axios from 'axios';
// components
import Header from './components/Header';

class App extends Component {
  constructor() {
    super();
    const fetchPlanets = axios.create({
      baseURL: 'https://swapi.co/api/planets',
    });

    // generate an array of promises based on data to fetch from api
    const PromisedPlanets = [];
    for (let i = 1; i < 8; i++) {
      PromisedPlanets.push(fetchPlanets.get(`/?page=${i}`));
    }

    axios
      .all(PromisedPlanets)
      .then(res => {
        console.log(res);
        // iterate over response array and get relevant info to pass to state
      })
      .catch(error => console.log(error));
    // TODO: present option to retry on error
  }

  render() {
    return (
      <main className="App">
        <Container>
          <Header />
          {/* display loading if state is empty, else display table */}
        </Container>
      </main>
    );
  }
}

export default App;
