import { AuthState, AuthAction, SET_USER, SET_ERROR, SET_LOADING, SET_SUCCESS } from '../actions/authActionsTypes';

const initialState: AuthState = {
    user: null,
    authenticated: false,
    loading: false,
    error: '',
    needVerification: false,
    success: ''
  }

const authReducer = (state = initialState, action: AuthAction) => {
    switch(action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true
    }
    case SET_LOADING:
        return {
          ...state,
          loading: action.payload
        }
    case SET_ERROR:
        return {
          ...state,
          error: action.payload
      }
    case SIGN_OUT:
    return {
        ...state,
        user: null,
        authenticated: false,
        loading: false
    }
        default: 
            return state;
    }
};

export default authReducer;