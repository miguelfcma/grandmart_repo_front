import { SidebarCliente } from "../../../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../../../components/DashClientComponents/HeaderCliente";
import "../../DashClient.css";

import { FormularioCambiarContrasena } from "../../../../components/usuarioComponents/UsuarioPerfilComponentsCliente/SeguridadPerfilCliente/FormularioCambiarContrasena";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export function SeguridadPerfilPageCliente() {
  const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      <SidebarCliente />
      <div className="contenidoPages">
        <HeaderCliente />
        <Breadcrumb style={{ backgroundColor: "#1256a3", fontWeight: "bold" }}>
          <Breadcrumb.Item
            onClick={() => navigate("/dashClient/perfil")}
            style={{ color: "white" }}
          >
            Perfil
          </Breadcrumb.Item>
          <Breadcrumb.Item active style={{ color: "white" }}>
            Seguridad
          </Breadcrumb.Item>
        </Breadcrumb>
        <FormularioCambiarContrasena />
      </div>
    </div>
  );
}
