import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import SamplePage from './Pages/SamplePage';
import Error404 from './Pages/404';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ForgotPasswordPage from './Auth/ForgotPassword';
// import Admin from './Admin';
import UsersModule from './Admin/Users';
import RolesModule from './Admin/Roles';
import GuidesModule from './Pages/Guides';
import GuidesScanModule from './Pages/GuidesScan';
import GuidesBeetrackModule from './Pages/GuidesBeetrack';
import GuidesScanNoMatchModule from './Pages/GuidesScanNoMatch';

const RestrictedRoute = ({ component: Component, ...rest }) => {
  const { authUser } = useSelector(({ auth }) => auth);
  return (
    <Route
      {...rest}
      render={props =>
        authUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const Routes = () => {
  const { authUser } = useSelector(({ auth }) => auth);
  const location = useLocation();

  if (location.pathname === '' || location.pathname === '/') {
    return <Redirect to={'/sample-page'} />;
  } else if (authUser && location.pathname === '/signin') {
    return <Redirect to={'/sample-page'} />;
  }

  return (
    <React.Fragment>
      <Switch>
        <RestrictedRoute path="/sample-page" component={SamplePage} />
        <Route path="/signin" component={Login} />
        <Route path="/signup" component={Register} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <RestrictedRoute path="/admin/users" component={UsersModule} />
        <RestrictedRoute path="/admin/roles" component={RolesModule} />
        <RestrictedRoute path="/Pages/guides" component={GuidesModule} />
        <RestrictedRoute path="/guides/scan" component={GuidesScanModule} />
        <RestrictedRoute path="/guides/scanNoMatch" component={GuidesScanNoMatchModule} />
        <RestrictedRoute path="/guides/beetrack" component={GuidesBeetrackModule} />
        <Route component={Error404} />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
