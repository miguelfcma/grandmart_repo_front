import { StripeFormTarjetaComponent } from "../../StripeComponents/StripeFormTarjetaComponent"
import { DetalleDeProductos } from "./DetalleDeProductos"
import { DetalleDeEnvio } from "./DetalleDeEnvio"
export  function PaginaDeCompra() {
  return (
    <div>
      <DetalleDeProductos/>
      <DetalleDeEnvio/>
      <StripeFormTarjetaComponent/>
    </div>
  )
}
