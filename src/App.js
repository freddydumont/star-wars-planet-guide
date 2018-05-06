import React, { Component } from 'react';
import { Container } from 'reactstrap';
// components
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <main className="App">
        <Container>
          <Header />
        </Container>
      </main>
    );
  }
}

export default App;
