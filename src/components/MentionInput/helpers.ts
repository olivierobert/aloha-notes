
import { User } from '@/types/user';

import { MENTION_KEY_TRIGGER, MENTION_REGEX, MENTION_USER_LIMIT } from './constants';

export const getMentionHint = (content: string, caretPosition: number) => {2
  const contentSubset = content.toLowerCase().slice(0, caretPosition);
  const matches = contentSubset.match(MENTION_REGEX);

  return matches?.pop()?.replace(MENTION_KEY_TRIGGER, '');
}

export const getMatchedUsers = (hint: string, users: User[] = []) => {
  const isMatch = (user: User) => user.username.startsWith(hint) || user.first_name.startsWith(hint);

  return users.filter((user) => isMatch(user)).slice(0, MENTION_USER_LIMIT);
}
