import { CarritoPay } from "../../../components/CarritoComponents/CarritoPay";
import { Navbar1 } from "../../../components/HomePageComponents/NavBar";
export  function CompraCarrito() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <Navbar1/>
      <CarritoPay />
    </div>
  )
}
