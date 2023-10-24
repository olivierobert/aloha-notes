import { Note } from '@/types/note';

enum EditorActionTypes {
  EDITOR_IS_FETCHING = 'EDITOR_IS_FETCHING',
  EDITOR_SET_NOTE = 'EDITOR_SET_NOTE',
  EDITOR_SAVE_SUCCESS = 'EDITOR_SAVE_SUCCESS',
  EDITOR_SET_ERROR = 'EDITOR_SET_ERROR',
}

type EditorState = {
  note: Note | undefined;
  error: string;
  isFetching: boolean;
  fetchSuccess: boolean;
  saveSuccess: boolean;
};

type EditorAction =
  | { type: EditorActionTypes.EDITOR_IS_FETCHING; payload: any }
  | { type: EditorActionTypes.EDITOR_SET_NOTE; payload: any }
  | { type: EditorActionTypes.EDITOR_SAVE_SUCCESS; payload: any }
  | { type: EditorActionTypes.EDITOR_SET_ERROR; payload: any };

const editorInitialState: EditorState = {
  note: undefined,
  error: '',
  isFetching: false,
  fetchSuccess: false,
  saveSuccess: false,
};

const editorReducer = (state: EditorState, action: EditorAction): EditorState => {
  switch (action.type) {
    case 'EDITOR_IS_FETCHING':
      return {
        ...state,
        isFetching: true,
        fetchSuccess: false
      } ;
    case 'EDITOR_SET_NOTE':
      return {
        ...state,
        note: action.payload,
        isFetching: false,
        fetchSuccess: true
      };
    case 'EDITOR_SAVE_SUCCESS':
      return {
        ...state,
        saveSuccess: true
      };
    case 'EDITOR_SET_ERROR':
      return { ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export { EditorActionTypes, editorInitialState, editorReducer };
