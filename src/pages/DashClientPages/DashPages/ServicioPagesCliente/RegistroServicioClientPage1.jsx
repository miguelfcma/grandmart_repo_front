import React from "react";
import { SidebarCliente } from "../../../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../../../components/DashClientComponents/HeaderCliente";
import FormCompletoServicioCliente from "../../../../components/ServicioComponents/ServiciosCliente/FormCompletoServicioCliente";
export function RegistroServicioClientPage1() {
  return (
<div style={{ marginLeft: "200px", marginRight: "1rem" }}>
          <HeaderCliente />
      <SidebarCliente />
      <FormCompletoServicioCliente />
    </div>
  );
}
