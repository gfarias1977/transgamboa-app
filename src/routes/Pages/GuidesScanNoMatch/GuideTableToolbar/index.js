import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import PropTypes from 'prop-types';
import { Button, Chip, Menu, MenuItem } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { deleteBulkUsers } from '../../../../redux/actions/Users';
import ConfirmDialog from '../../../../@jumbo/components/Common/ConfirmDialog';
import CmtSearch from '../../../../@coremat/CmtSearch';
import useStyles from './index.style';
import Checkbox from '@material-ui/core/Checkbox';
import IntlMessages from '@jumbo/utils/IntlMessages';

const GuideTableToolbar = ({
  selected,
  setSelected,
  onGuideAdd,
  filterOptions,
  setFilterOptions,
  searchTerm,
  setSearchTerm,
}) => {
  const classes = useStyles();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const dispatch = useDispatch();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDeleteCLick = () => {
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(false);
    dispatch(deleteBulkUsers(selected, () => setSelected([])));
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  const onFilterOptionClick = option => {
    setFilterOptions(prevState => {
      if (prevState.includes(option.value)) {
        return prevState.filter(item => item !== option.value);
      } else {
        return [...prevState, option.value];
      }
    });
  };

  const onChipDelete = option => {
    setFilterOptions(filterOptions.filter(item => item !== option.value));
  };

  const onSearchChipDelete = () => setSearchTerm('');

  const numSelected = selected.length;

  return (
    <React.Fragment>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}>
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected}{' '}
            {numSelected > 1 ? (
              <IntlMessages id="guides.appModule.selectedGuides" />
            ) : (
              <IntlMessages id="guides.appModule.selectedGuide" />
            )}
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h4" id="tableTitle" component="div">
            {<IntlMessages id="guides.appModule.guides" />}{' '}
          </Typography>
        )}

        {numSelected > 0 ? (
          <Tooltip title={<IntlMessages id="guides.appModule.deleteGuide" />}>
            <IconButton aria-label="delete" onClick={onDeleteCLick}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <React.Fragment>
            <CmtSearch onChange={e => setSearchTerm(e.target.value)} value={searchTerm} border={false} onlyIcon />
          </React.Fragment>
        )}
      </Toolbar>

      <ConfirmDialog
        open={openConfirmDialog}
        title={<IntlMessages id="guides.appModule.confirmDelete" />}
        content={<IntlMessages id="guides.appModule.confirmDeleteContent" />}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </React.Fragment>
  );
};

GuideTableToolbar.propTypes = {
  selected: PropTypes.array,
  setSelected: PropTypes.func,
  filterOptions: PropTypes.array,
  setFilterOptions: PropTypes.func,
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
  onGuideAdd: PropTypes.func,
};

export default React.memo(GuideTableToolbar);
