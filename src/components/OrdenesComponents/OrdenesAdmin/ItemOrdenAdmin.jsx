import React from "react";
import { useNavigate, Link } from "react-router-dom"; // Importar useNavigate y Link para la navegación
import { FaEye } from "react-icons/fa"; // Importar el icono de ojo
import "./ItemOrdenAdmin.css";

export function ItemOrdenAdmin({ orden }) {
  const { id, total, estado_orden, id_usuario, createdAt, updatedAt,fechaEntrega } = orden;
  const navigate = useNavigate(); // Obtener la función navigate para la navegación

  const verDetalles = () => {
    // Función de manejo de evento para ver detalles del pedido
    console.log("Ver más detalles del pedido: ", orden);
    // Navegar a la página de detalles del pedido, puedes modificar la URL según tu estructura de rutas
    navigate(`/dashAdmin/ordenes/detalles/${id}`);
  };

  return (
    <tr>
      <td>{id}</td>
      <td className={`estado-${estado_orden.replace(" ", "").toLowerCase()}`}>{estado_orden}</td>

      <td>{id_usuario}</td>
      <td>{new Date(createdAt).toLocaleDateString()}</td>
    

      {/* <td>{new Date(updatedAt).toLocaleDateString()}</td> */}
      <td>$ {total} MXN</td>
      <td>
        {/* Agregar el botón con el icono de ojo y la función de manejo de eventos */}
        <button className="btn-ver-detalles" onClick={verDetalles}>
          <FaEye className="icono-ojo" />
        </button>
      </td>
    </tr>
  );
}
