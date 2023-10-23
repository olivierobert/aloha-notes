import React, { ReactNode } from 'react';

interface AppMainProps {
  children: ReactNode;
}

const AppMain: React.FC<AppMainProps> = ({ children }) => {
  return (
    <main className="app-content">
      {children}
    </main>
  );
};

export default AppMain;
