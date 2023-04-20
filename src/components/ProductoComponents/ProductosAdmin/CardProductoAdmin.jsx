import "./CardProductoAdmin.css";
import { useProductos } from "../ProductosContext/ProductoProvider";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { deleteImagesProducto } from "../../../firebase/productoStorage";
import { FormUpdateProductoAdmin } from "./FormUpdateProductoAdmin";
import { Modal } from "../../ModalComponents/Modal";

export function CardProductoAdmin({ producto }) {
  const { deleteProducto, getImgPortadaProducto, getAllImagesProduct } =  useProductos();

  const [urlImagen, setUrlImagen] = useState("");

  async function obtenerUrlImagenAsync(idProducto) {
    const url = await getImgPortadaProducto(idProducto);
    setUrlImagen(url);
  }

  useEffect(() => {
    obtenerUrlImagenAsync(producto.id);
  }, [producto.id]);

  const handleEliminarProducto = async () => {
    try {
      const imagenesProducto = await getAllImagesProduct(producto.id);
      const urls = imagenesProducto.map((imagen) => imagen.url);

      await deleteImagesProducto(urls);
      await deleteProducto(producto.id);
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
    <div className="card-producto">
      <Link
        to={`/dashAdmin/productos/detalles/${producto.id}`}
        style={{ textDecoration: "none" }}
      >
        <div>ID: {producto.id}</div>
        <div>Nombre: {producto.nombre}</div>
        <img
          className="card-producto-img"
          src={urlImagen}
          alt={producto.nombre}
        />
        <div>Precio: ${producto.precio}</div>
      </Link>

      <button className="card-producto" onClick={handleOpenModal}>
        Editar producto
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <FormUpdateProductoAdmin onSubmit={handleSubmit} producto={producto} />
        <button onClick={handleCloseModal}>Cerrar ventana</button>
      </Modal>
      <button className="card-producto" onClick={handleEliminarProducto}>
        Eliminar producto
      </button>
    </div>
  );
}
