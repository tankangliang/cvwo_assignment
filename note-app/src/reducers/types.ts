import { RootState } from "../store";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

export const INITIALIZE_NOTES = "INITIALIZE_NOTES";
export const CREATE_NOTE = "CREATE_NOTE";
export const UPDATE_NOTE = "UPDATE_NOTE";
export const REMOVE_NOTE = "REMOVE_NOTE";

export const INITIALIZE_TAGS = "INITIALIZE_TAGS";
export const FILTER_TAGS = "FILTER_TAGS";

export const INITIALIZE_EVENTS = "INITIALIZE_EVENTS";
export const FILTER_DATE = "FILTER_DATE";

export interface INote {
  id: number;
  content: string;
  tags: string[];
  done: boolean;
  dateComplete: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface INewNote {
  content: string;
  tags: string[];
  done: boolean;
  dateComplete: Date | null;
}

interface IInitializeNotesAction {
  type: typeof INITIALIZE_NOTES;
  data: INote[];
}

interface ICreateNoteAction {
  type: typeof CREATE_NOTE;
  data: INote;
}

interface IUpdateNoteAction {
  type: typeof UPDATE_NOTE;
  data: INote;
}

interface IRemoveNoteAction {
  type: typeof REMOVE_NOTE;
  data: number;
}

export type NoteActionTypes =
  | IInitializeNotesAction
  | ICreateNoteAction
  | IUpdateNoteAction
  | IRemoveNoteAction;

export interface ITags {
  all: string[];
  filter: string[];
}

interface IInitializeTagsAction {
  type: typeof INITIALIZE_TAGS;
  data: string[];
}

interface IFilterTagsAction {
  type: typeof FILTER_TAGS;
  data: string;
}

export type TagActionTypes = IInitializeTagsAction | IFilterTagsAction;

export interface IDates {
  filterType: string;
  events: any;
}

export interface IInitializeEventsAction {
  type: typeof INITIALIZE_EVENTS;
  data: any;
}

export interface IFilterDatesAction {
  type: typeof FILTER_DATE;
  data: string;
}

export type DatesActionTypes = IInitializeEventsAction | IFilterDatesAction;

export type ActionThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  null,
  Action<string>
>;
