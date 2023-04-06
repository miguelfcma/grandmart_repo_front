import { Sidebar } from "../../../components/DashClientComponents/Sidebar";
import { Header } from "../../../components/DashClientComponents/Header";
import "../../../components/DashClientComponents/Sidebar.css";

export function ServiciosClient() {
  return (
    <div className="content-container">
      <Header/>
      <Sidebar/>
      <h1>Página de servicios</h1>
    </div>
  )
}

export default ServiciosClient;
