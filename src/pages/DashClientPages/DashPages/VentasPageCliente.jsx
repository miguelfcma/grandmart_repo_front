import {SidebarCliente} from '../../../components/DashClientComponents/SidebarCliente';
import { HeaderCliente } from '../../../components/DashClientComponents/HeaderCliente';
import { ListaVentasCliente } from '../../../components/OrdenesComponents/VentasCliente/ListaVentasCliente';

export function VentasPageCliente() {
  return (
    <div className="content-container">
      <HeaderCliente/>
      <SidebarCliente />

      <ListaVentasCliente/>
    </div>
  )
}
