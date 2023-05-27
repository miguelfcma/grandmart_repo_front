import "./CardProductoCliente.css";
import { useProductos } from "../ProductosContext/ProductoProvider";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { deleteImagesProducto } from "../../../firebase/productoStorage";
import { FormUpdateProductoCliente } from "./FormUpdateProductoCliente";
import { Modal } from "../../ModalComponents/Modal";

export function CardProductoCliente({ producto }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const navigate = useNavigate();

  const { deleteProductoCliente, getImgPortadaProducto, getAllImagesProduct } =
    useProductos();

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
      await deleteProductoCliente(producto.id);
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
        to={`/dashClient/productos/detalles/${producto.id}`}
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

      <button className="btn-cliente-producto" onClick={handleOpenModal}>
        Editar producto
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <FormUpdateProductoCliente onSubmit={handleSubmit} producto={producto} />
        <button onClick={handleCloseModal}>Cerrar ventana</button>
      </Modal>
      <button className="btn-cliente-producto" onClick={handleEliminarProducto}>
        Eliminar producto
      </button>
    </div>
  );
}
