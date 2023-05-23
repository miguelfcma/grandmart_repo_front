import { useState, useEffect } from "react";
import { useUsuarios } from "../../UsuariosContext/UsuarioProvider";
import { Modal } from "../../../ModalComponents/Modal";
import { FormUpdateUsuarioDomicilio } from "./FormUpdateUsuarioDomicilio";
import { FormCreateUsuarioDomicilio } from "./FormCreateUsuarioDomicilio";

export function CardDomicilio() {
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
  async function handleDomicilioCreado() {
    await loadDomicilio(usuario.id);
  }
  async function handleDeleteDomicilioUsuario() {
    await deleteDomicilioUsuarioByUserId(usuario.id)
  }


  useEffect(() => {
    const fetchData = async (userId) => {
      try {
        await loadDomicilio(userId);
      } catch (error) {
        console.error(error);
      }
    };

    if (usuario && usuario.id) {
      fetchData(usuario.id);
    }
  }, []);
  return (
    <div className="dashboard-container">
   
    <div className="contenidoPages">

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
          <button onClick={handleDeleteDomicilioUsuario}>Eliminar</button>
        </div>
      ) : (
        <div>
          <p>NO HAY DOMICILIO</p>
          <FormCreateUsuarioDomicilio onSubmit={handleDomicilioCreado} />
        </div>
      )}
    </div>
    </div>
  );
}
