import { SidebarAdmin } from "../../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../../components/DashAdminComponents/HeaderAdmin";
import "../../DashAdmin.css";
import { DatosPerfil } from "../../../../components/usuarioComponents/UsuarioPerfilComponentsAdmin/DatosPerfilAdmin/DatosPerfil";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export function DatosPerfilPageAdmin() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <HeaderAdmin />
        <Breadcrumb style={{ backgroundColor: "#1256a3", fontWeight: "bold" }}>
          <Breadcrumb.Item
            onClick={() => navigate("/dashAdmin/perfil")}
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
