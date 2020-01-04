import {
  INote,
  INewNote,
  INITIALIZE_NOTES,
  NoteActionTypes,
  ActionThunk,
  CREATE_NOTE,
  UPDATE_NOTE,
  REMOVE_NOTE
} from "./types";
import noteService from "../services/notes";

const initialState: INote[] = [];

const notesReducer = (
  state: INote[] = initialState,
  action: NoteActionTypes
) => {
  switch (action.type) {
    case INITIALIZE_NOTES:
      return action.data;
    case CREATE_NOTE:
      return [...state, action.data];
    case UPDATE_NOTE:
      return state.map(note =>
        note.id === action.data.id ? action.data : note
      );
    case REMOVE_NOTE:
      return state.filter(note => note.id !== action.data);
    default:
      return state;
  }
};

const noteTransform = (note: INote) => {
  note.dateComplete = new Date(note.dateComplete!);
  note.created_at = new Date(note.created_at!);
  return note;
};
export const initializeNotes = (): ActionThunk => async dispatch => {
  const response = await noteService.getAll();
  response.forEach((note: INote) => {
    noteTransform(note);
  });
  dispatch({
    type: INITIALIZE_NOTES,
    data: response
  });
};

export const createNote = (note: INewNote): ActionThunk => async dispatch => {
  const response = await noteService.create(note);
  dispatch({
    type: CREATE_NOTE,
    data: noteTransform(response)
  });
};

export const updateNote = (note: INote): ActionThunk => async dispatch => {
  const noteToUpdate = {
    content: note.content,
    done: note.done,
    tags: note.tags,
    dateComplete: note.dateComplete
  };
  const response = await noteService.update(noteToUpdate, note.id);
  dispatch({
    type: UPDATE_NOTE,
    data: noteTransform(response)
  });
};

export const removeNote = (id: number): ActionThunk => async dispatch => {
  await noteService.remove(id);
  dispatch({
    type: REMOVE_NOTE,
    data: id
  });
};
export default notesReducer;
