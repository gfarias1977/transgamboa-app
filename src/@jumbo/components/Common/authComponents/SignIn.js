import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import IntlMessages from '../../../utils/IntlMessages';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Box, FormControl, InputLabel, Select } from '@material-ui/core';
import { AuthMethods } from '../../../../services/auth';
import ContentLoader from '../../ContentLoader';
import { alpha, makeStyles } from '@material-ui/core/styles';
import CmtImage from '../../../../@coremat/CmtImage';
import Typography from '@material-ui/core/Typography';
import { CurrentAuthMethod } from '../../../constants/AppConstants';
import { NavLink } from 'react-router-dom';
import AuthWrapper from './AuthWrapper';

const useStyles = makeStyles(theme => ({
  authThumb: {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
      order: 2,
    },
  },
  authContent: {
    padding: 20,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: props => (props.variant === 'default' ? '50%' : '100%'),
      order: 1,
    },
    [theme.breakpoints.up('xl')]: {
      padding: 50,
    },
  },
  titleRoot: {
    marginBottom: 14,
    color: theme.palette.text.primary,
  },
  textFieldRoot: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette.common.dark, 0.12),
    },
  },
  formcontrolLabelRoot: {
    '& .MuiFormControlLabel-label': {
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
    width: '70%',
    height: '80%',
    [theme.breakpoints.up('md')]: {
      width: '60%',
      order: 2,
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(4),
  },
}));
//variant = 'default', 'standard'

const SignIn = ({ method = CurrentAuthMethod, variant = 'default', wrapperVariant = 'default' }) => {
  const [user, setUser] = useState('gfarias'); //useState('demo@example.com');
  const [password, setPassword] = useState(''); //'Anto1908' //useState('demo#123');

  const dispatch = useDispatch();
  const classes = useStyles({ variant });

  const onSubmit = () => {
    dispatch(AuthMethods[method].onLogin({ user, password }));
  };

  return (
    <AuthWrapper variant={wrapperVariant}>
      {variant === 'default' ? (
        <Box className={classes.authThumb}>
          <CmtImage src={'/images/auth/login-img.png'} />
        </Box>
      ) : null}
      <Box className={classes.authContent}>
        <Box mb={3}>
          <CmtImage src={'/images/logo.png'} />
        </Box>
        <Typography component="div" variant="h1" className={classes.titleRoot}>
          Login
        </Typography>
        <form onSubmit={onSubmit}>
          <Box mb={2}>
            <TextField
              label={<IntlMessages id="appModule.user" />}
              fullWidth
              onChange={event => setUser(event.target.value)}
              defaultValue={user}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="password"
              label={<IntlMessages id="appModule.password" />}
              fullWidth
              onChange={event => setPassword(event.target.value)}
              defaultValue={password}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
          {/* <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
            <FormControlLabel
              className={classes.formcontrolLabelRoot}
              control={<Checkbox name="checkedA" />}
              label={<IntlMessages id="appModule.rememberMe" />}
            />
            <Box component="p" fontSize={{ xs: 12, sm: 16 }}>
              <NavLink to="/forgot-password">
                <IntlMessages id="appModule.forgotPassword" />
              </NavLink>
            </Box>
          </Box> */}

          <Box display="flex" alignItems="center" justifyContent="space-between" marginTop={10}>
            <Button onClick={onSubmit} variant="contained" color="primary">
              <IntlMessages id="appModule.signIn" />
            </Button>
          </Box>
        </form>

        {dispatch(AuthMethods[method].getSocialMediaIcons())}

        <ContentLoader />
      </Box>
    </AuthWrapper>
  );
};

export default SignIn;
