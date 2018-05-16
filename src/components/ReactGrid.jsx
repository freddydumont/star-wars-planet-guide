import React, { Component } from 'react';
import { Badge } from 'reactstrap';
import styled from 'styled-components';
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
  DataTypeProvider,
} from '@devexpress/dx-react-grid';
import RowDetail from './RowDetail';
import terrainPills from '../terrain';

const TableComponent = ({ ...restProps }) => (
  <Table.Table
    {...restProps}
    className="table-hover table-dark table-striped table-borderless rounded table-sm mb-5"
  />
);

const TableHeadComponent = props => <Table.TableHead {...props} />;

const StyledTableHeadComponent = styled(TableHeadComponent)`
  color: #4bd5ee;
`;

const FilterComponent = ({ column, ...restProps }) => {
  let className = '';
  if (column.title === 'Population') className = 'd-none';
  if (column.title === 'Terrain') className = 'd-none';
  return <TableFilterRow.Cell {...restProps} className={className} />;
};

const TerrainFormatter = ({ value }) => {
  return value.split(', ').map(val => (
    <Badge key={val} pill color={terrainPills[val]} className="mr-1">
      {val}
    </Badge>
  ));
};

const TerrainTypeProvider = props => (
  <DataTypeProvider formatterComponent={TerrainFormatter} {...props} />
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
      terrainColumns: ['terrain'],
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
    const {
      rows,
      columns,
      terrainColumns,
      defaultSorting,
      columnExtensions,
    } = this.state;

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
        <TerrainTypeProvider for={terrainColumns} />
        <Table
          tableComponent={TableComponent}
          headComponent={StyledTableHeadComponent}
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
