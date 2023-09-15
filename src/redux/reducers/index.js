import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import Common from './Common';
import Auth from './Auth';
import Users from './Users';
import Roles from './Roles';
import Guides from './Guides';

export default history =>
  combineReducers({
    router: connectRouter(history),
    common: Common,
    auth: Auth,
    usersReducer: Users,
    rolesReducer: Roles,
    guidesReducer: Guides,
  });
