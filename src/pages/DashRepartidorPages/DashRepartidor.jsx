// Importación de los módulos necesarios desde rutas específicas
import React, { useEffect, useState } from "react";
import { SidebarRepartidor } from "../../components/DashRepartidorComponents/SidebarRepartidor";
import { HeaderRepartidor } from "../../components/DashRepartidorComponents/HeaderRepartidor";
import { ContentRepartidor } from "../../components/DashRepartidorComponents/ContentRepartidor";

// Importación del archivo CSS para los estilos
import "./DashRepartidor.css";

// Definición del componente DashRepartidor
export function DashRepartidor() {
  return (
    <>
      <div className="dashboard-container">
        {/* Renderiza el componente SidebarRepartidor que contiene la barra lateral del panel de repartidor */}
        <SidebarRepartidor />

        <div className="contenidoPages">
          {/* Renderiza el componente HeaderRepartidor que contiene el encabezado del panel de repartidor */}
          <HeaderRepartidor />
        </div>

        <div className="textoDash">
          {/* Renderiza el componente ContentRepartidor que muestra el contenido y las funcionalidades del panel de repartidor */}
          <ContentRepartidor />
        </div>
      </div>
    </>
  );
}
