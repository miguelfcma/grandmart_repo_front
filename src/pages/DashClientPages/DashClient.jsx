import React, { useEffect } from 'react';
import './DashClient.css';
import {Sidebar} from '../../components/DashClient/Sidebar';
import {Header} from '../../components/DashClient/Header';
import {Content} from '../../components/DashClient/Content';
import { useNavigate } from "react-router-dom";

export function DashClient() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [history]);

  return (
    
    <div>
      <Header />
      <div className="sidebar-container">
        <Sidebar />
      </div>
    </div>
  );
}