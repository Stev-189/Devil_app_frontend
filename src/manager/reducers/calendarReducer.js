import { types } from '../types/types';
/* {
  id: new Date().getTime(),
  title: 'Cita',
  start: moment().toDate(),
  end: moment().add(1, 'hours').toDate(),
  bgcolor: '#8B0000',
  userId: "1",
  userName: "Stev Pavez",
  userEmail: "stevPavez@gmail.com",
  hora: "14:00",
  date: moment().toDate(),
} */

const initialState = {
  events: [],
  activeEvent: null,
}

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload
      }
    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload]
      }
    case types.eventClearActiveEvent:
      return {
        ...state,
        activeEvent: null
      }
    case types.eventUpdated:
      return {
        ...state,
        events: state.events.map(e =>(e.id===action.payload.id ? action.payload : e))
      }
    case types.eventDeleted:
      return {
        ...state,
        events: state.events.filter(e =>(e.id!==state.activeEvent.id)),
        activeEvent: null
      }
    case types.eventLoaded:
      return {
        ...state,
        events: [...action.payload]
      }
    case types.eventClear:
      return initialState;
    default:
      return state;
  }
}