import {Sidebar} from '../../../components/DashClientComponents/Sidebar';
import { Header } from '../../../components/DashClientComponents/Header';
import "../../../components/DashClientComponents/Sidebar.css";

export function PedidosClient() {
  return (
    <div className="content-container">
      <Header/>
      <Sidebar />
      <h1>Página de pedidos</h1>
    </div>
  )
}
