import React, { useEffect, useState } from "react";
import { SidebarRepartidor } from "../../components/DashRepartidorComponents/SidebarRepartidor";
import { HeaderRepartidor } from "../../components/DashRepartidorComponents/HeaderRepartidor";
import { ContentRepartidor } from "../../components/DashRepartidorComponents/ContentRepartidor";
import { useNavigate } from "react-router-dom";
import "./DashRepartidor.css";

export function DashRepartidor() {
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
      }, 1);
    }
  }, [navigate]);

  return (
    <>
      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        <div className="dashboard-container">
          <SidebarRepartidor />
          <div className="textoDash">
            <HeaderRepartidor />
            <ContentRepartidor />

          </div>
        </div>
      )}
    </>
  );
}
