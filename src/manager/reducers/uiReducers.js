import { types } from "../types/types"

const initialState = {
  modalOpen: false,
}

export const uiReducer = (state= initialState, action) => {
  switch (action.type) {
    case types.uiOpenModal:
      return {
        ...state,
        modalOpen: true,
        modalData: action.payload
      }
    case types.uiCloseModal:
      return {
        ...state,
        modalOpen: false,
        modalData: null
      }
    default:
      return state
  }
}