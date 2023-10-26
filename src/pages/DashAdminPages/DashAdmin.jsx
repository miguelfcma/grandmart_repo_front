// Importación de los módulos necesarios desde rutas específicas
import React, { useEffect, useState } from "react";
import { SidebarAdmin } from "../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../components/DashAdminComponents/HeaderAdmin";
import { ContentAdmin } from "../../components/DashAdminComponents/ContentAdmin";

// Importación del archivo CSS para los estilos
import "./DashAdmin.css";

// Definición del componente DashAdmin
export function DashAdmin() {
  return (
    <div className="dashboard-container">
      {/* Renderiza el componente SidebarAdmin que contiene la barra lateral del panel de administración */}
      <SidebarAdmin />

      <div className="contenidoPages">
        {/* Renderiza el componente HeaderAdmin que contiene el encabezado del panel de administración */}
        <HeaderAdmin />
      </div>

      <div className="textoDash">
        {/* Renderiza el componente ContentAdmin que muestra el contenido y las funcionalidades del panel de administración */}
        <ContentAdmin />
      </div>
    </div>
  );
}
