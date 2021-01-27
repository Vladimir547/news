import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers/index';
import { SignUpData, AuthAction, SET_USER, User, SET_LOADING, SIGN_OUT, SignInData, SET_ERROR } from './authActionsTypes';
import firebase from '../firebase/firebase';


export const signup = (data: SignUpData, onError: () => void): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    try {
      const res = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
      if(res.user) {
        const userData: User = {
          email: data.email,
          firstName: data.firstName,
          id: res.user.uid,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        await firebase.firestore().collection('/users').doc(res.user.uid).set(userData);
        await res.user.sendEmailVerification();
        // dispatch({
        //   type: NEED_VERIFICATION
        // });
        dispatch({
          type: SET_USER,
          payload: userData
        });
      }
    } catch (err) {
      onError();
      dispatch({
        type: SET_ERROR,
        payload: err.message
      });
    }
  }
}

export const signin = (data: SignInData, onError: () => void): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
      try {
        const res = await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
      } catch (err) {
        onError();
        dispatch(setError(err.message));
      }
    }
  }
  export const getUserById = (id: string): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
      try {
        const user = await firebase.firestore().collection('users').doc(id).get();
        if(user.exists) {
          const userData = user.data() as User;
          dispatch({
            type: SET_USER,
            payload: userData
          });
        }
      } catch (err) {
        //console.log(err);
      }
    }
  }
  export const signout = (): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
      try {
        //dispatch(setLoading(true));
        await firebase.auth().signOut();
        dispatch({
          type: SIGN_OUT
        });
      } catch (err) {
        console.log(err);
        //dispatch(setLoading(false));
      }
    }
  }
  export const setLoading = (value: boolean): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
      dispatch({
        type: SET_LOADING,
        payload: value
      });
    }
  }
export const setError = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
      dispatch({
        type: SET_ERROR,
        payload: msg
      });
    }
  }
  