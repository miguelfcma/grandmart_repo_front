import { useContext, useState, useEffect } from "react";

import {
  getUsuariosRequest,
  createUsuarioRequest,
  deleteUsuarioRequest,
  updateUsuarioRequest,
  getUsuarioLoginRequest,
  actualizarContrasenaUsuarioRequest,
  obtenerInfoPerfilRequest,
  actualizarPerfilUsuarioRequest,
} from "../../../API/UsuariosApiRest/usuarios.api";
import {
  getDomicilioUsuarioByUserIdRequest,
  deleteDomicilioUsuarioByUserIdRequest,
  createDomicilioUsuarioRequest,
  updateDomicilioUsuarioByUserIdRequest,
} from "../../../API/UsuariosApiRest/domicilioUsuario.api";

import { UsuarioContext } from "./UsuarioContext";

export const useUsuarios = () => {
  const context = useContext(UsuarioContext);
  if (context === undefined) {
    throw new Error("useUsuarios must be used within a UsuarioContextProvider");
  }
  return context;
};

export const UsuarioContextProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [domicilio, setDomicilio] = useState(null);

  const obtenerInfoPerfil = async (id_usuario) => {
    try {
      const response = await obtenerInfoPerfilRequest(id_usuario);

      // Verifica el estado de la respuesta
      if (response.status === 200) {
        const data = response.data;
        return data; // Retorna los datos del perfil obtenidos
      } else {
        throw new Error("Error al obtener la información del perfil");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const actualizarPerfilUsuario = async (id_usuario, data) => {
    try {
      // Realiza una solicitud para actualizar el perfil del usuario
      const response = await actualizarPerfilUsuarioRequest(id_usuario, data);

      // Verifica el estado de la respuesta
      if (response.status === 200) {
        return true;
      } else {
        throw new Error("Error al actualizar el perfil del usuario");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  async function loadUsuarios() {
    try {
      const response = await getUsuariosRequest();

      if (response.status === 200) {
        setUsuarios(response.data);
      } else {
        throw new Error("No se pudo obtener la lista de usuarios");
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function loadDomicilio(id_usuario) {
    try {
      const response = await getDomicilioUsuarioByUserIdRequest(id_usuario);
      if (response.status === 200) {
        setDomicilio(response.data.data);
      } else {
        throw new Error("No se pudo obtener la dirección del usuario");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const deleteUsuario = async (id) => {
    try {
      const response = await deleteUsuarioRequest(id);
      if (response.status == 200) {
        setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createUsuario = async (usuario) => {
    try {
      const response = await createUsuarioRequest(usuario);

      if (response.status == 201) {
        loadUsuarios(); // Llama a la función refreshUsuarios después de actualizar el usuario.
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateUsuario = async (id, usuario) => {
    try {
      const response = await updateUsuarioRequest(id, usuario);
      console.log(response);
      if (response.status == 200) {
        loadUsuarios(); // Llama a la función refreshUsuarios después de actualizar el usuario.
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loginUsuario = async (usuario) => {
    try {
      const response = await getUsuarioLoginRequest(usuario);

      if (response.status == 200) {
        return response.data;
      } else {
        return null;
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDomicilioUsuarioByUserId = async (id_usuario) => {
    try {
      const response = await deleteDomicilioUsuarioByUserIdRequest(id_usuario);
      if (response.status === 204) {
        loadDomicilio(id_usuario);
        return true;
      } else {
        throw new Error("No se pudo eliminar la dirección del usuario");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createDomicilioUsuario = async (domicilio) => {
    try {
      const response = await createDomicilioUsuarioRequest(domicilio);
      if (response.status == 201) {
        return response.data.data;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateDomicilioUsuarioByUserId = async (id_usuario, domicilio) => {
    try {
      const response = await updateDomicilioUsuarioByUserIdRequest(
        id_usuario,
        domicilio
      );
      if (response.status == 200) {
        loadDomicilio(id_usuario);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const actualizarContrasenaUsuario = async (id_usuario, data) => {
    try {
      const response = await actualizarContrasenaUsuarioRequest(
        id_usuario,
        data
      );
      if (response.status == 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UsuarioContext.Provider
      value={{
        usuarios,
        loadUsuarios,
        deleteUsuario,
        createUsuario,
        updateUsuario,
        loginUsuario,

        deleteDomicilioUsuarioByUserId,
        createDomicilioUsuario,
        updateDomicilioUsuarioByUserId,
        loadDomicilio,
        domicilio,

        actualizarContrasenaUsuario,

        obtenerInfoPerfil,
        actualizarPerfilUsuario,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};
