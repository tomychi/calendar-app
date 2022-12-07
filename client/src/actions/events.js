import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepararEvents } from "../helpers/prepararEvents";
import { types } from "../types/types";

export const evenStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;

    try {
      const resp = await fetchConToken("events", event, "POST");
      const body = await resp.json();
      if (body.ok) {
        event.id = body.eventoGuardado.id;
        event.user = {
          _id: uid,
          name: name,
        };
        dispatch(eventAddNew(event));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventSetActive = (event) => ({
  type: types.evenSetActive,
  payload: event,
});

export const eventClearActiveEvent = () => ({
  type: types.eventClearActive,
});

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`events/${event.id}`, event, "PUT");
      const body = await resp.json();

      if (body.ok) {
        dispatch(eventUpdated(event));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventUpdated = (event) => ({
  type: types.eventUpdate,
  payload: event,
});

export const eventStartDelete = () => {
  return async (dispatch, getState) => {
    const { id } = getState().calendar.activeEvent;
    try {
      const resp = await fetchConToken(`events/${id}`, {}, "DELETE");
      const body = await resp.json();

      if (body.ok) {
        dispatch(eventeDelete());
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventeDelete = () => ({
  type: types.eventDeleted,
});

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken("events");
      const body = await resp.json();
      // console.log(body);
      const events = prepararEvents(body.eventos);
      dispatch(eventLoading(events));
    } catch (error) {
      console.log(error);
    }
  };
};

const eventLoading = (events) => ({
  type: types.eventLoaded,
  payload: events,
});

export const eventLogout = () => ({
  type: types.eventLogout,
});
