import { SidebarCliente } from "../../../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../../../components/DashClientComponents/HeaderCliente";
import "../../DashClient.css";

import { CardTarjeta } from "../../../../components/usuarioComponents/UsuarioPerfilComponentsCliente/TarjetaPerfilCliente/CardTarjeta";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export function TarjetaPerfilPageCliente() {
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
            Tarjeta
          </Breadcrumb.Item>
        </Breadcrumb>
        <CardTarjeta />
      </div>
    </div>
  );
}
