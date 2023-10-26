import { Outlet } from "react-router-dom";
import { VerificarToken } from "../components/VerificadorToken/VerificarToken";
// Componente de enrutamiento general para la aplicación, que se utiliza para
// mostrar el contenido del enrutamiento anidado en la ubicación actual.
// También incluye un componente de verificación de token de autenticación.
function RutasGeneral() {
  return (
    <>
      {/*// Componente Outlet de "react-router-dom" se utiliza para mostrar el contenido de las rutas anidadas en la ubicación actual.
       */}
      <Outlet />
      <VerificarToken />
    </>
  );
}

export default RutasGeneral;
