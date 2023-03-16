import "./CardProducto.css";
import { useProductos } from "./ProductosContext/ProductoProvider";
import { Modal } from "../Modal/Modal";
import { FormProducto } from "./FormProducto";
import { useEffect, useState } from "react";

async function obtenerUrlImagen(idProducto) {
  const response = await fetch(`/api/productos/${idProducto}/imagen`);
  const data = await response.json();
  return data.url;
}

export function CardProducto({ producto }) {
  const { deleteProducto,getImgProducto} = useProductos();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const [urlImagen, setUrlImagen] = useState("");

  async function obtenerUrlImagenAsync(idProducto) {
    const url = await getImgProducto(idProducto);
    setUrlImagen(url);
  }

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
    obtenerUrlImagenAsync(producto.id);
  }, [producto.id]);

  useEffect(() => {
    if (formularioEnviado) {
      handleCloseModal(); // Cerrar la ventana modal si el formulario se ha enviado correctamente
    }
  }, [formularioEnviado]);

  return (
    <div className="card-producto">
      <div>ID: {producto.id}</div>
      <div>Nombre: {producto.nombre}</div>
      <img className="card-producto-img" src={urlImagen} alt={producto.nombre} />
      <div>Precio: ${producto.precio}</div>
      <button className="card-producto" onClick={handleOpenModal}>
        Editar producto
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <FormProducto onSubmit={handleSubmit} initialProducto={producto} />
        <button onClick={handleCloseModal}>Cerrar ventana</button>
      </Modal>
      <button
        className="card-producto"
        onClick={() => deleteProducto(producto.id)}
      >
        Eliminar producto
      </button>
    </div>
  );
}