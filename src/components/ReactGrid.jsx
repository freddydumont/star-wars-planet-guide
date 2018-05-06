import React, { Component } from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-bootstrap4';

class ReactGrid extends Component {
  state = {};
  render() {
    return (
      <Grid
        columns={[
          { name: 'name', title: 'Name' },
          { name: 'population', title: 'Population' },
          { name: 'terrain', title: 'Terrain' },
        ]}
        rows={[{ name: 'test', population: 1000, terrain: 'land' }]}
      >
        <Table />
        <TableHeaderRow />
      </Grid>
    );
  }
}

export default ReactGrid;
