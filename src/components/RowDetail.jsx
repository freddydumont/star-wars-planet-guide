import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { requestPeople } from '../actions';
import TryAgainButton from './TryAgainButton';
import styled from 'styled-components';

const DefList = styled.dl`
  dt {
    color: #4bd5ee;
  }

  .oi {
    margin-right: 0.25rem;
  }

  margin-left: 2.5rem;
`;

class RowDetail extends Component {
  render() {
    const { row, people, errors, loading, requestPeople } = this.props;
    let residents;
    // if loading, present loading indicator
    if (loading.people) {
      residents = <dd>Searching for residents...</dd>;
    } else {
      // if error, present option to try again, else display residents
      if (errors.people) {
        residents = (
          <dd>
            ERROR – Residents not found! <br />
            <TryAgainButton size="sm" onClickFunction={requestPeople} />
          </dd>
        );
      } else {
        residents =
          row.residents.length > 0 ? (
            row.residents.map(url => <dd key={url}>{people[url]}</dd>)
          ) : (
            <dd>No known residents</dd>
          );
      }
    }
    return (
      <DefList>
        <Row>
          <Col>
            <dt>
              <span className="oi oi-contrast" /> Rotation Period
            </dt>
            <dd>{row.rotation_period}</dd>
            <dt>
              <span className="oi oi-sun" /> Orbital Period
            </dt>
            <dd>{row.orbital_period}</dd>
            <dt>
              <span className="oi oi-ban" /> Diameter
            </dt>
            <dd>{row.diameter}</dd>
          </Col>
          <Col>
            <dt>
              <span className="oi oi-cloud" /> Climate
            </dt>
            <dd>{row.climate}</dd>
            <dt>
              <span className="oi oi-arrow-circle-bottom" /> Gravity
            </dt>
            <dd>{row.gravity}</dd>
            <dt>
              <span className="oi oi-droplet" /> Surface Water
            </dt>
            <dd>{row.surface_water}</dd>
          </Col>
        </Row>
        <Row>
          <Col>
            <dt>
              <span className="oi oi-people" /> Residents
            </dt>
            {residents}
          </Col>
        </Row>
      </DefList>
    );
  }
}

RowDetail = connect(
  ({ people, errors, loading }) => ({ people, errors, loading }),
  { requestPeople }
)(RowDetail);

export default RowDetail;
