import "./CardProductoAdmin.css";
import { useProductos } from "../ProductosContext/ProductoProvider";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteImagesProducto } from "../../../firebase/productoStorage";
import { FormUpdateProductoAdmin } from "./FormUpdateProductoAdmin";
import { Modal } from "../../ModalComponents/Modal";

// Componente para mostrar la tarjeta de un producto en la interfaz de administrador
export function CardProductoAdmin({ producto }) {
  const { deleteProducto, getImgPortadaProducto, getAllImagesProduct } =
    useProductos();

  const [urlImagen, setUrlImagen] = useState("");

  // Función asincrónica para obtener la URL de la imagen de portada del producto
  async function obtenerUrlImagenAsync(idProducto) {
    const url = await getImgPortadaProducto(idProducto);
    setUrlImagen(url);
  }

  // Cuando el componente se monta, obtenemos la URL de la imagen
  useEffect(() => {
    obtenerUrlImagenAsync(producto.id);
  }, [producto.id]);

  // Maneja la eliminación de un producto
  const handleEliminarProducto = async () => {
    try {
      const imagenesProducto = await getAllImagesProduct(producto.id);
      const urls = imagenesProducto.map((imagen) => imagen.url);

      // Mostrar SweetAlert2 de confirmación para eliminar el producto
      const confirmResult = await Swal.fire({
        icon: "warning",
        title: "Eliminar producto",
        text: `¿Estás seguro de eliminar el producto "${producto.nombre}"?`,
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
      });

      if (confirmResult.isConfirmed) {
        const status = await deleteProducto(producto.id);

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

  // Estado para controlar la apertura del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado para rastrear si el formulario ha sido enviado
  const [formularioEnviado, setFormularioEnviado] = useState(false);

  // Abre el modal
  function handleOpenModal() {
    setIsModalOpen(true);
  }

  // Cierra el modal
  function handleCloseModal() {
    setIsModalOpen(false);
    setFormularioEnviado(false); // Reiniciar el estado del formulario enviado
  }

  // Maneja el envío del formulario
  function handleSubmit() {
    // Lógica para enviar el formulario
    setFormularioEnviado(true);
  }

  // Efecto para cerrar el modal cuando el formulario se envía con éxito
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
        to={`/dashAdmin/productos/detalles/${producto.id}`}
        style={{ textDecoration: "none" }}
      >
        <div>ID: {producto.id}</div>
        <div>ID Usuario: {producto.id_usuario}</div>
        <div>{producto.nombre}</div>
        <img
          className="card-producto-img"
          src={urlImagen}
          alt={producto.nombre}
        />
        <div>Precio: $ {producto.precio} MXN</div>
      </Link>

      <button className="btn-admin-producto" onClick={handleOpenModal}>
        Editar producto
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <FormUpdateProductoAdmin onSubmit={handleSubmit} producto={producto} />
        <button onClick={handleCloseModal}>Cerrar ventana</button>
      </Modal>
      <button className="btn-admin-producto" onClick={handleEliminarProducto}>
        Eliminar producto
      </button>
    </div>
  );
}
