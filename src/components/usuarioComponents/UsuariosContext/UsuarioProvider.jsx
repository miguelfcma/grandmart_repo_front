import { useContext, useState, useEffect } from "react";

import {
  getUsuariosRequest,
  createUsuarioRequest,
  deleteUsuarioRequest,
  updateUsuarioRequest,
  getUsuarioLoginRequest,
} from "../../../API/usuarios.api";

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

  const deleteUsuario = async (id) => {
    try {
      const response = await deleteUsuarioRequest(id);
      if (response.status == 204) {
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
        await refreshUsuarios(); // Llama a la función refreshUsuarios después de actualizar el usuario.
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
        await refreshUsuarios(); // Llama a la función refreshUsuarios después de actualizar el usuario.
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const refreshUsuarios = async () => {
    // Agrega la función refreshUsuarios.
    try {
      const response = await getUsuariosRequest();
      if (response.status === 200) {
        setUsuarios(response.data);
      } else {
        throw new Error("No se pudo obtener la lista de usuarios");
      }
      setUsuarios(response);
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

  return (
    <UsuarioContext.Provider
      value={{
        usuarios,
        loadUsuarios,
        deleteUsuario,
        createUsuario,
        updateUsuario,
        loginUsuario,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};
