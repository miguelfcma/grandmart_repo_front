import "./CardServicioCliente.css";
import { useServicios } from "../ServiciosContext/ServicioProvider";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { deleteImagesServicio } from "../../../firebase/servicioStorage";
import { FormUpdateServicioCliente } from "./FormUpdateServicioCliente";
import { FormUpdateInfoContactoDomicilio } from "./FormUpdateInfoContactoDomicilio";
import { Modal } from "../../ModalComponents/Modal";
import Swal from "sweetalert2";

// Componente para mostrar la tarjeta de un servicio del cliente
export function CardServicioCliente({ servicio }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const navigate = useNavigate();

  // Uso del contexto de servicios para obtener funciones y datos relacionados
  const { deleteServicioCliente, getImgPortadaServicio, getAllImagesServicio } =
    useServicios();

  const [urlImagen, setUrlImagen] = useState("");

  // Función asincrónica para obtener la URL de la imagen del servicio
  async function obtenerUrlImagenAsync(idServicio) {
    const url = await getImgPortadaServicio(idServicio);
    setUrlImagen(url);
  }

  useEffect(() => {
    obtenerUrlImagenAsync(servicio.id);
  }, [servicio.id]);

  // Maneja la eliminación de un servicio
  const handleEliminarServicio = async () => {
    try {
      // Diálogo de confirmación para eliminar el servicio
      const confirmResult = await Swal.fire({
        icon: "warning",
        title: "Eliminar servicio",
        text: `¿Estás seguro de eliminar el servicio "${servicio.titulo}"?`,
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#dc3545", // Color rojo para el botón de confirmación
      });

      if (confirmResult.isConfirmed) {
        // Obtener las imágenes del servicio antes de eliminarlo
        const imagenesServicio = await getAllImagesServicio(servicio.id);
        const urls = imagenesServicio.map((imagen) => imagen.url);
        const status = await deleteServicioCliente(servicio.id);

        // Manejar diferentes casos de estado de eliminación
        if (status === 200) {
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "El servicio se eliminó correctamente",
          });
        } else if (status === 404) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "El servicio no se encontró o no existe",
          });
        } else if (status === 500) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error en el servidor",
          });
        }

        // Eliminar las imágenes del servicio
        await deleteImagesServicio(urls);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Estados y funciones para controlar la apertura y cierre de los modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenContacto, setIsModalOpenContacto] = useState(false);
  const [formularioEnviado, setFormularioEnviado] = useState(false);

  // Abrir el modal para editar el servicio
  function handleOpenModal() {
    setIsModalOpen(true);
  }

  // Cerrar el modal para editar el servicio
  function handleCloseModal() {
    setIsModalOpen(false);
    setFormularioEnviado(false);
  }

  // Abrir el modal para editar la información de contacto y domicilio
  function handleOpenModalContacto() {
    setIsModalOpenContacto(true);
  }

  // Cerrar el modal para editar la información de contacto y domicilio
  function handleCloseModalContacto() {
    setIsModalOpenContacto(false);
    setFormularioEnviado(false);
  }

  // Manejar el envío del formulario dentro del modal
  function handleSubmit() {
    setFormularioEnviado(true);
  }

  useEffect(() => {
    // Cerrar los modales cuando el formulario se ha enviado
    if (formularioEnviado) {
      handleCloseModal();
      handleCloseModalContacto();
    }
  }, [formularioEnviado]);

  return (
    <div className="card-producto">
      <Link
        to={`/dashClient/servicios/detalles/${servicio.id}`}
        style={{ textDecoration: "none" }}
      >
        <div>ID: {servicio.id}</div>
        <div>Título: {servicio.titulo}</div>
        <img
          className="card-servicio-img"
          src={urlImagen}
          alt={servicio.nombre}
        />
        <div>Precio: $ {servicio.precio} MXN</div>
      </Link>

      {/* Botón para editar el servicio */}
      <button className="card-servicio" onClick={handleOpenModal}>
        Editar servicio
      </button>
      {/* Modal para editar el servicio */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <FormUpdateServicioCliente
          onSubmit={handleSubmit}
          servicio={servicio}
        />
        <button onClick={handleCloseModal}>Cerrar ventana</button>
      </Modal>

      {/* Botón para editar información de contacto y domicilio */}
      <button className="card-servicio" onClick={handleOpenModalContacto}>
        Editar información de contacto y domicilio
      </button>
      {/* Modal para editar información de contacto y domicilio */}
      <Modal isOpen={isModalOpenContacto} onClose={handleCloseModalContacto}>
        <FormUpdateInfoContactoDomicilio
          onSubmit={handleSubmit}
          servicio={servicio}
        />
        <button onClick={handleCloseModalContacto}>Cerrar ventana</button>
      </Modal>

      {/* Botón para eliminar el servicio */}
      <button className="card-servicio" onClick={handleEliminarServicio}>
        Eliminar servicio
      </button>
    </div>
  );
}
