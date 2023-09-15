/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import GuideListRow from './GuideScanListRow';
import GuideTableHead from './GuideScanTableHead';
import GuideTableToolbar from './GuideScanTableToolbar';
import { getComparator, stableSort } from '../../../@jumbo/utils/tableHelper';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateScanedGuides,
  deleteGuidesFromTable,
  getScanedGuides,
  setInitStateGuide,
} from '../../../redux/actions/Guides';
import ConfirmDialog from '../../../@jumbo/components/Common/ConfirmDialog';
import { useDebounce } from '../../../@jumbo/utils/commonHelper';
import useStyles from './index.style';
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
import AppSelectBox from '../../../@jumbo/components/Common/formElements/AppSelectBox';

const GuidesScanModule = () => {
  const classes = useStyles();
  const { guides } = useSelector(({ guidesReducer }) => guidesReducer);
  const { authUser } = useSelector(({ auth }) => auth);
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
  const [scanedBarcodes, setScanedBarcodes] = useState('');
  const [scanedBarcodesError, setScanedBarcodesError] = useState('');
  const [status, setStatus] = useState('');
  const [statusError, setStatusError] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setInitStateGuide());
  }, []);

  const labels = [
    { title: 'Recibido', slug: 'R' },
    { title: 'Preparado', slug: 'P' },
    { title: 'Despachado', slug: 'D' },
  ];

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
    if (!scanedBarcodes) {
      setScanedBarcodesError(<IntlMessages id="guidesScan.appModule.requiredMessage" />);
      checkInputData = false;
    }
    if (!status) {
      setStatusError(<IntlMessages id="guidesScan.appModule.requiredMessage" />);
      checkInputData = false;
    }
    if (checkInputData === true) {
      console.log(scanedBarcodes);
      dispatch(
        updateScanedGuides(scanedBarcodes, status, authUser.userName, filterOptions, debouncedSearchTerm, () => {
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

  const handleGuideDelete = guide => {
    setSelectedGuide(guide);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(false);
    dispatch(deleteGuidesFromTable(selectedGuide.id));
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  const handleScanedBarcode = barcode => {
    //let result = barcode.search(/\n/);
    let result = barcode.charAt(barcode.length - 1);
    //console.log('Result:' + result);
    setScanedBarcodes({ ...scanedBarcodes, barcode });
    if (result === '\n') {
      //setScanedBarcodes(barcode);
      console.log(scanedBarcodes);
      //let guias = barcode.replace(/\n/, ',');
      dispatch(
        getScanedGuides(barcode, authUser.userName, filterOptions, debouncedSearchTerm, () => {
          setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
          setGuidesFetched(true);
        }),
      );
    } 
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Card className={classes.root}>
          <CardHeader className={classes.dialogTitleRoot} title="Escane guías y seleccione Estado a actualizar" />
          <CardContent>
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
              <GridContainer>
                <Grid item xs={12} sm={12}>
                  <TextField
                    multiline
                    minRows={5}
                    maxRows={10}
                    fullWidth
                    label={<IntlMessages id="guides.guidesScan.label.scanedBarcodes" />}
                    variant="outlined"
                    onChange={e => {
                      handleScanedBarcode(e.target.value);
                    }}
                    helperText={scanedBarcodesError}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <AppSelectBox
                    fullWidth
                    data={labels}
                    label={<IntlMessages id="guides.guidesScan.label.status" />}
                    valueKey="slug"
                    variant="outlined"
                    labelKey="title"
                    value={status}
                    onChange={e => {
                      setStatus(e.target.value);
                    }}
                    helperText={statusError}
                  />
              </Grid>
                <Box display="flex" justifyContent="flex-end" mb={4}>
                  <Box ml={2}>
                    <Button variant="contained" color="primary" onClick={handleOnSubmitClick}>
                      Aplicar
                    </Button>
                  </Box>
                </Box>
{/*                 <Box display="flex" justifyContent="flex-end" mb={4}>
                  <Box ml={2}>{guides && guides.length > 0 && <ExportButton data={guides} />}</Box>
                </Box> */}
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
                      onGuideDelete={handleGuideDelete}
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

export default GuidesScanModule;
