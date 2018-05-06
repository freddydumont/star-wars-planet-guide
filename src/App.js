import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
// components
import Header from './components/Header';
import ReactGrid from './components/ReactGrid';

class App extends Component {
  render() {
    return (
      <main className="App">
        <Container>
          <Header />
          {this.props.loading ? (
            <p>Loading...</p>
          ) : (
            <ReactGrid planets={this.props.planets} />
          )}
        </Container>
      </main>
    );
  }
}

App = connect(({ loading, planets }) => ({ loading, planets }))(App);

export default App;
