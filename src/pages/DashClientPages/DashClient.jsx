import React, { useEffect } from 'react';
import './DashClient.css';
import { Sidebar } from '../../components/DashClientComponents/Sidebar';
import { Header } from '../../components/DashClientComponents/Header';
import { Content } from '../../components/DashClientComponents/Content';
import { useNavigate } from "react-router-dom";

export function DashClient() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]); //estaba un history

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Header />
        <Content />
      </div>
    </div>
  );
}