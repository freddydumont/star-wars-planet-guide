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
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'population', title: 'Population' },
        { name: 'terrain', title: 'Terrain' },
      ],
      rows: this.props.planets,
      defaultSorting: [{ columnName: 'name', direction: 'asc' }],
      columnExtensions: {
        table: [{ columnName: 'terrain', wordWrapEnabled: true }],
        filteringState: [
          { columnName: 'population', filteringEnabled: false },
          { columnName: 'terrain', filteringEnabled: false },
        ],
        sortingState: [{ columnName: 'terrain', sortingEnabled: false }],
        integratedSorting: [
          {
            // custom sorting fn for population
            columnName: 'population',
            compare: (a, b) =>
              a === 'unknown' ? -1 : b === 'unknown' ? 1 : a - b,
          },
        ],
      },
    };
  }

  render() {
    const { rows, columns, defaultSorting, columnExtensions } = this.state;

    return (
      <Grid columns={columns} rows={rows}>
        <FilteringState columnExtensions={columnExtensions.filteringState} />
        <IntegratedFiltering />
        <SortingState
          defaultSorting={defaultSorting}
          columnExtensions={columnExtensions.sortingState}
        />
        <IntegratedSorting
          columnExtensions={columnExtensions.integratedSorting}
        />
        <Table
          tableComponent={TableComponent}
          columnExtensions={columnExtensions.table}
        />
        <TableHeaderRow showSortingControls />
        <TableFilterRow />
      </Grid>
    );
  }
}

export default ReactGrid;
