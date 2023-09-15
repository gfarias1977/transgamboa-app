import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
import CmtAvatar from '../../../../@coremat/CmtAvatar';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IntlMessages from '@jumbo/utils/IntlMessages';
import { Delete, Edit, MoreHoriz, Visibility } from '@material-ui/icons';
// import { timeFromNow } from '../../../../@jumbo/utils/dateHelper';
// import { Block, CheckCircleOutline, Delete, Edit, Mail, MoreHoriz, Visibility } from '@material-ui/icons';
// import { useDispatch } from 'react-redux';
// import { sentMailToGuide, updateGuideStatus } from '../../../../redux/actions/Guides';

const useStyles = makeStyles(theme => ({
  titleRoot: {
    marginBottom: 2,
    fontSize: 14,
    letterSpacing: 0.25,
    color: theme.palette.common.dark,
  },
}));

const getGuideActions = user => {
  const actions = [
/*     {
      action: 'view',
      label: <IntlMessages id="guides.appModule.viewGuide" />,
      icon: <Visibility />,
    }, */
  ];

/*   actions.push({
    action: 'delete',
    label: <IntlMessages id="guides.appModule.deleteGuide" />,
    icon: <Delete />,
  }); */
  return actions;
};

const GuideListRow = ({ row, isSelected, onRowClick, onGuideEdit, onGuideDelete, onGuideView }) => {
  const classes = useStyles();
  // const dispatch = useDispatch();

  const onGuideMenuClick = menu => {
    if (menu.action === 'view') {
      onGuideView(row);
    } else if (menu.action === 'edit') {
      onGuideEdit(row);
    } else if (menu.action === 'delete') {
      onGuideDelete(row);
    }
  };

  const labelId = `enhanced-table-checkbox-${row.id}`;
  const isItemSelected = isSelected(row.id);
  const guideActions = getGuideActions(row);

  return (
    <TableRow
      hover
      onClick={event => onRowClick(event, row.id)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}>
      <TableCell padding="checkbox">
        <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
      </TableCell>
      <TableCell>{row.id}</TableCell>
      <TableCell>{row.claveUnica}</TableCell>
      <TableCell>{row.nombreCliente}</TableCell>
      <TableCell>{row.rutCliente}</TableCell>
      <TableCell>{row.direccion}</TableCell>
      <TableCell>{row.producto}</TableCell>
      <TableCell>{row.proveedor}</TableCell>
      <TableCell>{row.comuna}</TableCell>
      <TableCell>{row.guia}</TableCell>
      <TableCell>
        {new Date(row.fechaSubida).toLocaleDateString() +
          ' ' +
          new Date(row.fechaSubida).getHours() +
          ':' +
          new Date(row.fechaSubida).getMinutes()}
      </TableCell>
      <TableCell>{row.devolucion}</TableCell>
      <TableCell>{row.patente}</TableCell>
      <TableCell>{row.fono}</TableCell>
      <TableCell>{row.sensible}</TableCell>
      <TableCell>{row.fechaEntrega}</TableCell>
      <TableCell>{row.patenteReal}</TableCell>
      <TableCell>{row.encargadoPreparacion}</TableCell>
      <TableCell>{row.fechaPreparacion}</TableCell>
      <TableCell>{row.encargadoDistribucion}</TableCell>
      <TableCell>
        {new Date(row.fechaEntrada).toLocaleDateString() +
          ' ' +
          new Date(row.fechaEntrada).getHours() +
          ':' +
          new Date(row.fechaEntrada).getMinutes()}
      </TableCell>
      <TableCell>{row.encargadoDespacho}</TableCell>
      <TableCell>
        {new Date(row.fechaDespacho).toLocaleDateString() +
          ' ' +
          new Date(row.fechaDespacho).getHours() +
          ':' +
          new Date(row.fechaDespacho).getMinutes()}
      </TableCell>
      <TableCell>{row.encargadoEntrega}</TableCell>
      <TableCell>{row.estadoEntrega}</TableCell>
      <TableCell>{row.estado}</TableCell>
      <TableCell>
        {new Date(row.tagPgi).toLocaleDateString() +
          ' ' +
          new Date(row.tagPgi).getHours() +
          ':' +
          new Date(row.tagPgi).getMinutes()}
      </TableCell>
      <TableCell>{row.tagClientes}</TableCell>
      <TableCell>{row.tagDireccion}</TableCell>
      <TableCell>{row.tagFaena}</TableCell>
      <TableCell>{row.tagObservacionCliente}</TableCell>
      <TableCell>{row.tagPatente}</TableCell>
      <TableCell>
        {new Date(row.tagPgi).toLocaleDateString() +
          ' ' +
          new Date(row.tagPgi).getHours() +
          ':' +
          new Date(row.tagPgi).getMinutes()}
      </TableCell>
      <TableCell>{row.tagTipo}</TableCell>
      <TableCell>{row.tagTipoServicio}</TableCell>
      <TableCell>{row.tagTotalDo}</TableCell>
      <TableCell>{row.tagTotalDoPeso}</TableCell>
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu items={guideActions} onItemClick={onGuideMenuClick} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(GuideListRow);
