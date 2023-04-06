import { Sidebar } from "../../../components/DashAdminComponents/Sidebar";
import { Header } from "../../../components/DashAdminComponents/Header";
import "../../../components/DashAdminComponents/Sidebar.css";

export function ServiciosPage() {
  return (
    <div className="content-container">
      <Header/>
      <Sidebar />
      <h1>Página de servicios</h1>
    </div>
  )
}
