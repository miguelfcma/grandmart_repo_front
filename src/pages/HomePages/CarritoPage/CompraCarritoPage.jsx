import { CarritoPay } from "../../../components/CarritoComponents/CarritoPay";
import { Navbar1 } from "../../../components/HomePageComponents/NavBar";

export  function CompraCarritoPage() {
  return (
    <div style={{ paddingTop: "80px" }}>
      
      <Navbar1/>
      {/** <CarritoPay />*/}
      <CarritoPay/>
    </div>
  )
}
