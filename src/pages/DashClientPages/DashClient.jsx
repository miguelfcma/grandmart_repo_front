// Importación de los módulos necesarios desde rutas específicas
import { useEffect, useState } from "react";
import "./DashClient.css"; // Importación del archivo CSS para los estilos
import { SidebarCliente } from "../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../components/DashClientComponents/HeaderCliente";
import { ContentCliente } from "../../components/DashClientComponents/ContentCliente";

// Definición del componente DashClient
export function DashClient() {
  return (
    <>
      <div className="dashboard-container">
        {/* Renderiza el componente SidebarCliente que contiene la barra lateral del panel de cliente */}
        <SidebarCliente />

        <div className="contenidoPages">
          {/* Renderiza el componente HeaderCliente que contiene el encabezado del panel de cliente */}
          <HeaderCliente />
        </div>

        <div className="textoDash">
          {/* Renderiza el componente ContentCliente que muestra el contenido y las funcionalidades del panel de cliente */}
          <ContentCliente />
        </div>
      </div>
    </>
  );
}
