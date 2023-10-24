import React, { useRef, useState } from 'react';

interface TextInputProps {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({ name, value, onChange }) => {
  const textInputRef = useRef(null);

  const [inputData, setInputData] = useState({ [name]: value });

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setInputData({ [name]: value });
    onChange(event);
  };

  return (
    <div className="note-editor-text-input">
      <div className="note-editor-text-input__form">
        <label htmlFor="body">Body</label>:
        <textarea
          name="body"
          placeholder="What's on your mind?"
          defaultValue={inputData[name]}
          ref={textInputRef}
          onChange={handleInputChange}
          ></textarea>
      </div>

      <div
        className="note-editor-text-input__display"
        dangerouslySetInnerHTML={{__html: inputData[name] }} />
    </div>
  );
};

export default TextInput;
