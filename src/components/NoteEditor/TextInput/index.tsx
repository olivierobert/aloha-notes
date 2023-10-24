import React, { useRef, useState } from 'react';

import { User } from '@/types/user';

interface TextInputProps {
  name: string;
  value: string;
  mentionUsers?: User[];

  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

interface MentionState {
  hint: string;
  isMentioning: boolean;
  showMentions: boolean;
  matchedUsers: User[];
}

const MENTION_KEY_TRIGGER = '@';
const MENTION_USER_LIMIT = 5;

const getMentionHint = (content: string, caretPosition: number) => {
  const regex = /@(\w+)/g;

  const contentSubset = content.toLowerCase().slice(0, caretPosition);
  const matches = contentSubset.match(regex);

  return matches?.pop()?.replace(MENTION_KEY_TRIGGER, '');
}

const getMatchedUsers = (hint: string, users: User[] = []) => {
  const isMatch = (user: User) => user.username.startsWith(hint) || user.first_name.startsWith(hint);

  return users.filter((user) => isMatch(user)).slice(0, MENTION_USER_LIMIT);
}

const TextInput: React.FC<TextInputProps> = ({ name, value, mentionUsers, onChange }) => {
  const textInputRef = useRef(null);

  const [inputData, setInputData] = useState({ [name]: value });
  const [mentionState, setMentionState] = useState<MentionState>({
    hint: '',
    isMentioning: false,
    showMentions: false,
    matchedUsers: [],
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    const textInput = textInputRef.current as unknown as HTMLTextAreaElement;
    const caretPosition = textInput?.selectionEnd;
    const hint = getMentionHint(value, caretPosition);

    if (mentionState.isMentioning && hint) {
      const matchedUsers = getMatchedUsers(hint, mentionUsers);

      setMentionState({ ...mentionState, hint, matchedUsers, showMentions: true });
    }

    setInputData({ [name]: value });
    onChange(event);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === MENTION_KEY_TRIGGER) {
      setMentionState({ ...mentionState, isMentioning: true });
    }
  }

  return (
    <div className="note-editor-text-input">
      <div className="note-editor-text-input__form">
        <label htmlFor="body">Body</label>:
        <textarea
          name="body"
          placeholder="What's on your mind?"
          defaultValue={inputData[name]}
          ref={textInputRef}
          onKeyUp={handleKeyUp}
          onChange={handleInputChange}
          ></textarea>
      </div>

      <div
        className="note-editor-text-input__display"
        dangerouslySetInnerHTML={{__html: inputData[name] }} />

      {mentionState.showMentions && (
        <div className="note-editor-text-input__mention">
          <ul>
            {mentionState.matchedUsers.length && mentionState.matchedUsers.map((user) => (
              <li key={`user-${user.username}`}>
                <button
                  type="button"
                  data-mention={`${user.first_name} ${user.last_name}`}>
                  {`${user.first_name} ${user.last_name} - ${user.username}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TextInput;
