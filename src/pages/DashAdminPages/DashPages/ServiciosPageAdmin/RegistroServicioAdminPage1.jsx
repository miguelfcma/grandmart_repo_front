import React from "react";
import { SidebarAdmin } from "../../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../../components/DashAdminComponents/HeaderAdmin";
import FormCompletoServicioAdmin from "../../../../components/ServicioComponents/ServiciosAdmin/FormCompletoServicioAdmin";
export default function RegistroServicioAdminPage1() {
  return (
    <div style={{ marginLeft: "200px", marginRight: "1rem" }}>
      <HeaderAdmin />
      <SidebarAdmin />
      <FormCompletoServicioAdmin />
    </div>
  );
}
