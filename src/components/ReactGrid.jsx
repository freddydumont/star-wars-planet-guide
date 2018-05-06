import React, { Component } from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-bootstrap4';

class ReactGrid extends Component {
  render() {
    return (
      <Grid
        columns={[
          { name: 'name', title: 'Name' },
          { name: 'population', title: 'Population' },
          { name: 'terrain', title: 'Terrain' },
        ]}
        rows={this.props.planets}
      >
        <Table />
        <TableHeaderRow />
      </Grid>
    );
  }
}

export default ReactGrid;
