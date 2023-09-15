import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import PropTypes from 'prop-types';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

const headCells = [
  {
    id: '',
    numeric: false,
    disablePadding: true,
    //label: <IntlMessages id="guides.appModule.idHeader" />,
  },
  {
    id: '   id',
    numeric: false,
    disablePadding: true,
    label: <IntlMessages id="guides.appModule.idHeader" />,
  },
  {
    id: 'guia',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="guides.appModule.guiaHeader" />,
  },
  {
    id: 'usuario',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="guides.appModule.usuarioHeader" />,
  },
  {
    id: 'Fecha',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="guides.appModule.fechaHeader" />,
  },
];

function GuideTableHead({ classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) {
  const onSortOrderChange = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={onSortOrderChange(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? (
                    <IntlMessages id="guides.appModule.orderDesc" />
                  ) : (
                    <IntlMessages id="guides.appModule.orderAsc" />
                  )}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

GuideTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default React.memo(GuideTableHead);
