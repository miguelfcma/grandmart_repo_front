import { useState, useEffect } from "react";
import { useUsuarios } from "../UsuariosContext/UsuarioProvider";
import { Modal } from "../../../components/ModalComponents/Modal";
import { FormUpdateUsuarioDomicilio } from "./FormUpdateUsuarioDomicilio";
import { FormCreateUsuarioDomicilio } from "./FormCreateUsuarioDomicilio";

export function CardUsuarioDomicilio() {
  const { domicilio, loadDomicilio, deleteDomicilioUsuarioByUserId } = useUsuarios();
  const usuario = JSON.parse(localStorage.getItem("usuario"));


  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);

  }

  function handleSubmit() {
    // Lógica para enviar el formulario
    handleCloseModal();
  }
  function handleDomicilioCreado() {
    loadDomicilio(usuario.id);
  }
  useEffect(() => {
    loadDomicilio(usuario.id);
  }, []);


  return (
    <div>
      {domicilio ? (
        <div>
          <h2>{domicilio.nombre_ine}</h2>
          <p>Código postal: {domicilio.postal}</p>
          <p>Estado: {domicilio.estado}</p>
          <p>Municipio o alcaldía: {domicilio.municipio_alcaldia}</p>
          <p>Colonia: {domicilio.colonia}</p>
          <p>Calle: {domicilio.calle}</p>
          <p>Número exterior: {domicilio.numeroExterior}</p>
          <p>Número interior: {domicilio.numeroInterior}</p>
          <p>Calle 1: {domicilio.calle1}</p>
          <p>Calle 2: {domicilio.calle2}</p>
          <p>Descripción: {domicilio.descripcion}</p>

          <button onClick={handleOpenModal}>Editar domicilio</button>

          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <FormUpdateUsuarioDomicilio initialDomicilio={domicilio} onSubmit={handleSubmit} />
            <button onClick={handleCloseModal}>Cerrar ventana</button>
          </Modal>
          <button onClick={() => deleteDomicilioUsuarioByUserId(usuario.id)}>Eliminar</button>
        </div>
      ) : (
        <div>
          <p>NO HAY DOMICILIO</p>
          <FormCreateUsuarioDomicilio onSubmit={handleDomicilioCreado} />
        </div>
      )}
    </div>
  );
}
