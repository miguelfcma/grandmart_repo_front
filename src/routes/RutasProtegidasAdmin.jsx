import { Route, Navigate, Outlet } from "react-router-dom";

function RutasProtegidasAdmin() {
  // Verificar si existe el token en el localStorage
  const token = localStorage.getItem("token");
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  // Si no existe el token, redirigir al componente de inicio de sesión
  if (!token) {
    return <Navigate to="/login" />;
  }
  // Si el usuario no tiene el tipo de usuario requerido
  if (usuario.tipoUsuario !== 1) {
    return <Navigate to="/" />;
  }

  // Si el token existe, renderizar las rutas protegidas
  return (
    <>
      <Outlet />
    </>
  );
}

export default RutasProtegidasAdmin;
