import { useState, useEffect } from "react";
import { useUsuarios } from "../UsuariosContext/UsuarioProvider";
import { Modal } from "../../../components/ModalComponents/Modal";
import { FormUsuarioDomicilio } from "./FormUsuarioDomicilio";

export function CardUsuarioDomicilio() {
  const { getDomicilioUsuarioByUserId, actualizarDomicilioUsuario, crearDomicilioUsuario } = useUsuarios();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [domicilio, setDomicilio] = useState(null);
  const [isNewDomicilio, setIsNewDomicilio] = useState(false);

  useEffect(() => {
    const fetchDomicilio = async () => {
      const domicilio = await getDomicilioUsuarioByUserId(usuario.id);

      if (domicilio) {
        setIsNewDomicilio(false);
        setDomicilio(domicilio);
      } else {
        setIsNewDomicilio(true);
        setDomicilio({
          nombre_ine: "",
          postal: "",
          estado: "",
          municipio_alcaldia: "",
          colonia: "",
          calle: "",
          numeroExterior: "",
          numeroInterior: "",
          calle1: "",
          calle2: "",
          descripcion: "",
        });
      }
    };
    fetchDomicilio();
  }, [getDomicilioUsuarioByUserId, usuario.id]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formularioEnviado, setFormularioEnviado] = useState(false);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setFormularioEnviado(false); // Reiniciar el estado del formulario enviado
  }

  async function handleSubmit(domicilioData) {
    if (isNewDomicilio) {
      await crearDomicilioUsuario(usuario.id, domicilioData);
    } else {
      await actualizarDomicilioUsuario(domicilio.id, domicilioData);
    }
    setFormularioEnviado(true);
  }

  useEffect(() => {
    if (formularioEnviado) {
      handleCloseModal(); // Cerrar la ventana modal si el formulario se ha enviado correctamente
    }
  }, [formularioEnviado]);

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
            <FormUsuarioDomicilio onSubmit={handleSubmit} initialDomicilio={domicilio} />
            <button onClick={handleCloseModal}>Cerrar ventana</button>
          </Modal>
        </div>
      ) : (
        <p>NO HAY DOMICILIO</p>
      )}
    </div>
  );
}
