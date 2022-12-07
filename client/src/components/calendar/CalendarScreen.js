import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import { NavBar } from "../ui/NavBar";
import { messages } from "../../helpers/calendar-messages-es";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";
import { uiOpenModal } from "../../actions/ui";
import {
  eventClearActiveEvent,
  eventSetActive,
  eventStartLoading,
} from "../../actions/events";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";

moment.locale("es");

const localizer = momentLocalizer(moment);
export const CalendarScreen = () => {
  const dispatch = useDispatch();
  // leer del store, los events
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const { uid } = useSelector((state) => state.auth);

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e); // grabamos en el localstorage el valor de la vista
  };

  const onSelectSlot = (e) => {
    dispatch(eventClearActiveEvent()); // para quitar la nota activa si clikeo afuera
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: uid === event.user._id ? "#367cf7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
    };

    return {
      style,
    };
  };

  return (
    <div className="calendar-screen">
      <NavBar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        onSelectSlot={onSelectSlot}
        selectable={true}
        view={lastView}
        components={{
          event: CalendarEvent,
        }}
      />
      <AddNewFab />

      {
        // si hay un evento activo, mostrar el modal
        activeEvent && <DeleteEventFab />
      }

      <CalendarModal />
    </div>
  );
};
