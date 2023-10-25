import React from 'react';

import { User } from '@/types/user';

interface ListUserProps {
  users: User[];
}

const ListUser: React.FC<ListUserProps> = ({ users }) => {
  const handleDragStart = (event: React.DragEvent<HTMLButtonElement>) => {
    const mention = event.currentTarget.dataset.mention;

    if (mention) {
      event.dataTransfer.setData('text/plain', mention);
    }
  }

  return (
    <ul className="list-user">
      {users.length > 0 && users.map((user) => (
        <li key={`user-${user.username}`} className="list-user__item">
          <button
            type="button"
            className="list-user__user"
            data-mention={`${user.first_name} ${user.last_name}`}
            draggable={true}
            onDragStart={handleDragStart}>
            {`${user.first_name} ${user.last_name}`}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ListUser;
