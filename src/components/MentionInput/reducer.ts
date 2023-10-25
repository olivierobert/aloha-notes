import { User } from '@/types/user';

enum MentionInputActionTypes {
  MENTION_INPUT_IS_MENTIONING = 'MENTION_INPUT_IS_MENTIONING',
  MENTION_INPUT_SHOW_MENTIONS = 'MENTION_INPUT_SHOW_MENTIONS',
  MENTION_INPUT_HIDE_MENTIONS = 'MENTION_INPUT_HIDE_MENTIONS',
}

type MentionInputState = {
  hint: string;
  isMentioning: boolean;
  matchedUsers: User[];
  showMentions: boolean;
};

type EditorAction =
  | { type: MentionInputActionTypes.MENTION_INPUT_IS_MENTIONING; }
  | { type: MentionInputActionTypes.MENTION_INPUT_SHOW_MENTIONS; payload: any }
  | { type: MentionInputActionTypes.MENTION_INPUT_HIDE_MENTIONS; };

const mentionInputInitialState: MentionInputState = {
  hint: '',
  isMentioning: false,
  matchedUsers: [],
  showMentions: false,
};

const mentionInputReducer = (state: MentionInputState, action: EditorAction): MentionInputState => {
  switch (action.type) {
    case 'MENTION_INPUT_IS_MENTIONING':
      return {
        ...state,
        isMentioning: true
      } ;
    case 'MENTION_INPUT_SHOW_MENTIONS':
      return {
        ...state,
        hint: action.payload.hint,
        matchedUsers: action.payload.matchedUsers,
        showMentions: true
      };
    case 'MENTION_INPUT_HIDE_MENTIONS':
      return {
        ...state,
        hint: '',
        isMentioning: false,
        matchedUsers: [],
        showMentions: false
      };
    default:
      return state;
  }
};

export { MentionInputActionTypes, mentionInputInitialState, mentionInputReducer };
