import { DashClient } from "../DashClient";

import "../../../components/DashClientComponents/Sidebar.css";

export function ProductosClient() {
  return (
    <div className="content-container">
        <DashClient/>
        <h1>Página de productos</h1>
    </div>
  )
}
