import React from "react";
import { SidebarAdmin } from "../../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../../components/DashAdminComponents/HeaderAdmin";
import FormCompletoServicioAdmin from "../../../../components/ServicioComponents/ServiciosAdmin/FormCompletoServicioAdmin";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export default function RegistroServicioAdminPage1() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <HeaderAdmin />
        <Breadcrumb
          style={{
            backgroundColor: "#1256a3",
            fontWeight: "bold",
          }}
        >
          <Breadcrumb.Item onClick={() => navigate("/dashAdmin/servicios")}>
            Servicios
          </Breadcrumb.Item>
          <Breadcrumb.Item active style={{ color: "white" }}>Registro de Servicio</Breadcrumb.Item>
        </Breadcrumb>
        <FormCompletoServicioAdmin />
      </div>{" "}
    </div>
  );
}
