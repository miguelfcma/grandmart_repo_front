import "./CardProductoCliente.css";
import { useProductos } from "../ProductosContext/ProductoProvider";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteImagesProducto } from "../../../firebase/productoStorage";
import { FormUpdateProductoCliente } from "./FormUpdateProductoCliente";
import { Modal } from "../../ModalComponents/Modal";

// Componente para mostrar un producto al cliente en forma de tarjeta
export function CardProductoCliente({ producto }) {
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

      // Mostrar SweetAlert2 de confirmación
      const confirmResult = await Swal.fire({
        icon: "warning",
        title: "Eliminar producto",
        text: `¿Estás seguro de eliminar el producto "${producto.nombre}"?`,
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
      });

      if (confirmResult.isConfirmed) {
        const status = await deleteProductoCliente(producto.id);

        if (status === 200) {
          await deleteImagesProducto(urls);
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "El producto se eliminó correctamente",
          });
        } else if (status === 404) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "El producto no se encontró o no existe",
          });
        } else if (status === 500) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error en el servidor",
          });
        }
      }
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
      {producto.stock === 0 && (
        <div className="agotado-label">
          <h4>Agotado</h4>
        </div>
      )}
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
        <div>Precio: $ {producto.precio} MXN</div>
      </Link>

      <button className="btn-cliente-producto" onClick={handleOpenModal}>
        Editar producto
      </button>

      {/* Componente Modal que muestra el formulario de actualización */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <FormUpdateProductoCliente
          onSubmit={handleSubmit}
          producto={producto}
        />
        <button onClick={handleCloseModal}>Cerrar ventana</button>
      </Modal>

      <button className="btn-cliente-producto" onClick={handleEliminarProducto}>
        Eliminar producto
      </button>
    </div>
  );
}
