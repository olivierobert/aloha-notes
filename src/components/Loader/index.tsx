import React from 'react';
import classNames from 'classnames';

interface LoaderProps {
  size?: string;
}

const Loader: React.FC = ({ size, text }: LoaderProps) => {
  return (
    <div className={classNames("loader", { "loader--small": size === 'xs' })}>
      <div className="loader__icon">🥥</div>
    </div>
  );
};

export default Loader;
