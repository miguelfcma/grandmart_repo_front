import { Route, Navigate, Outlet } from "react-router-dom";
import { VerificarToken } from "../components/VerificadorToken/VerificarToken";

function RutasProtegidasRepartidor() {
  // Verificar si existe el token en el localStorage
  const token = localStorage.getItem("token");
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  // Si no existe el token, redirigir al componente de inicio de sesión
  if (!token) {
    return <Navigate to="/login" />;
  }
  // Si el usuario no tiene el tipo de usuario requerido
  if (usuario.tipoUsuario !== 2) {
    return <Navigate to="/" />;
  }
  // Si el token existe, renderizar las rutas protegidas
  return (
    <>
      <Outlet />
      <VerificarToken />
    </>
  );
}

export default RutasProtegidasRepartidor;
