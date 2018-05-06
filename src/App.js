import React, { Component } from 'react';
import { Container } from 'reactstrap';
import axios from 'axios';
// components
import Header from './components/Header';

class App extends Component {
  constructor() {
    super();

    this.state = {
      planets: null,
      loading: true,
    };

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
        // combine the results of all promises
        const planets = res.map(page => page.data.results);
        // merge them to create an array of planet objects
        this.setState({
          planets: [].concat(...planets),
          loading: false,
        });
      })
      .catch(error => console.log(error));
    // TODO: present option to retry on error
  }

  render() {
    console.log(this.state);
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
