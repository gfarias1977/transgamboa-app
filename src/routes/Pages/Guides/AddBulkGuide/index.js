import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
//import Box from '@material-ui/core/Box';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import AppTextInput from '../../../../@jumbo/components/Common/formElements/AppTextInput';
import CmtAvatar from '../../../../@coremat/CmtAvatar';
import { useDropzone } from 'react-dropzone';
import Button from '@material-ui/core/Button';
import AppSelectBox from '../../../../@jumbo/components/Common/formElements/AppSelectBox';
import IntlMessages from '../../../../@jumbo/utils/IntlMessages';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { bulkLoadGuides } from '../../../../redux/actions/Guides';
import UploadFileIcon from '@material-ui/icons/CloudUpload';
import { fetchError } from '../../../../redux/actions';

//import { Box, TextField } from '@material-ui/core';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  dialogRoot: {
    position: 'relative',
  },
  dialogTitleRoot: {
    '& .MuiTypography-h6': {
      fontSize: 16,
      color: theme.palette.common.dark,
    },
  },
}));

const AddBulkGuide = ({ open, onCloseDialog }) => {
  const classes = useStyles();

  // Upload Json Stock
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');
  const [json, setJson] = useState('');

  const dispatch = useDispatch();

  const onSubmitClick = () => {
    let createOrUpdate = true;
    // Valida email para notificacion de proceso stock
    // Valida json stock
    if (!file) {
      createOrUpdate = false;
      dispatch(fetchError(<IntlMessages id="procesess.appModule.dataRequired.json" />));
    }

    if (createOrUpdate) {
      onProcessSave();
    }
  };

  const onProcessSave = () => {
    const payload = {
      data: JSON.parse(json),
    };

    dispatch(
      bulkLoadGuides(payload, () => {
        onCloseDialog();
      }),
    );
  };

  const handleFileUpload = e => {
    if (!e.target.files) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], 'UTF-8');
    fileReader.onload = e => {
      //console.log("e.target.result", e.target.result);
      setJson(e.target.result);
    };

    const file = e.target.files[0];
    const { name } = file;
    setFile(file);
    setFilename(name);
  };

  return (
    <Dialog open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>
        <IntlMessages id="guides.editCreate.form.createTitle" />
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
          <GridContainer>
            <Grid item xs={12} sm={6}>
              <Button component="label" variant="outlined" startIcon={<UploadFileIcon />} sx={{ marginRight: '1rem' }}>
                Upload Json Guias
                <input type="file" accept=".json" hidden onChange={handleFileUpload} />
              </Button>
              <Box>{filename}</Box>
            </Grid>
          </GridContainer>
        </Box>
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button onClick={onCloseDialog}>Cancel</Button>
          <Box ml={2}>
            <Button variant="contained" color="primary" onClick={onSubmitClick}>
              Submit
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddBulkGuide;

AddBulkGuide.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};
