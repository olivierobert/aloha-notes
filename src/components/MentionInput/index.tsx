import React, { useEffect, useReducer, useRef, useState } from 'react';

import { User } from '@/types/user';

import { MENTION_KEY_TRIGGER } from './constants';
import { getMentionHint, getMatchedUsers, generateTextAfterInsert } from './helpers';
import {
  MentionInputActionTypes, mentionInputInitialState, mentionInputReducer 
} from './reducer';

interface TextInputProps {
  name: string;
  value: string;
  mentionUsers?: User[];

  onChange: (value: string) => void;
}

interface MentionState {
  hint: string;
  isMentioning: boolean;
  showMentions: boolean;
  matchedUsers: User[];
}

const MentionInput: React.FC<TextInputProps> = ({ name, value, mentionUsers, onChange }) => {
  const textInputRef = useRef(null);

  const [inputData, setInputData] = useState({ [name]: value });
  const [{
    hint, isMentioning, matchedUsers, showMentions
  }, dispatch] = useReducer(mentionInputReducer, mentionInputInitialState);
  const [suggestionCoordinates, setDropdownCoordinates] = useState({ top: 0, left: 0 });

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    const textInput = textInputRef.current as unknown as HTMLTextAreaElement;
    const caretPosition = textInput?.selectionEnd;
    const hint = getMentionHint(value, caretPosition);

    if (isMentioning && hint) {
      const matchedUsers = getMatchedUsers(hint, mentionUsers);

      dispatch({
        type: MentionInputActionTypes.MENTION_INPUT_SHOW_MENTIONS,
        payload: { hint, matchedUsers }
      });
    }

    setInputData({ [name]: value });
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { mention } = event.currentTarget.dataset;
    const textInput = textInputRef.current as unknown as HTMLTextAreaElement;

    const value = textInput?.value.replace(
      `${MENTION_KEY_TRIGGER}${hint}`,
      `${MENTION_KEY_TRIGGER}${mention}`
    );

    dispatch({ type: MentionInputActionTypes.MENTION_INPUT_HIDE_MENTIONS });
    setInputData({ [textInput.name]: value });
  }

  const handleDrop: React.DragEventHandler<HTMLTextAreaElement> = (event) => {
    event.preventDefault();

    const mention = event.dataTransfer.getData('text/plain');
    const textToInsert = `${MENTION_KEY_TRIGGER}${mention} `;
    const textInput = textInputRef.current as unknown as HTMLTextAreaElement;

    const updatedText = generateTextAfterInsert(textInput, textToInsert);

    dispatch({ type: MentionInputActionTypes.MENTION_INPUT_HIDE_MENTIONS });
    setInputData({ [textInput.name]: updatedText });
  }

  const handleKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === MENTION_KEY_TRIGGER) {
      dispatch({ type: MentionInputActionTypes.MENTION_INPUT_IS_MENTIONING });
    }
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => {
    const { clientX, clientY } = event;

    const textInput = textInputRef.current as unknown as HTMLTextAreaElement;
    const textInputRect = textInput.getBoundingClientRect();

    const topPosition = clientY - textInputRect.top + 20;
    const leftPosition = clientX - textInputRect.left;

    if (isMentioning && hint) {
      return;
    }

    setDropdownCoordinates({ top: topPosition, left: leftPosition });
  }

  useEffect(() => {
    onChange(inputData[name]);
  }, [inputData, name, onChange]);

  return (
    <div className="mention-input">
      <div className="mention-input__form">
        <label htmlFor="body" className="sr-only">Content</label>
        <textarea
          name="body"
          className="mention-input__input"
          placeholder="What's on your mind?"
          value={inputData[name]}
          ref={textInputRef}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          onDrop={handleDrop}
          onMouseMove={handleMouseMove}
          ></textarea>
      </div>

      {showMentions && (
        <ul className="mention-input__suggestion" style={{top: `${suggestionCoordinates.top}px`, left: `${suggestionCoordinates.left}px`}}>
          {matchedUsers.length > 0 && matchedUsers.map((user) => (
            <li key={`user-${user.username}`} className="mention-input__suggestion-item">
              <button
                type="button"
                className="mention-input__suggestion-user"
                data-mention={`${user.first_name} ${user.last_name}`}
                onClick={handleClick}>
                {`${user.first_name} ${user.last_name}`}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MentionInput;
