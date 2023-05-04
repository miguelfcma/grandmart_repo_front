import { useState } from "react";
import { recoveryPassRequest } from "../../../API/RecoveryPassApiRest/recoveryPass.api";
import { Link, useNavigate } from "react-router-dom";

export function RecoverPassForm() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email);
    try {
      const response = await recoveryPassRequest({email});
      if (response.status == 200) {
        alert("Te hemos enviado tu contraseña por correo electrónico!");
        navigate("/login");
      } 
      if(response.status == 404) {
        alert(
          "El correo electrónico introducido no corresponde a ningún usuario registrado."
        );
      }
    } catch (error) {
      console.log(error);
      alert(
        "Hubo un error al recuperar la contraseña. Por favor, inténtalo de nuevo más tarde."
      );
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <a href="/">
            <img
              alt="e-commerce"
              src="https://firebasestorage.googleapis.com/v0/b/grandmart-51065.appspot.com/o/src%2Flogo.png?alt=media&token=6c393680-5c89-4708-a0d3-f8ffcb0fc379"
            />
          </a>
        </div>
      </nav>
      <div className="login-form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Recuperar contraseña</h2>
          <br></br>
          <br></br>
          <div className="form-group">
            <label htmlFor="email">
              Favor de introducir tu correo electrónico de tu perfil que deseas
              recuperar y nosotros te enviaremos tu contraseña.
            </label>
            <br></br>
            <br></br>
            <label htmlFor="email">Correo electrónico: </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <br></br>

          <button type="submit" className="btn-login">
            Enviar
          </button>

          <br></br>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button className="back-button" type="button">
              <span>Atrás</span>
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
