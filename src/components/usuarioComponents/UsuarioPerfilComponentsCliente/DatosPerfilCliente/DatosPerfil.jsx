import React, { useState, useEffect } from "react";
import { Modal } from "../../../ModalComponents/Modal";
import { FormEditarPerfil } from "./FormEditarPerfil";
import Swal from "sweetalert2";
import { Card } from "react-bootstrap";
import { useUsuarios } from "../../UsuariosContext/UsuarioProvider";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useProductos } from "../../../ProductoComponents/ProductosContext/ProductoProvider";
import { useOrdenes } from "../../../OrdenesComponents/OrdenesContext/OrdenProvider";
import { useServicios } from "../../../ServicioComponents/ServiciosContext/ServicioProvider";

export function DatosPerfil() {
  const [modalVisible, setModalVisible] = useState(false);
  const { obtenerInfoPerfil, eliminarCuentaUsuario } = useUsuarios();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [perfil, setPerfil] = useState(null);
  const navigate = useNavigate();
  const { cerrarSesionProductos } = useProductos();
  const { cerrarSesionOrdenes } = useOrdenes();
  const { cerrarSesionServicios } = useServicios();
  const { cerrarSesionUsuarios } = useUsuarios();

  const cargarPerfil = async () => {
    try {
      const perfilData = await obtenerInfoPerfil(usuario.id);
      console.log(perfilData);
      setPerfil(perfilData);
    } catch (error) {
      console.error(error);
      // Manejar el error en caso de que ocurra
    }
  };

  useEffect(() => {
    cargarPerfil();
  }, []);

  const handleEditarPerfilClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSubmit = async () => {
    handleCloseModal();
    cargarPerfil();
  };

  const handleEliminarCuenta = async () => {
    try {
      const { value: password } = await Swal.fire({
        title: "Eliminar cuenta",
        text: "Ingresa tu contraseña para confirmar la eliminación de la cuenta:",
        input: "password",
        inputPlaceholder: "Contraseña",
        inputAttributes: {
          autocapitalize: "off",
          autocorrect: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Eliminar cuenta",
        cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true,
        preConfirm: async (password) => {
          if (!password) {
            Swal.showValidationMessage("Debes ingresar una contraseña");
          } else {
            try {
              const status = await eliminarCuentaUsuario(usuario.id, password);
              if (status === 200) {
                Swal.fire(
                  "Cuenta eliminada",
                  "La cuenta ha sido eliminada exitosamente.",
                  "success"
                );
                localStorage.removeItem("token");
                localStorage.removeItem("usuario");
                cerrarSesionProductos();
                cerrarSesionOrdenes();
                cerrarSesionServicios();
                cerrarSesionUsuarios();
                navigate("/");
              } else if (status === 401) {
                Swal.fire("Error", "Contraseña incorrecta.", "error");
              } else if (status === 404) {
                Swal.fire("Error", "Usuario no encontrado.", "error");
              } else if (status === 500) {
                Swal.fire("Error", "Error en el servidor.", "error");
              } else {
                throw new Error("Error al eliminar la cuenta");
              }
            } catch (error) {
              Swal.showValidationMessage(
                "Error al eliminar la cuenta. Por favor, inténtalo nuevamente."
              );
            }
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Información de la cuenta</h2>
      {perfil && (
        <Card style={{ width: "auto" }}>
         <Card.Body>
            <div>
              <label>ID:</label>
              <p>{perfil.id}</p>
            </div>
            <div>
              <label>Nombre:</label>
              <p>{perfil.nombre}</p>
            </div>
            <div>
              <label>Apellido Paterno:</label>
              <p>{perfil.apellidoPaterno}</p>
            </div>
            <div>
              <label>Apellido Materno:</label>
              <p>{perfil.apellidoMaterno}</p>
            </div>
            <div>
              <label>Email:</label>
              <p>{perfil.email}</p>
            </div>
            <div>
              <label>Sexo:</label>
              <p>{perfil.sexo}</p>
            </div>
            <div>
              <label>Fecha de nacimiento:</label>
              <p>{perfil.fechaNacimiento}</p>
            </div>
            <div>
              <label>Teléfono:</label>
              <p>{perfil.telefono}</p>
              <button onClick={handleEditarPerfilClick}>
                Editar información
              </button>
            </div>
            <div>
              <button onClick={handleEliminarCuenta}>Eliminar cuenta</button>
            </div>
          </Card.Body>
        </Card>
      )}

      {modalVisible && (
        <Modal isOpen={modalVisible} onClose={handleCloseModal}>
          <FormEditarPerfil
            onSubmit={handleSubmit}
            nombre={perfil ? perfil.nombre : ""}
            apellidoPaterno={perfil ? perfil.apellidoPaterno : ""}
            apellidoMaterno={perfil ? perfil.apellidoMaterno : ""}
            fechaNacimiento={perfil ? perfil.fechaNacimiento : ""}
            telefono={perfil ? perfil.telefono : ""}
            sexo={perfil ? perfil.sexo : ""}
          />
        </Modal>
      )}
    </div>
  );
}
