// Este archivo define un componente Modal en React

import React from 'react';
import { Modal as ReactModal } from 'react-bootstrap';
import "./Modal.css"

export function Modal(props) {
  // Función para cerrar el modal
  const handleClose = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <ReactModal show={props.isOpen} onHide={handleClose} className="custom-modal" scrollable>
      <div className="modal-header">
        <span className="close" onClick={handleClose}>&times;</span> {/* Botón de cierre */}
      </div>
      <div className="modal-body">
        {props.children} {/* Contenido del modal proporcionado como children */}
      </div>
    </ReactModal>
  );
}
