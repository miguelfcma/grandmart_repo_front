import { DashClient } from "../DashClient";

import "../../../components/DashClientComponents/Sidebar.css";

export function ServiciosClient() {
  return (
    <div className="content-container">
        <DashClient />
      <h1>Página de servicios</h1>
    </div>
  )
}

export default ServiciosClient;
