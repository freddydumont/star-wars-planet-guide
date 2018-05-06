import React, { Component } from 'react';
import { Container } from 'reactstrap';
// components
import Header from './components/Header';
import ReactGrid from './components/ReactGrid';

class App extends Component {
  render() {
    return (
      <main className="App">
        <Container>
          <Header />
          <ReactGrid />
          {/* display loading if state is empty, else display table */}
        </Container>
      </main>
    );
  }
}

export default App;
