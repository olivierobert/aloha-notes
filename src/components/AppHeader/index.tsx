import React, { ReactNode } from 'react';

interface AppHeaderProps {
  title: string;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
}

const AppMain: React.FC<AppHeaderProps> = ({ title, leftSection, rightSection }) => {
  return (
    <header className="app-header">
      <div className="app-header__action">
        {leftSection}
      </div>
      <div className="app-header__title">
        {title}
      </div>
      <div className="app-header__action">
        {rightSection}
      </div>
    </header>
  );
};

export default AppMain;
