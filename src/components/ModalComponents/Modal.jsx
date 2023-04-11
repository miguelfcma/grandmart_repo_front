import React from 'react';
import { Modal as ReactModal } from 'react-bootstrap';
import "./Modal.css"

export function Modal(props) {
  const handleClose = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <ReactModal show={props.isOpen} onHide={handleClose} className="custom-modal" scrollable>
      <div className="modal-header">
        <span className="close" onClick={handleClose}>&times;</span>
      </div>
      <div className="modal-body">
        {props.children}
      </div>
    </ReactModal>
  );
}
