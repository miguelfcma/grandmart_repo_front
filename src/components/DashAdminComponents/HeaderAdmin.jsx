//Este archivvo solo es un encabezado fijo en el dashboard de administrador, que mostrara todo el tiempo el logo del proyecto "Grandmart"

import { Link } from "react-router-dom";

export function HeaderAdmin() {
  return (
    <div className="header">
      <div className="header-container">
        {/*Este logo a su vez funcionara para volver al inicio del dashboard con un clic*/}
        <Link to="/dashAdmin">
          <img alt="e-commerce" src="https://firebasestorage.googleapis.com/v0/b/grandmart-51065.appspot.com/o/src%2Flogo.png?alt=media&token=6c393680-5c89-4708-a0d3-f8ffcb0fc379" />
          <br></br>
        </Link>
      </div>
    </div>
  );
}
