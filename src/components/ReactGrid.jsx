import React, { Component } from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
} from '@devexpress/dx-react-grid-bootstrap4';
import {
  SortingState,
  IntegratedSorting,
  FilteringState,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid';

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
        <FilteringState
          columnExtensions={[
            { columnName: 'population', filteringEnabled: false },
            { columnName: 'terrain', filteringEnabled: false },
          ]}
        />
        <IntegratedFiltering />
        <SortingState
          defaultSorting={[{ columnName: 'name', direction: 'asc' }]}
          columnExtensions={[{ columnName: 'terrain', sortingEnabled: false }]}
        />
        <IntegratedSorting
          columnExtensions={[
            {
              // custom sorting fn for population
              columnName: 'population',
              compare: (a, b) =>
                a === 'unknown' ? -1 : b === 'unknown' ? 1 : a - b,
            },
          ]}
        />
        <Table
          tableComponent={TableComponent}
          columnExtensions={[{ columnName: 'terrain', wordWrapEnabled: true }]}
        />
        <TableHeaderRow showSortingControls />
        <TableFilterRow />
      </Grid>
    );
  }
}

export default ReactGrid;
