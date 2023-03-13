import React from 'react';
import './DashAdmin.css';
import { Sidebar } from '../../components/DashAdmin/Sidebar';
import { Header } from '../../components/DashAdmin/Header';
import { Content } from '../../components/DashAdmin/Content';

export function DashAdmin() {
  return (
    <div className="dashboard-container">
      <div className="sidebar-container">
        <Sidebar>
          <div className="content-container">
            <Header />
            <Content />
          </div>
        </Sidebar>
      </div>
    </div>
  );
}
