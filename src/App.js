import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { requestPlanets } from './actions';
// components
import Header from './components/Header';
import ReactGrid from './components/ReactGrid';
import TryAgainButton from './components/TryAgainButton';

class App extends Component {
  render() {
    const { planets, loading, errors, requestPlanets } = this.props;
    // if loading, present loading indicator
    let table;
    if (loading.planets) {
      table = <p className="text-center">Searching for planets...</p>;
    } else {
      // if error, present option to try again, else display table
      table = errors.planets ? (
        <div className="text-center">
          <h2 className="mb-3">ERROR</h2>
          <p style={{ color: '#4bd5ee' }}>
            These are not the planets you're looking for...
          </p>
          <TryAgainButton onClickFunction={requestPlanets} />
        </div>
      ) : (
        <ReactGrid planets={planets} />
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
  ({ loading, planets, errors }) => ({
    loading,
    planets,
    errors,
  }),
  { requestPlanets }
)(App);

export default App;
