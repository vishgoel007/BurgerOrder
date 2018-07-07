import * as actionTypes from './actionTypes';
import axios from 'axios'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  }
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
};

export const authLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  }

};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout());
    },expirationTime * 1000)
  }

};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDBgmsRlESNfGLx9ouFtwXBUz7R0SV0mbU';
    if(isSignup){
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDBgmsRlESNfGLx9ouFtwXBUz7R0SV0mbU';
    }
    axios.post(url, authData)
        .then(response => {
          console.log(response);
          const expirationDate = new Date(new Date().getTime() + response.data.expiresIn*1000);
          localStorage.setItem('token', response.data.idToken );
          localStorage.setItem('expirationDate', expirationDate );
          localStorage.setItem('userId', response.data.localId );
          dispatch(authSuccess(response.data.idToken, response.data.localId));
          dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
          dispatch(authFail(err.response.data.error));
        })
  }
};

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (token) {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      const userId = localStorage.getItem('userId');
      const newExpirationTime = expirationDate - new Date();
      if (newExpirationTime > 0) {
        dispatch(checkAuthTimeout(newExpirationTime/1000));
        dispatch(authSuccess(token, userId));
      }
      else dispatch(authLogout());
    }
    else {
      dispatch(authLogout());
    }
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
};
