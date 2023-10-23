import React from 'react';

interface Props {
  message: string;
}

const BlankSlate: React.FC<Props> = ({ message }) => {
  return (
    <div className="blank-slate">
      <p className="blank-slate__text">{message}</p>
    </div>
  );
};

export default BlankSlate;
