export const SET_EMAIL = 'SET_EMAIL';
export const SET_USER_TYPE = 'SET_USER_TYPE'; 
export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_GOVT_ID = 'SET_GOVT_ID'; // New action type for setting government ID

export const setEmail = (email) => {
  return {
    type: SET_EMAIL,
    payload: email,
  };
};

export const setUserType = (userType) => {
  return {
    type: SET_USER_TYPE,
    payload: userType,
  };
};

export const setName = (name) => {
  return {
    type: SET_USER_NAME,
    payload: name,
  };
};

export const setGovtId = (govtId) => { // Action creator for setting government ID
  return {
    type: SET_GOVT_ID,
    payload: govtId,
  };
};
