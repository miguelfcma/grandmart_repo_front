import { Navbar1 } from "../../../components/HomePageComponents/NavBar";
import { FormRegistroEnvio } from "../../../components/OrdenesComponents/OrdenesGeneral/FormRegistroEnvio";
import "./RegistroInformacionDeEnvioPage.css"


export  function RegistroInformacionDeEnvioPage() {
  return (
    <div className="registroInformacionDeEnvioPage" style={{ paddingTop: "80px" }}>
      
    <Navbar1/>
    <FormRegistroEnvio />
    </div>
  )
}
