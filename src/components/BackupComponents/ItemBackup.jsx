import React from "react";
import { Button, Card } from "react-bootstrap";

export const ItemBackup = ({ backup, handleDelete, handleSelect,handleDownload }) => {
  const onDelete = () => {
    handleDelete(backup);
  };

  const onSelect = () => {
    handleSelect(backup);
  };

  const onDownload = () => {
    handleDownload(backup);
  };

  return (
    <Card>
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
