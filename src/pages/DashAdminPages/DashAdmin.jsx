import React, { useEffect, useState } from "react";
import { SidebarAdmin } from "../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../components/DashAdminComponents/HeaderAdmin";
import { ContentAdmin } from "../../components/DashAdminComponents/ContentAdmin";

import "./DashAdmin.css";

export function DashAdmin() {
  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <HeaderAdmin />
      </div>
      <div className="textoDash">
        <ContentAdmin />
       
      </div>
    </div>
  );
}
