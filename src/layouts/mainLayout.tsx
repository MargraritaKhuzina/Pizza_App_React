import React from 'react';
import { Header } from '../components';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        {/* позволяет отображать разный контент на странице, не изменяя при этом Header */}
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
