import {LOAD_STORIES, CLEAR_STORIES} from '../actions/index.js'
const stories=[
  {
    "by": "ktos1",
    "id": 1,
    "title": "tytul 1"
  },
  {
    "by": "ktos2",
    "id": 2,
    "title": "tytul 2"
  },
  {
    "by": "ktos3",
    "id": 3,
    "title": "tytul 3"
  },
]
const initialState={
  items:[]
};

export function storiesReducers(state=initialState, action) {
  switch (action.type) {
    case LOAD_STORIES:
      return {
        items: stories.slice()
      };
    case CLEAR_STORIES:
      return {
        items: []
      }
    default: return state;
  }
}
export default storiesReducers;
