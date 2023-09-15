import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from '../../services/config';
import {
  //ADD_USER,
  DELETE_BULK_USERS,
  DELETE_USER,
  EDIT_USER,
  GET_USERS,
  SET_USER_DETAILS,
  GET_USER_ROLES,
} from '../../@jumbo/constants/ActionTypes';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

export const getUsers = (filterOptions = [], searchTerm = '', callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v3/users', { params: { filterOptions, searchTerm } })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_USERS, payload: data.data.users });
          if (callbackFun) callbackFun(data.data.users);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.user.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.user.error.message" />));
      });
  };
};

export const setCurrentUser = user => {
  return dispatch => {
    dispatch({ type: SET_USER_DETAILS, payload: user });
  };
};

export const setCurrentUserRoles = userRoles => {
  return dispatch => {
    dispatch({ type: GET_USER_ROLES, payload: userRoles });
  };
};


export const addNewUser = (user, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .post('v3/users', user)
      .then(data => {
        if (data.status === 201) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.user.add.success.message" />));
          //dispatch({ type: GET_USERS, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          //console.log('status no es 200');
          dispatch(fetchError(<IntlMessages id="fetch.user.error.message" />));
        }
      })
      .catch(error => {
        //console.log('catch error en la llamada');
        dispatch(fetchError(<IntlMessages id="fetch.user.error.message" />));
      });
  };
};

export const sentMailToUser = () => {
  return dispatch => {
    dispatch(fetchSuccess('Email has been sent to user successfully'));
  };
};

export const updateUser = (userId, user, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .patch(`v3/users/${userId}`, user)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.user.update.success.message" />));
          //dispatch({ type: EDIT_USER, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.user.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.user.error.message" />));
      });
  };
};

export const updateUserStatus = (data, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('v3//users/update-status', data)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.user.update.statusSuccess.message" />));
          dispatch({ type: EDIT_USER, payload: response.data });
          if (callbackFun) callbackFun(response.data);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.user.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.user.error.message" />));
      });
  };
};

export const deleteBulkUsers = (userIds, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('v3/users/bulk-delete', { userIds })
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.user.delete.bulkSuccess.message" />));
          dispatch({ type: DELETE_BULK_USERS, payload: userIds });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.user.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.user.error.message" />));
      });
  };
};

export const deleteUser = (userId, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .delete(`v3/users/${userId}`)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.user.delete.success.message" />));
          dispatch({ type: DELETE_USER, payload: userId });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.user.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.user.error.message" />));
      });
  };
};

export const getUserRoles = (userId, filterOptions = [], searchTerm = '', callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get(`v3/userRoles/getAllRolesByUserId?usroUserId=${userId}`, {
        params: { filterOptions, searchTerm },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_USER_ROLES, payload: data.data.userRoles });
          if (callbackFun) callbackFun(data.data.userRoles);
          // console.log('getUserRoles Actions')
          // console.log(data.data.userRoles);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.user.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.user.error.message" />));
      });
  };
};


export const addUserRoles = (userRoles, callbackFun) => {
  return dispatch => {
    //console.log(JSON.stringify({userRoles}));
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .post(`v3/userRoles/createUserRoles`, JSON.stringify({ userRoles }))
      .then(data => {
        //console.log(data.status);
        if (data.status === 201) {
          dispatch(fetchSuccess());
          // dispatch({ type: GET_USER_ROLES, payload: [] });
          if (callbackFun) callbackFun(data.data.userRoles);
          //console.log('getUserRoles Actions')
          //console.log(data.data.userRoles);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.user.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.user.error.message" />));
      });
  };
};

export const addUserPurchaseAreas = (userPurchaseAreas, callbackFun) => {
  return dispatch => {
    //console.log(JSON.stringify({userPurchaseAreas}));
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .post(`v3/userPurchaseAreas/createUserPurchaseAreas`, JSON.stringify({ userPurchaseAreas }))
      .then(data => {
        //console.log(data.status);
        if (data.status === 201) {
          dispatch(fetchSuccess());
          // dispatch({ type: GET_USER_ROLES, payload: [] });
          if (callbackFun) callbackFun(data.data.userPurchaseAreas);
          //console.log('getUserRoles Actions')
          //console.log(data.data.userRoles);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.user.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.user.error.message" />));
      });
  };
};

export const addUserBusinessUnits = (userBusinessUnits, callbackFun) => {
  return dispatch => {
    //console.log(JSON.stringify({userBusinessUnits}));
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .post(`v3/userBusinessUnits/createUserBusinessUnits`, JSON.stringify({ userBusinessUnits }))
      .then(data => {
        //console.log(data.status);
        if (data.status === 201) {
          dispatch(fetchSuccess());
          // dispatch({ type: GET_USER_ROLES, payload: [] });
          if (callbackFun) callbackFun(data.data.userBusinessUnits);
          //console.log('getUserRoles Actions')
          //console.log(data.data.userRoles);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.user.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.user.error.message" />));
      });
  };
};
