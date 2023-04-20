import "./CardServicioAdmin.css";
import { useServicios } from "../ServiciosContext/ServicioProvider";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { deleteImagesServicio } from "../../../firebase/servicioStorage";
import { FormUpdateServicioAdmin } from "./FormUpdateServicioAdmin";
import { Modal } from "../../ModalComponents/Modal";

export function CardServicioAdmin({ servicio }) {
    const { deleteServicio, getImgPortadaServicio, getAllImagesServicio } = useServicios();
  
    const [urlImagen, setUrlImagen] = useState("");
  
    async function obtenerUrlImagenAsync(idServicio) {
      const url = await getImgPortadaServicio(idServicio);
      setUrlImagen(url);
    }
  
    useEffect(() => {
      obtenerUrlImagenAsync(servicio.id);
    }, [servicio.id]);
  
    const handleEliminarServicio = async () => {
      try {
        const imagenesServicio = await getAllImagesServicio(servicio.id);
        const urls = imagenesServicio.map((imagen) => imagen.url);
  
        await deleteImagesServicio(urls);
        await deleteServicio(servicio.id);
      } catch (error) {
        console.error(error);
      }
    };
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formularioEnviado, setFormularioEnviado] = useState(false);
  
    function handleOpenModal() {
      setIsModalOpen(true);
    }
  
    function handleCloseModal() {
      setIsModalOpen(false);
      setFormularioEnviado(false); // Reiniciar el estado del formulario enviado
    }
  
    function handleSubmit() {
      // Lógica para enviar el formulario
      setFormularioEnviado(true);
    }
  
    useEffect(() => {
      if (formularioEnviado) {
        handleCloseModal(); // Cerrar la ventana modal si el formulario se ha enviado correctamente
      }
    }, [formularioEnviado]);
  
    return (
      <div className="card-servicio">
        <Link
          to={`/dashAdmin/servicios/detalles/${servicio.id}`}
          style={{ textDecoration: "none" }}
        >
          <div>ID: {servicio.id}</div>
          <div>Título: {servicio.titulo}</div>
          <img
            className="card-servicio-img"
            src={urlImagen}
            alt={servicio.nombre}
          />
          <div>Precio: ${servicio.precio}</div>
        </Link>
  
        <button className="card-servicio" onClick={handleOpenModal}>
          Editar servicio
        </button>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <FormUpdateServicioAdmin onSubmit={handleSubmit} servicio={servicio} />
          <button onClick={handleCloseModal}>Cerrar ventana</button>
        </Modal>
        <button className="card-servicio" onClick={handleEliminarServicio}>
          Eliminar servicio
        </button>
      </div>
    );
  }
  