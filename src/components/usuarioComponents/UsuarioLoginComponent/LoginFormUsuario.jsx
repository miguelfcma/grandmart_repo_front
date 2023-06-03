import { useState } from "react";
import "./LoginFormUsuario.css";
import { Link, useNavigate } from "react-router-dom";
import { useUsuarios } from "../UsuariosContext/UsuarioProvider";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
export function LoginFormUsuario() {
  const navigate = useNavigate();
  const { loginUsuario } = useUsuarios();
  const [usuarioLogin, setUsuarioLogin] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(usuarioLogin);
    try {
      const response = await loginUsuario(usuarioLogin);

      if (response.status == 400) {
        Swal.fire({
          icon: "error",
          title: "Acceso denegado",
          text: "Usuario o contraseña incorrectos",
        });
        console.log("Acceso denegado");
      } else if (response.status == 200) {
        if (response.data.usuario.tipoUsuario === 1) {
          navigate("/dashAdmin");
        } else if (response.data.usuario.tipoUsuario === 2) {
          navigate("/dashRepartidor");
        } else if (response.data.usuario.tipoUsuario === 0) {
          navigate("/dashClient");
        } else {
          navigate("/");
        }

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("usuario", JSON.stringify(response.data.usuario));

        Swal.fire({
          icon: "success",
          title: "Inicio de sesión exitoso",
          text: "¡Bienvenido!",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.",
      });
    }
  };

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
          <h2>Iniciar sesión</h2>
          <br></br>
          <br></br>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico: </label>
            <input
              type="email"
              id="email"
              value={usuarioLogin.email}
              onChange={(event) =>
                setUsuarioLogin({
                  ...usuarioLogin,
                  email: event.target.value,
                })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña: </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={usuarioLogin.password}
              onChange={(event) =>
                setUsuarioLogin({
                  ...usuarioLogin,
                  password: event.target.value,
                })
              }
              required
            />
            {showPassword ? (
              <FaEye
                className="password-icon"
                title="Ocultar contraseña"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <FaEyeSlash
                className="password-icon"
                title="Mostrar contraseña"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>

          <button type="submit" className="btn-login">
            Iniciar sesión
          </button>

          <br></br>

          <p className="login-links">
            <span>
              <Link to="/login/recuperar-contrasena">
                ¿Olvidaste tu contraseña?
              </Link>
            </span>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>
              <Link to="/signup">Crear cuenta</Link>
            </span>
          </p>

          <br></br>

          <Link to="/" style={{ textDecoration: "none" }}>
            <button className="back-button" type="button">
              <span>Atrás</span>
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
