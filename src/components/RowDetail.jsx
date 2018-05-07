import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchResidents, storeNoResident } from '../actions';

class RowDetail extends Component {
  constructor(props) {
    super(props);
    const { row, residents, fetchResidents, storeNoResident } = this.props;

    if (row.residents.length > 0) {
      // this planet has residents, check if already in store before fetching
      if (!residents[row.name]) {
        fetchResidents(row.residents, row.name);
      }
    } else {
      // this planet has no known resident, inform store
      storeNoResident(row.name);
    }
  }

  render() {
    const { row, residents } = this.props;

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
        {residents[row.name]}
      </dl>
    );
  }
}

RowDetail = connect(({ residents }) => ({ residents }), {
  fetchResidents,
  storeNoResident,
})(RowDetail);

export default RowDetail;
