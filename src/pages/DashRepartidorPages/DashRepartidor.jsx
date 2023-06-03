import React, { useEffect, useState } from "react";
import { SidebarRepartidor } from "../../components/DashRepartidorComponents/SidebarRepartidor";
import { HeaderRepartidor } from "../../components/DashRepartidorComponents/HeaderRepartidor";
import { ContentRepartidor } from "../../components/DashRepartidorComponents/ContentRepartidor";

import "./DashRepartidor.css";

export function DashRepartidor() {
  return (
    <>
      <div className="dashboard-container">
        <SidebarRepartidor />
        <div className="contenidoPages">
          <HeaderRepartidor />
        </div>
        <div className="textoDash">
          <ContentRepartidor />
        </div>
      </div>
    </>
  );
}
