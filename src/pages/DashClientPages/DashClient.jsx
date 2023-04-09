import { useEffect, useState } from "react";
import "./DashClient.css";
import { SidebarCliente } from "../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../components/DashClientComponents/HeaderCliente";
import { ContentCliente } from "../../components/DashClientComponents/ContentCliente";
import { useNavigate } from "react-router-dom";

export function DashClient() {
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
          <SidebarCliente />
          <div className="dashboard-content">
            <HeaderCliente />
            <ContentCliente />
          </div>
        </div>
      )}
    </>
  );
}
