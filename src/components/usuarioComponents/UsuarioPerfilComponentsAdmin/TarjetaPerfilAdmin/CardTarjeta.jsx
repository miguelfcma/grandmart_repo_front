import { useState, useEffect } from "react";
import { useUsuarios } from "../../UsuariosContext/UsuarioProvider";

import { Modal } from "../../../ModalComponents/Modal";
import { FormUpdateTarjeta } from "./FormUpdateTarjeta";
import { FormCreateTarjeta } from "./FormCreateTarjeta";


export function CardTarjeta() {
  const { info_bancaria, load_info_bancaria, delete_info_bancaria } =
    useUsuarios();
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
  async function handleTarjetaCreada() {
    await load_info_bancaria(usuario.id);
  }
  async function handleDeleteTarjeta() {
    await delete_info_bancaria(usuario.id);
  }

  useEffect(() => {
    const fetchData = async (userId) => {
      try {
        await load_info_bancaria(userId);
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
        {info_bancaria ? (
          <div>

            <p>Nombre del titular de la cuenta: {info_bancaria.postal}</p>
            <p>Banco: {info_bancaria.estado}</p>
            <p>Número de cuenta: {info_bancaria.municipio_alcaldia}</p>
            

            <button onClick={handleOpenModal}>Editar domicilio</button>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
              <FormUpdateTarjeta
                info_bancaria_inicial={info_bancaria}
                onSubmit={handleSubmit}
              />
              <button onClick={handleCloseModal}>Cerrar ventana</button>
            </Modal>
            <button onClick={handleDeleteTarjeta}>Eliminar</button>
          </div>
        ) : (
          <div>
            <p>No hay infromación bancaria registrada todavia</p>
            <FormCreateTarjeta onSubmit={handleTarjetaCreada} />
          </div>
        )}
      </div>
    </div>
  );
}
