import { SidebarRepartidor } from "../../../../components/DashRepartidorComponents/SidebarRepartidor";
import { HeaderRepartidor } from "../../../../components/DashRepartidorComponents/HeaderRepartidor";

import { DatosPerfil } from "../../../../components/usuarioComponents/UsuarioPerfilComponentsRepartidor/DatosPerfilRepartidor/DatosPerfil";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export function DatosPerfilPageRepartidor() {
  const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      <SidebarRepartidor />
      <div className="contenidoPages">
        <HeaderRepartidor />
        <Breadcrumb style={{ backgroundColor: "#1256a3", fontWeight: "bold" }}>
          <Breadcrumb.Item
            onClick={() => navigate("/dashRepartidor/perfil")}
            style={{ color: "white" }}
          >
            Perfil
          </Breadcrumb.Item>
          <Breadcrumb.Item active style={{ color: "white" }}>
            Datos
          </Breadcrumb.Item>
        </Breadcrumb>
        <DatosPerfil />
      </div>
    </div>
  );
}
