import React from "react";
import { Card } from "react-bootstrap";
import "./DenunciasProductoComponenteCompletoGeneral.css";

// Componente que muestra las denuncias para un producto.
export function DenunciasProductoComponenteCompletoGeneral({ id_producto }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const usuarioExiste = usuario && usuario.id;

  return (
    <div>
      <Card>
        <Card.Header>
          <h2 className="titulo-denuncias">Denuncias</h2>
        </Card.Header>
        {usuarioExiste ? (
          // Muestra el componente "linkADenunciaGenPro" si el usuario está autenticado.
          <linkADenunciaGenPro id_producto={id_producto} />
        ) : (
          // Muestra un mensaje si el usuario no está autenticado.
          <p>Debe iniciar sesión para realizar una denuncia.</p>
        )}
      </Card>
    </div>
  );
}
