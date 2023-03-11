import "./CardUsuario.css";
import { useUsuarios } from "./UsuariosContext/UsuarioProvider";
import {Modal} from "../Modal/Modal";
import { FormUsuario } from "./FormUsuario";
import { useEffect,useState } from "react";


export function CardUsuario({ usuario }) {
  const{ deleteUsuario} = useUsuarios()
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
    <div className="card-usuario">
        <div>Id: {usuario.id}</div>
      <div>Nombre: {usuario.nombre}</div>
      <div>Apellido Paterno: {usuario.apellidoPaterno}</div>
      <div>Apellido Materno: {usuario.apellidoMaterno}</div>
      <div>email: {usuario.email}</div>
      <div>
        Tipo Usuario: {usuario.tipoUsuario ? "Usuario admin" : "Usuario común"}
      </div>
      <button className="card-usuario" onClick={handleOpenModal}>Editar usuario</button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <FormUsuario onSubmit={handleSubmit} initialUsuario={usuario}/>
        <button onClick={handleCloseModal}>Cerrar ventana</button>
      </Modal>
      <button className="card-usuario" onClick={() => deleteUsuario(usuario.id)}>
        Eliminar usuario
      </button>
    </div>
  );
}