import { useEffect, useState } from "react";
import "./DashClient.css";
import { SidebarCliente } from "../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../components/DashClientComponents/HeaderCliente";
import { ContentCliente } from "../../components/DashClientComponents/ContentCliente";

import "./DashClient.css";

export function DashClient() {
  return (
    <>
      <div className="dashboard-container">
        <SidebarCliente />
        <div className="contenidoPages">
          <HeaderCliente />
        </div>
        <div className="textoDash">
          <ContentCliente />
        </div>
      </div>
    </>
  );
}
