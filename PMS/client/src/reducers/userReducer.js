import { SET_EMAIL, SET_USER_TYPE, SET_USER_NAME, SET_GOVT_ID } from '../actions/userActions';

const initialState = {
  email: '',
  userType: '',
  name: '',
  govtId: '', // Initialize the govtId field
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case SET_USER_TYPE:
      return {
        ...state,
        userType: action.payload,
      };
    case SET_USER_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case SET_GOVT_ID: // Handle the new action type for setting the user's government ID
      return {
        ...state,
        govtId: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
