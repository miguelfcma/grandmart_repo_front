import { useState } from "react";
import { recoveryPassRequest } from "../../../API/RecoveryPassApiRest/recoveryPass.api";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function RecoverPassForm() {
  // Define un estado local para el campo de correo electrónico
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Maneja el envío del formulario para recuperación de contraseña
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Realiza una solicitud para recuperar la contraseña utilizando el correo electrónico
      const response = await recoveryPassRequest({ email });

      // Verifica el estado de la respuesta
      if (response.status === 200) {
        // Muestra una notificación de éxito si la contraseña se envía correctamente
        Swal.fire({
          icon: "success",
          title: "¡Contraseña enviada!",
          text: "Te hemos enviado tu contraseña por correo electrónico!",
        }).then(() => {
          // Redirige al usuario a la página de inicio de sesión
          navigate("/login");
        });
      } else if (response.status === 404) {
        // Muestra una notificación de error si el correo electrónico no se encuentra
        Swal.fire({
          icon: "error",
          title: "Correo electrónico no encontrado",
          text: "El correo electrónico introducido no corresponde a ningún usuario registrado.",
        });
      }
    } catch (error) {
      // Captura y maneja errores en la recuperación de contraseña
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error al recuperar la contraseña",
        text: "Hubo un error al recuperar la contraseña. Por favor, inténtalo de nuevo más tarde.",
      });
    }
  };

  // Devuelve el formulario de recuperación de contraseña

  return (
    <div>
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
      <div className="login-form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Restablecer contraseña</h2>
          <br></br>
          <br></br>
          <div className="form-group">
            <label htmlFor="email">
              Por favor, ingresa tu dirección de correo electrónico asociada a
              tu cuenta para solicitar la recuperación de contraseña. Te
              enviaremos un correo electrónico con una nueva contraseña.
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
            Enviar nueva contraseña
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
