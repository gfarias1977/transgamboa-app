import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from '../../services/config';
import {
  //ADD_GUIDE,
  DELETE_BULK_GUIDES,
  DELETE_GUIDE,
  EDIT_GUIDE,
  GET_GUIDES,
  SET_CURRENT_GUIDE,
  GET_GUIDE_ROLES,
  RESET,
} from '../../@jumbo/constants/ActionTypes';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

export const getGuides = (startDate = '', endDate = '', filterOptions = [], searchTerm = '', callbackFun = '') => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v3/guides', { params: { startDate, endDate, filterOptions, searchTerm } })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_GUIDES, payload: data.data.guides });
          if (callbackFun) callbackFun(data.data.guides);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.guide.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.guide.error.message" />));
      });
  };
};

export const getGuidesBeetrack = (startDate = '', endDate = '', filterOptions = [], searchTerm = '', callbackFun = '') => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v3/guides/beetrack', { params: { startDate, endDate, filterOptions, searchTerm } })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_GUIDES, payload: data.data.guides });
          if (callbackFun) callbackFun(data.data.guides);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.guide.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.guide.error.message" />));
      });
  };
};

export const getScanedGuides = (guides, userName, filterOptions = [], searchTerm = '', callbackFun = '') => {
  let scanedGuides = guides;
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v3/guides/scaned', { params: { scanedGuides, userName, filterOptions, searchTerm } })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_GUIDES, payload: data.data.guides });
          if (callbackFun) callbackFun(data.data.guides);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.guide.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.guide.error.message" />));
      });
  };
};

export const getScanedGuidesNoMatch = (startDate = '', endDate = '', filterOptions = [], searchTerm = '', callbackFun = '') => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v3/guides/scanedNoMatch', { params: { startDate, endDate, filterOptions, searchTerm } })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_GUIDES, payload: data.data.guides });
          if (callbackFun) callbackFun(data.data.guides);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.guide.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.guide.error.message" />));
      });
  };
};

export const setInitStateGuide = guide => {
  return dispatch => {
    dispatch({ type: RESET, payload: [] });
  };
};

export const setCurrentGuide = guide => {
  return dispatch => {
    dispatch({ type: SET_CURRENT_GUIDE, payload: guide });
  };
};

export const deleteGuidesFromTable = guide => {
  return dispatch => {
    dispatch({ type: DELETE_GUIDE, payload: guide });
  };
};

export const deleteBulkGuidesFromTable = guides => {
  return dispatch => {
    dispatch({ type: DELETE_BULK_GUIDES, payload: guides });
  };
};

export const addNewGuide = (guide, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .post('v3/guides', guide)
      .then(data => {
        if (data.status === 201) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.guide.add.success.message" />));
          //dispatch({ type: GET_GUIDES, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          //console.log('status no es 200');
          dispatch(fetchError(<IntlMessages id="fetch.guide.error.message" />));
        }
      })
      .catch(error => {
        //console.log('catch error en la llamada');
        dispatch(fetchError(<IntlMessages id="fetch.guide.error.message" />));
      });
  };
};

export const updateGuide = (guideId, guide, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .patch(`v3/guides/${guideId}`, guide)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.guide.update.success.message" />));
          //dispatch({ type: EDIT_GUIDE, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.guide.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.guide.error.message" />));
      });
  };
};

export const updateGuideStatus = (id, guide, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;    
    axios
      .patch(`v3/guides/${id}`, guide)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.guide.update.statusSuccess.message" />));
          dispatch({ type: EDIT_GUIDE, payload: response.data });
          if (callbackFun) callbackFun(response.data);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.guide.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.guide.error.message" />));
      });
  };
};

export const updateScanedGuides = (guides, status, userName, callbackFun) => {
  let barcode = guides;
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .patch('v3/guides/', { params: { barcode, status, userName } })
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.guide.update.statusSuccess.message" />));
          //dispatch({ type: EDIT_GUIDE, payload: response.data });
          if (callbackFun) callbackFun(response.data);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.guide.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.guide.error.message" />));
      });
  };
};

export const deleteBulkGuides = (guideIds, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .put('v3/guides/bulk-delete', { guideIds })
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.guide.delete.bulkSuccess.message" />));
          dispatch({ type: DELETE_BULK_GUIDES, payload: guideIds });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.guide.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.guide.error.message" />));
      });
  };
};

export const deleteGuide = (guideId, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;    
    axios
      .delete(`v3/guides/${guideId}`)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.guide.delete.success.message" />));
          dispatch({ type: DELETE_GUIDE, payload: guideId });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.guide.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.guide.error.message" />));
      });
  };
};

export const bulkLoadGuides = (payload, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .post('v3/guides/bulkload', payload)
      .then(data => {
        if (data.status === 201) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.guides.add.success.message" />));
          //dispatch({ type: ADD_PROCESS, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.guides.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.guides.error.message" />));
      });
  };
};
