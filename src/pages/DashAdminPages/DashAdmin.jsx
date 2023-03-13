import React, { useEffect } from 'react';
import './DashAdmin.css';
import {Sidebar} from '../../components/DashAdmin/Sidebar';
import {Header} from '../../components/DashAdmin/Header';
import {Content} from '../../components/DashAdmin/Content';
import { useNavigate } from "react-router-dom";

export function DashAdmin() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [history]);

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