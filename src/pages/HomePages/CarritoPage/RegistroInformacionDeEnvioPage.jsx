import { Navbar1 } from "../../../components/HomePageComponents/NavBar";
import { FormRegistroEnvio } from "../../../components/OrdenesComponents/OrdenesGeneral/FormRegistroEnvio";
import "./RegistroInformacionDeEnvioPage.css"


export  function RegistroInformacionDeEnvioPage() {
  return (
    <div className="registroInformacionDeEnvioPage" style={{ paddingTop: "80px" }}>
      
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/">
            <img
              alt="e-commerce"
              src="https://firebasestorage.googleapis.com/v0/b/grandmart-51065.appspot.com/o/src%2Flogo.png?alt=media&token=6c393680-5c89-4708-a0d3-f8ffcb0fc379"
            />
          </Link>
        </div>
      </nav>
    <FormRegistroEnvio />
    </div>
  )
}
