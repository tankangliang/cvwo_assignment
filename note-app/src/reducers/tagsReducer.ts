import {
  INITIALIZE_TAGS,
  FILTER_TAGS,
  TagActionTypes,
  INote,
  ITags
} from "./types";

const initialState: ITags = {
  all: [],
  filter: []
};

const tagsReducer = (state: ITags = initialState, action: TagActionTypes) => {
  switch (action.type) {
    case INITIALIZE_TAGS:
      return { ...state, all: action.data };
    case FILTER_TAGS: {
      const index = state.filter.indexOf(action.data);
      let newFilter = state.filter.slice();
      if (index !== -1) {
        newFilter.splice(index, 1);
      } else {
        newFilter.push(action.data);
      }
      return { ...state, filter: newFilter };
    }
    default:
      return state;
  }
};

export const setFilter = (tag: string): TagActionTypes => {
  return {
    type: FILTER_TAGS,
    data: tag
  };
};
export const initializeTags = (notes: INote[]): TagActionTypes => {
  const distinct = (value: string, index: number, self: string[]): boolean => {
    return self.indexOf(value) === index;
  };

  const tags = notes
    .reduce((total: string[], current: INote) => {
      return total.concat(current.tags);
    }, [])
    .filter(distinct);

  return {
    type: INITIALIZE_TAGS,
    data: tags
  };
};

export default tagsReducer;
