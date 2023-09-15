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
    {
      action: 'view',
      label: <IntlMessages id="guides.appModule.viewGuide" />,
      icon: <Visibility />,
    },
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
         <TableCell></TableCell>
      <TableCell>{row.id}</TableCell>
      <TableCell>{row.guide}</TableCell>
      <TableCell>{row.usuario}</TableCell>
      <TableCell>
        {new Date(row.date).toLocaleDateString() +
          ' ' +
          new Date(row.date).getHours() +
          ':' +
          new Date(row.date).getMinutes()}
      </TableCell>
    </TableRow>
  );
};

export default React.memo(GuideListRow);
