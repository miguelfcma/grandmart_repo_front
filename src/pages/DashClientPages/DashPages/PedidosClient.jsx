import {SidebarCliente} from '../../../components/DashClientComponents/SidebarCliente';
import { HeaderCliente } from '../../../components/DashClientComponents/HeaderCliente';

export function PedidosClient() {
  return (
    <div className="content-container">
      <HeaderCliente/>
      <SidebarCliente />
      <h1>Página de pedidos</h1>
    </div>
  )
}
