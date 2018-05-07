import React, { Component } from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
  TableRowDetail,
} from '@devexpress/dx-react-grid-bootstrap4';
import {
  SortingState,
  IntegratedSorting,
  FilteringState,
  IntegratedFiltering,
  RowDetailState,
} from '@devexpress/dx-react-grid';
import RowDetail from './RowDetail';
import './ReactGrid.css';

const TableComponent = ({ ...restProps }) => (
  <Table.Table
    {...restProps}
    className="table-hover table-dark table-striped table-borderless rounded table-sm mb-5"
  />
);

const TableHeadComponent = ({ ...restProps }) => (
  <Table.TableHead {...restProps} className="color--sw-blue" />
);

const FilterComponent = ({ column, ...restProps }) => {
  let className = '';
  if (column.title === 'Population') className = 'd-none';
  if (column.title === 'Terrain') className = 'd-none';
  return <TableFilterRow.Cell {...restProps} className={className} />;
};

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
        <RowDetailState />
        <Table
          tableComponent={TableComponent}
          headComponent={TableHeadComponent}
          columnExtensions={columnExtensions.table}
        />
        <TableHeaderRow showSortingControls />
        <TableFilterRow cellComponent={FilterComponent} />
        <TableRowDetail contentComponent={RowDetail} />
      </Grid>
    );
  }
}

export default ReactGrid;
