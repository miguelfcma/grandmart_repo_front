import React, { useEffect, useState } from "react";

import { SidebarAdmin } from "../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../components/DashAdminComponents/HeaderAdmin";
import { ContentAdmin } from "../../components/DashAdminComponents/ContentAdmin";
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
      }, 1);
    }
  }, [navigate]);

  return (
    <>
      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        <div className="dashboard-container">
          <SidebarAdmin />
          <div className="dashboard-content">
            <HeaderAdmin />
            <ContentAdmin />
          </div>
        </div>
      )}
    </>
  );
}
