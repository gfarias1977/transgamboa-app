import React, { useEffect, useState } from 'react';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import GuideListRow from './GuideListRow';
import GuideTableHead from './GuideTableHead';
import GuideTableToolbar from './GuideTableToolbar';
import { getComparator, stableSort } from '../../../@jumbo/utils/tableHelper';
import { useDispatch, useSelector } from 'react-redux';
import { getGuidesBeetrack, deleteGuide, setCurrentGuide, setInitStateGuide} from '../../../redux/actions/Guides';
import ConfirmDialog from '../../../@jumbo/components/Common/ConfirmDialog';
import { useDebounce } from '../../../@jumbo/utils/commonHelper';
import useStyles from './index.style';
import GuideDetailView from './GuideDetailView';
import NoRecordFound from './NoRecordFound';
import IntlMessages from '@jumbo/utils/IntlMessages';
import { Box, TextField } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import GridContainer from '../../../@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { fetchError } from '../../../redux/actions';
import ExportButtonGuidesBeetrack from '../../../components/ExportButtonGuidesBeetrack';

const GuidesBeetrackModule = () => {
  const classes = useStyles();
  const { guides } = useSelector(({ guidesReducer }) => guidesReducer);
  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openGuideDialog, setOpenGuideDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [guidesFetched, setGuidesFetched] = useState(false);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setInitStateGuide());
  }, []);

  const handleCloseUserDialog = () => {
    setOpenGuideDialog(false);
    dispatch(
      getGuidesBeetrack(selectedStartDate, selectedEndDate, filterOptions, debouncedSearchTerm, () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        setGuidesFetched(true);
      }),
    );
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = guides.map(n => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleOnSubmitClick = event => {
    let checkInputData = true;
    if (selectedStartDate === null || selectedEndDate === null) {
      dispatch(fetchError(<IntlMessages id="appModule.dataRequired" />));
      checkInputData = false;
    }
    if (checkInputData === true) {
      dispatch(
        getGuidesBeetrack(selectedStartDate, selectedEndDate, filterOptions, debouncedSearchTerm, () => {
          setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
          setGuidesFetched(true);
        }),
      );
    }
  };

  const handleRowClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUserView = guide => {
    //console.log('handleUserView');
    dispatch(setCurrentGuide(guide));
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    dispatch(setCurrentGuide(null));
  };

  const handleUserEdit = guide => {
    //console.log('handleUserEdit');
    dispatch(setCurrentGuide(guide));
    setOpenGuideDialog(true);
  };

  const handleUserDelete = guide => {
    // console.log('handleUserDelete');
    setSelectedGuide(guide);
    // console.log('handleUserDelete');
    // console.log({selectedGuide});
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(false);
    dispatch(deleteGuide(selectedGuide.id));
    dispatch(
      getGuidesBeetrack(filterOptions, debouncedSearchTerm, () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        setGuidesFetched(true);
      }),
    );
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Card className={classes.root}>
          <CardHeader className={classes.dialogTitleRoot} title="Filtros Guias" />
          <CardContent>
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
              <GridContainer>
                <Grid item xs={6} sm={4}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                      disableToolbar
                      style={{ marginTop: -8 }}
                      margin="dense"
                      variant="outlined"
                      value={selectedStartDate}
                      onChange={setSelectedStartDate}
                      format="DD-MM-YYYY"
                      label={<IntlMessages id="guides.appModule.startDate" />}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                      disableToolbar
                      style={{ marginTop: -8 }}
                      margin="dense"
                      variant="outlined"
                      value={selectedEndDate}
                      onChange={setSelectedEndDate}
                      format="DD-MM-YYYY"
                      label={<IntlMessages id="guides.appModule.endDate" />}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Box display="flex" justifyContent="flex-end" mb={4}>
                  <Box ml={2}>
                    <Button variant="contained" color="primary" onClick={handleOnSubmitClick}>
                      Aplicar
                    </Button>
                  </Box>
                </Box>
                <Box display="flex" justifyContent="flex-end" mb={4}>
                  <Box ml={2}>{guides && guides.length > 0 && <ExportButtonGuidesBeetrack data={guides} />}</Box>
                </Box>
              </GridContainer>
            </Box>
          </CardContent>
        </Card>
      </Paper>
      <Paper className={classes.paper}>
        <GuideTableToolbar
          selected={selected}
          setSelected={setSelected}
          onGuideAdd={setOpenGuideDialog}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
            <GuideTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={guides.length}
            />
            <TableBody>
              {!!guides.length ? (
                stableSort(guides, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <GuideListRow
                      key={index}
                      row={row}
                      onRowClick={handleRowClick}
                      onGuideEdit={handleUserEdit}
                      onGuideDelete={handleUserDelete}
                      onGuideView={handleUserView}
                      isSelected={isSelected}
                    />
                  ))
              ) : (
                <TableRow style={{ height: 53 * 6 }}>
                  <TableCell colSpan={5} rowSpan={10}>
                    {isFilterApplied ? (
                      <NoRecordFound>{<IntlMessages id="guides.appModule.filterNoRecordsFound" />}</NoRecordFound>
                    ) : (
                      <NoRecordFound>
                        {guidesFetched ? (
                          <IntlMessages id="guides.appModule.noRecordsFound" />
                        ) : (
                          <IntlMessages id="guides.appModule.loadingGuides" />
                        )}
                      </NoRecordFound>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={guides.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>
      {openViewDialog && <GuideDetailView open={openViewDialog} onCloseDialog={handleCloseViewDialog} />}
      <ConfirmDialog
        open={openConfirmDialog}
        title={<IntlMessages id="guides.appModule.deleteConfirm" />}
        content={<IntlMessages id="guides.appModule.deleteMessage" />}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default GuidesBeetrackModule;
