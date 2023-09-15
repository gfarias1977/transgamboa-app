import {
  ADD_GUIDE,
  DELETE_BULK_GUIDES,
  DELETE_GUIDE,
  EDIT_GUIDE,
  GET_GUIDES,
  SET_CURRENT_GUIDE,
  RESET,
} from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  guides: [],
  currentGuide: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_GUIDES: {
      return {
        ...state,
        guides: action.payload,
      };
    }
    case SET_CURRENT_GUIDE: {
      return {
        ...state,
        currentGuide: action.payload,
      };
    }
    case ADD_GUIDE: {
      return {
        ...state,
        guides: [action.payload, ...state.guides],
      };
    }
    case EDIT_GUIDE: {
      return {
        ...state,
        guides: state.guides.map(guide => (guide.id === action.payload.id ? action.payload : guide)),
      };
    }
    case DELETE_GUIDE: {
      return {
        ...state,
        guides: state.guides.filter(guide => guide.id !== action.payload),
      };
    }
    case DELETE_BULK_GUIDES: {
      return {
        ...state,
        guides: state.guides.filter(guide => !action.payload.includes(guide.id)),
      };
    }
    case RESET: {
      return {
        guides: action.payload,
      };
    }
    default:
      return state;
  }
};
