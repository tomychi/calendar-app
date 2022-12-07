import moment from "moment";

export const prepararEvents = (events = []) => {
  return events.map((e) => ({
    ...e,
    end: moment(e.end).toDate(),
    start: moment(e.start).toDate(),
  }));
};
