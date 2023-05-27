import "./CardServicioCliente.css";
import { useServicios } from "../ServiciosContext/ServicioProvider";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { deleteImagesServicio } from "../../../firebase/servicioStorage";
import { FormUpdateServicioCliente } from "./FormUpdateServicioCliente";

import { Modal } from "../../ModalComponents/Modal";

export function CardServicioCliente({ servicio }) {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const navigate = useNavigate();
  
    const { deleteServicioCliente, getImgPortadaServicio, getAllImagesServicio } =
      useServicios();
  
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
        await deleteServicioCliente(servicio.id);
        await deleteImagesServicio(urls);
       
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
          <div>Precio: ${servicio.precio}</div>
        </Link>
  
        <button className="card-servicio" onClick={handleOpenModal}>
          Editar servicio
        </button>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <FormUpdateServicioCliente onSubmit={handleSubmit} servicio={servicio} />
          <button onClick={handleCloseModal}>Cerrar ventana</button>
        </Modal>
        <button className="card-servicio" onClick={handleEliminarServicio}>
          Eliminar servicio
        </button>
      </div>
    );
  }
  