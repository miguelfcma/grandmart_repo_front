import React from "react";
import { SidebarCliente } from "../../../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../../../components/DashClientComponents/HeaderCliente";
import FormCompletoServicioCliente from "../../../../components/ServicioComponents/ServiciosCliente/FormCompletoServicioCliente";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export function RegistroServicioClientPage1() {
  const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      <SidebarCliente />
      <div className="contenidoPages">
        <HeaderCliente />
        <Breadcrumb
          style={{
            backgroundColor: "#1256a3",
            fontWeight: "bold",
          }}
        >
          <Breadcrumb.Item onClick={() => navigate("/dashClient/servicios")}>
            Servicios
          </Breadcrumb.Item>
          <Breadcrumb.Item active style={{ color: "white" }}>
            Registro de Servicio
          </Breadcrumb.Item>
        </Breadcrumb>
        <FormCompletoServicioCliente />
      </div>
    </div>
  );
}
