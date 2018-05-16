import React from 'react';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';
import '../assets/fonts/STARWARS/STARWARS.css';

const Title = styled.h1`
  font-family: 'STARWARS';
  color: #000;
  text-shadow: -2px -2px 0 #ffd54e, -2px -1px 0 #ffd54e, -2px 0 0 #ffd54e,
    -2px 1px 0 #ffd54e, -2px 2px 0 #ffd54e, -1px -2px 0 #ffd54e,
    -1px -1px 0 #ffd54e, -1px 0 0 #ffd54e, -1px 1px 0 #ffd54e,
    -1px 2px 0 #ffd54e, 0 -2px 0 #ffd54e, 0 -1px 0 #ffd54e, 0 0 0 #ffd54e,
    0 1px 0 #ffd54e, 0 2px 0 #ffd54e, 1px -2px 0 #ffd54e, 1px -1px 0 #ffd54e,
    1px 0 0 #ffd54e, 1px 1px 0 #ffd54e, 1px 2px 0 #ffd54e, 2px -2px 0 #ffd54e,
    2px -1px 0 #ffd54e, 2px 0 0 #ffd54e, 2px 1px 0 #ffd54e, 2px 2px 0 #ffd54e;
`;

const Header = () => (
  <header>
    <Row>
      <Col>
        <Title className="title text-center text-uppercase align-items-center my-5 ">
          Star Wars<br />Planet Guide
        </Title>
      </Col>
    </Row>
  </header>
);

export default Header;
