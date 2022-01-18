import Swal from 'sweetalert2'

import { fetchSinToken, fetchConToken } from "../../helpers/fetch"
import { types } from "../types/types";
import { eventClear } from './eventsActions';


export const startLogin = (email, password) => {
  return async(dispatch) => {
    //console.log(email, password);
    const resp = await fetchSinToken('login', { email, password }, 'POST');
    const body = await resp.json();
    if(body?.result){
      localStorage.setItem('token', body?.data?.token);
     dispatch(login({
      userId: body?.data?.id,
      userName: body?.data?.name,
      userEmail: body?.data?.email,
     }));
    } else {
      Swal.fire('Error', body?.msg , 'error');
    }
  }
}

export const startRegister = ( email, password, name ) => {
  return async(dispatch) => {
    const resp = await fetchSinToken('auth', { email, password, name }, 'POST');
    const body = await resp.json();
    if(body?.result){
      localStorage.setItem('token', body?.data?.token);
      dispatch(login({
        userId: body?.data?.id,
        userName: body?.data?.name,
        userEmail: body?.data?.email,
      }));
    } else {
      Swal.fire('Error', body?.msg , 'error');
    }
  }
}

export const startCheking = () => {
  return async(dispatch) => {
    const resp = await fetchConToken('login');
    const body = await resp.json();
    if(body?.result){
      localStorage.setItem('token', body?.data?.token);
      dispatch(login({
        userId: body?.data?.id,
        userName: body?.data?.name,
        userEmail: body?.data?.email,
      }));
    } else {
      //Swal.fire('Error', body?.msg , 'error');
      dispatch(checkingFinish());
    }
  }
}

const checkingFinish = () => ({ type: types?.authChekingFinish});

const login =(user) => ({
  type: types.authLogin,
  payload: user
})

export const startLogout = () => {
  return async(dispatch) => {
    localStorage.removeItem('token');
    dispatch(eventClear());
    dispatch(logout());
  }
}

const logout = () => ({ type: types.authLogout });