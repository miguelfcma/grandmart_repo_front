import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import "./DenunciasProductoComponenteCompletoGeneral.css";
import { linkADenunciaGenPro } from "./linkADenunciaGenPro";

export function DenunciasProductoComponenteCompletoGeneral({ id_producto }) {
  
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const usuarioExiste = usuario && usuario.id;


  return (
    <div>
      <Card>
        <Card.Header>
          <h2 className="titulo-denuncias">Denuncias</h2>
        </Card.Header>
        {usuarioExiste ? (
          <>
            <linkADenunciaGenPro
              id_producto={id_producto}
            />
          </>
        ) : (
          <p>Debe iniciar sesión realizar una pregunta</p>
        )}
      </Card>
    </div>
  );
}
