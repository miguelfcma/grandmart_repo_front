//Este archivo es para renderizar elementos individuales de una lista de copias de seguridad

import React from "react";
import { Button, Card } from "react-bootstrap";

//En este componente ItemBackup integra en sus propiedades los siguientes argumentos, para que se puedan manejar las acciones con los elementos de copias de seguridad 
export const ItemBackup = ({ backup, handleDelete, handleSelect,handleDownload }) => {
  //Funcion llamada al hacer clic en el boton "Eliminar"
  const onDelete = () => {
    handleDelete(backup);
  };

  //Funcion llamada al hacer clic en el boton "Seleccionar"
  const onSelect = () => {
    handleSelect(backup);
  };

  //Funcion llamada al hacer clic en el boton "Descargar"
  const onDownload = () => {
    handleDownload(backup);
  };

  //Renderizado del componente
  return (
    <Card>
      {/*Componente card contiene la informacion de la copia de seguridad y los 3 botones*/}
      <Card.Body>
        <Card.Title>{backup}</Card.Title>
        <Button variant="primary" onClick={onSelect}>
          Seleccionar
        </Button>{" "}
        <Button variant="danger" onClick={onDelete}>
          Eliminar
        </Button>{" "}
        <Button variant="primary" onClick={onDownload}>
          Descargar
        </Button>
      </Card.Body>
    </Card>
  );
};
