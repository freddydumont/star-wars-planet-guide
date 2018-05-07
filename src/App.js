import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchPlanets } from './actions';
// components
import Header from './components/Header';
import ReactGrid from './components/ReactGrid';

class App extends Component {
  render() {
    // if loading, present loading indicator
    let table;
    if (this.props.loading) {
      table = <p className="text-center">Searching for planets...</p>;
    } else {
      // if error, present option to try again, else display table
      table = this.props.fetchPlanetError ? (
        <div className="text-center">
          <h2 className="mb-3">ERROR</h2>
          <p style={{ color: '#4bd5ee' }}>
            These are not the planets you're looking for...
          </p>
          <Button onClick={() => this.props.fetchPlanets()}>Try Again?</Button>
        </div>
      ) : (
        <ReactGrid planets={this.props.planets} />
      );
    }

    return (
      <main className="App">
        <Container>
          <Header />
          {table}
        </Container>
      </main>
    );
  }
}

App = connect(
  ({ loading, planets, fetchPlanetError }) => ({
    loading,
    planets,
    fetchPlanetError,
  }),
  { fetchPlanets }
)(App);

export default App;
