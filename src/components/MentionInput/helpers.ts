
import { User } from '@/types/user';

import { MENTION_KEY_TRIGGER, MENTION_REGEX, MENTION_USER_LIMIT } from './constants';

export const getMentionHint = (content: string, caretPosition: number) => {
  const contentSubset = content.toLowerCase().slice(0, caretPosition);
  const matches = contentSubset.match(MENTION_REGEX);

  return matches?.pop()?.replace(MENTION_KEY_TRIGGER, '');
}

export const getMatchedUsers = (hint: string, users: User[] = []) => {
  const isMatch = (user: User) => user.username.startsWith(hint) || user.first_name.startsWith(hint);

  return users.filter((user) => isMatch(user)).slice(0, MENTION_USER_LIMIT);
}

export const generateTextAfterInsert = (element: HTMLTextAreaElement, text: string) => {
  const caretPosition = element.selectionStart ?? text.length;
  // Adjust the caret position to avoid inserting the text at the beginning of the input
  const adjustedCaretPosition = caretPosition === 0 ? (element.value.length + 1) : caretPosition;

  // Get the text before and after the caret position
  const before = element.value.substring(0, adjustedCaretPosition);
  const after = element.value.substring(adjustedCaretPosition, element.value.length);

  // Insert the new text at the caret position
  return [before, text, after].join('');
};
