import React from 'react';
import "./Modal.css"
export function Modal(props) {
  if (!props.isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <span className="close" onClick={props.onClose}>&times;</span>
        </div>
        <div className="modal-body">
          {props.children}
        </div>
      </div>
    </div>
  );
}


