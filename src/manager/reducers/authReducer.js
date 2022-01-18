import { types } from "../types/types"

const initialState = {
  cheking: true,
  userId: null,
  userName: null,
  userEmail: null,
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        ...action.payload,
        cheking: false
      } 
    case types.authChekingFinish:
      return{
        ...state,
        cheking: false
      }
    case types.authLogout:
      return {
        ...initialState,
        cheking: false
      }
    default:
      return state
  }
}