import { types } from "../types/types";
/*

    {
      id: 12ahd25ghdf,
      title: "cumple del padre",
      start: moment().toDate(),
      end: moment().add(2, "hours").toDate(),
      notes: "comprar el pastel",
      user: {
        _id: "123",
        name: "Juan",
      },
    },

*/

const initialState = {
  events: [],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.evenSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      };
    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case types.eventClearActive:
      return {
        ...state,
        activeEvent: null,
      };
    case types.eventUpdate:
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        ), // (payload.id es el que modifique)actualizar el evento que editemos
      };
    case types.eventDeleted:
      return {
        ...state,
        events: state.events.filter(
          (event) => event.id !== state.activeEvent.id
        ), // dejo las que tenga el id diferente al que esta activo
        activeEvent: null,
      };
    case types.eventLoaded:
      return {
        ...state,
        events: [...action.payload],
      };
    case types.eventLogout:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
