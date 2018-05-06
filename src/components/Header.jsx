import React from 'react';
import { Row, Col } from 'reactstrap';
// css
import './Header.css';
import '../assets/fonts/STARWARS/STARWARS.css';

const Header = () => (
  <header>
    <Row>
      <Col>
        <h1 className="title text-center text-uppercase align-items-center my-5 ">
          Star Wars<br />Planet Guide
        </h1>
      </Col>
    </Row>
  </header>
);

export default Header;
