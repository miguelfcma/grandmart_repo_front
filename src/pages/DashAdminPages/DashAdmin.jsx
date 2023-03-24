import React, { useEffect, useState } from "react";
import "./DashAdmin.css";
import { Sidebar } from "../../components/DashAdminComponents/Sidebar";
import { Header } from "../../components/DashAdminComponents/Header";
import { Content } from "../../components/DashAdminComponents/Content";
import { useNavigate } from "react-router-dom";


export function DashAdmin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      // Simular la validación del token con un timeout de 1 segundo
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [navigate]);

  return (
    <>
      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        <div className="dashboard-container">
          <Sidebar />
          <div className="dashboard-content">
            <Header />
            <Content />
          </div>
        </div>
      )}
    </>
  );
}
