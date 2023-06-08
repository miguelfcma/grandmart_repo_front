import { Route, Navigate, Outlet } from "react-router-dom";
import { VerificarToken } from "../components/VerificadorToken/VerificarToken";
function RutasGeneral() {
  
  return (
    <>
      <Outlet />
      <VerificarToken />
    </>
  );
}

export default RutasGeneral;
