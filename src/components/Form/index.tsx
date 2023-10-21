import React, { useEffect, useState } from 'react';

export interface FormProps {
  noteId?: string;
  onCreateSuccess?: (noteId: string) => void;
}

const highlightMention = (body: string) => {
  const regex = /@(\w+\s\w+)/g;
  return body.replace(regex, '<em>$1</em>');
};

const Form = ({ noteId, onCreateSuccess } : FormProps) => {
  const [formData, setFormData] = useState({
    body: ''
  });

  const [users, setUsers] = useState([]);
  const [hint, setHint] = useState('');
  const [mentionUsers, setMentionUsers] = useState([]);
  const [isMentioning, setIsMentioning] = useState(false);
  const [showMentions, setShowMentions] = useState(false);

  const getNote = async () => {
    try {
      const response = await fetch(`https://challenge.surfe.com/aloha/notes/${noteId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const data = await response.json();

      setFormData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await fetch(`https://challenge.surfe.com/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const data = await response.json();
      console.log('all users', data);

      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    noteId && getNote();
    getUsers();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    console.log('textarea value', value);

    if (isMentioning) {
      const hint = value.split(' ').pop()?.replace('@', '').toLowerCase();
      console.log('the hint', hint);

      if (hint) {
        const isMatch = (user: any) => user.username.startsWith(hint) || user.first_name.startsWith(hint);
        const filteredUsers = users.filter((user) => isMatch(user)).slice(0, 4);
        console.log('filtered users', filteredUsers);

        setHint(hint);
        setMentionUsers(filteredUsers);
        setShowMentions(true);
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleOnKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    console.log('typing', event.key);

    if (event.key === '@') {
      setIsMentioning(true);
    }
  }

  const handleMentionClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { mention } = event.currentTarget.dataset;

    const body = formData.body.replace(`@${hint}`, `@${mention} `);

    setFormData({ ...formData, body });
    setShowMentions(false);
    setIsMentioning(false);
    setMentionUsers([]);
  }

  const handleDragStart = (event: React.DragEvent<HTMLButtonElement>) => {
    const mention = event.currentTarget.dataset.mention;

    if (mention) {
      event.dataTransfer.setData('text/plain', mention);
    }
  }

  const handleOnDrop = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const mention = event.dataTransfer.getData('text/plain');
    console.log('handleOnDrop', mention);

    const body = formData.body.replace(`@${hint}`, `@${mention} `);

    setFormData({ ...formData, body });
    setShowMentions(false);
    setIsMentioning(false);
    setMentionUsers([]);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      let response;

      if (!noteId) {
        response = await fetch('https://challenge.surfe.com/aloha/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      } else {
        response = await fetch(`https://challenge.surfe.com/aloha/notes/${noteId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      }

      const data = await response.json();
      console.log('handleSubmit', data);

      onCreateSuccess && onCreateSuccess(data.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={noteId} />
      <div>
        <label htmlFor="body">Body</label>:
        <textarea
          name="body"
          placeholder="What's on your mind?"
          value={formData.body}
          onChange={handleInputChange}
          onKeyUp={handleOnKeyUp}
          onDrop={handleOnDrop}
          ></textarea>

        <div dangerouslySetInnerHTML={{__html: highlightMention(formData.body)}} />

        {showMentions && (
          <div>
            <ul>
              {mentionUsers.length && mentionUsers.map((user) => (
                <li key={`aloha-user-${user.username}`}>
                  <button
                    type="button"
                    onClick={handleMentionClick}
                    data-mention={`${user.first_name} ${user.last_name}`}
                    draggable={true}
                    onDragStart={handleDragStart}
                  >
                    {`${user.first_name} ${user.last_name} - ${user.username}`}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default Form;
