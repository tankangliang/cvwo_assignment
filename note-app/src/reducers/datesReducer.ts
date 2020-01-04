import {
  IDates,
  FILTER_DATE,
  INITIALIZE_EVENTS,
  DatesActionTypes,
  INote
} from "./types";
import moment from "moment";

const initialState: IDates = {
  filterType: "sort",
  events: {}
};

const datesReducer = (
  state: IDates = initialState,
  action: DatesActionTypes
) => {
  switch (action.type) {
    case INITIALIZE_EVENTS:
      return { ...state, events: action.data };
    case FILTER_DATE:
      return { ...state, filterType: action.data };
    default:
      return state;
  }
};

export const setDateFilter = (filter: string): DatesActionTypes => {
  return {
    type: FILTER_DATE,
    data: filter
  };
};

export const initializeEvents = (notes: INote[]) => {
  const eventDates: any = {};
  notes.forEach(note => {
    if (
      eventDates[moment(note.dateComplete!).format("D MMMM YYYY")] === undefined
    ) {
      eventDates[moment(note.dateComplete!).format("D MMMM YYYY")] = 1;
    } else {
      eventDates[moment(note.dateComplete!).format("D MMMM YYYY")] += 1;
    }
  });
  return {
    type: INITIALIZE_EVENTS,
    data: eventDates
  };
};

export default datesReducer;
