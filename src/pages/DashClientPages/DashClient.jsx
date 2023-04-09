import { useEffect, useState } from "react";
import "./DashClient.css";
import { Sidebar } from "../../components/DashClientComponents/Sidebar";
import { Header } from "../../components/DashClientComponents/Header";
import { Content } from "../../components/DashClientComponents/Content";
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
