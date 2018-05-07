import React, { Component } from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-bootstrap4';
import { SortingState, IntegratedSorting } from '@devexpress/dx-react-grid';

const TableComponent = ({ ...restProps }) => (
  <Table.Table {...restProps} className="table-bordered table-hover table-sm" />
);

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
        <SortingState
          defaultSorting={[{ columnName: 'name', direction: 'asc' }]}
          columnExtensions={[{ columnName: 'terrain', sortingEnabled: false }]}
        />
        <IntegratedSorting />
        <Table tableComponent={TableComponent} />
        <TableHeaderRow showSortingControls />
      </Grid>
    );
  }
}

export default ReactGrid;
