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
import './ReactGrid.css';

const TableComponent = ({ ...restProps }) => (
  <Table.Table {...restProps} className="table-bordered table-hover table-sm" />
);

const RowDetail = ({ row }) => (
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
    {row.residents.length > 0 ? (
      row.residents.map(resident => <dd key={resident}>{resident}</dd>)
    ) : (
      <dd>No known residents</dd>
    )}
  </dl>
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
        <RowDetailState />
        <Table
          tableComponent={TableComponent}
          columnExtensions={columnExtensions.table}
        />
        <TableHeaderRow showSortingControls />
        <TableFilterRow />
        <TableRowDetail contentComponent={RowDetail} />
      </Grid>
    );
  }
}

export default ReactGrid;
