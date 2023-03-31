import { CarritoPay } from "../../../components/CarritoComponents/CarritoPay";
import { Navbar } from "../../../components/HomePageComponents/NavBar";
export  function CompraCarrito() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <Navbar/>
      <CarritoPay />
    </div>
  )
}
