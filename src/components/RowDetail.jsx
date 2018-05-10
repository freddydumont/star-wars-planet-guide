import React, { Component } from 'react';
import { connect } from 'react-redux';

class RowDetail extends Component {
  constructor(props) {
    super(props);
    const { row, people } = this.props;

    const getResidents = () => {
      // display residents by grabbing corresponding urls from store
      return {
        residents:
          row.residents.length > 0
            ? row.residents.map(url => people[url])
            : ['No known residents'],
      };
    };

    this.state = getResidents();
  }

  render() {
    const { row } = this.props;

    return (
      <dl className="details">
        <dt>Rotation Period</dt>
        <dd>{row.rotation_period}</dd>
        <dt>Orbital Period</dt>
        <dd>{row.orbital_period}</dd>
        <dt>Diameter</dt>
        <dd>{row.diameter}</dd>
        <dt>Climate</dt>
        <dd>{row.climate}</dd>
        <dt>Gravity</dt>
        <dd>{row.gravity}</dd>
        <dt>Surface Water</dt>
        <dd>{row.surface_water}</dd>
        <dt>Residents</dt>
        {this.state.residents.map(res => <dd key={res}>{res}</dd>)}
      </dl>
    );
  }
}

RowDetail = connect(({ people }) => ({ people }))(RowDetail);

export default RowDetail;
