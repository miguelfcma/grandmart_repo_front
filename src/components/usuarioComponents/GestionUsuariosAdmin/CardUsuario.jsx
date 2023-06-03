import { Button, Card } from "react-bootstrap";
import "./CardUsuario.css";
import { useUsuarios } from "../UsuariosContext/UsuarioProvider";
import { Modal } from "../../ModalComponents/Modal";
import { FormUsuario } from "./FormUsuario";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export function CardUsuario({ usuario }) {
  const { deleteUsuario } = useUsuarios();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleSubmit() {
    handleCloseModal();
  }

  function handleDelete() {
    Swal.fire({
      icon: "question",
      title: "Confirmar eliminación",
      html: `
        <div>
          <p>Estás a punto de eliminar el siguiente usuario:</p>
          <ul>
            <li>Id: ${usuario.id}</li>
            <li>Nombre: ${usuario.nombre}</li>
            <li>Apellido Paterno: ${usuario.apellidoPaterno}</li>
            <li>Apellido Materno: ${usuario.apellidoMaterno}</li>
            <li>Email: ${usuario.email}</li>
            <li>
              Tipo Usuario: 
              ${
                usuario.tipoUsuario === 0
                  ? "Usuario cliente"
                  : usuario.tipoUsuario === 1
                  ? "Usuario admin"
                  : usuario.tipoUsuario === 2
                  ? "Usuario repartidor"
                  : "Tipo de usuario desconocido"
              }
            </li>
          </ul>
          <p>¿Estás seguro de que deseas eliminar este usuario?</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteUsuario(usuario.id);
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Operación exitosa",
            text: "Usuario eliminado correctamente.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error al eliminar el usuario",
            text: "Ha ocurrido un error al eliminar el usuario. Por favor, inténtalo de nuevo más tarde.",
          });
        }
      }
    });
  }

  return (
    <Card className="card-usuario">
      <Card.Body>
        <Card.Title>Id: {usuario.id}</Card.Title>
        <Card.Text>Nombre: {usuario.nombre}</Card.Text>
        <Card.Text>Apellido Paterno: {usuario.apellidoPaterno}</Card.Text>
        <Card.Text>Apellido Materno: {usuario.apellidoMaterno}</Card.Text>
        <Card.Text>Email: {usuario.email}</Card.Text>
        <Card.Text>
          Tipo Usuario:{" "}
          {usuario.tipoUsuario === 0
            ? "Usuario cliente"
            : usuario.tipoUsuario === 1
            ? "Usuario admin"
            : usuario.tipoUsuario === 2
            ? "Usuario repartidor"
            : "Tipo de usuario desconocido"}
        </Card.Text>
        <Button variant="primary" onClick={handleOpenModal}>
          Editar usuario
        </Button>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <FormUsuario onSubmit={handleSubmit} initialUsuario={usuario} />
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar ventana
          </Button>
        </Modal>
        <Button variant="danger" onClick={handleDelete}>
          Eliminar usuario
        </Button>
      </Card.Body>
    </Card>
  );
}
