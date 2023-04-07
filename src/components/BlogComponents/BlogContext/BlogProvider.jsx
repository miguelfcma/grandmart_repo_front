import { useContext, useState, useEffect } from "react";

import {
  createPublicacionRequest,
  deletePublicacionPorIdUsuarioRequest,
  getPublicacionesPorIdUsuarioRequest,
  updatePublicacionPorIdUsuarioRequest,
  getPublicacionesRequest,
} from "../../../API/BlogApiRest/publicacionesBlog.api";

import { BlogContext } from "./BlogContext";

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error(
      "useBlog debe ser utilizado dentro de un BlogContextProvider"
    );
  }
  return context;
};

export const BlogContextProvider = ({ children }) => {
  const [publicaciones, setPublicaciones] = useState([]);

  async function loadPublicaciones() {
    try {
      const response = await getPublicacionesRequest();
      
      if (response.status === 200) {
        setPublicaciones(response.data);
      } else {
        throw new Error("No se pudo obtener la lista de publicaciones");
      }
      
    } catch (error) {
      console.error(error);
    }
  }

  const getPublicacionesPorIdUsuario = async (idUsuario) => {
    try {
      const response = await getPublicacionesPorIdUsuarioRequest(idUsuario);
      if (response.status == 200) {
        return response.data;
      } else {
        throw new Error("No se pudo obtener la lista de publicaciones del usuario");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deletePublicacionPorIdUsuario = async (idUsuario, idPublicacion) => {
    try {
      const response = await deletePublicacionPorIdUsuarioRequest(idUsuario, idPublicacion);
      if (response.status == 204) {
        setPublicaciones(publicaciones.filter((publicacion) => publicacion.id !== idPublicacion));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createPublicacion = async (publicacion) => {
    try {
      const response = await createPublicacionRequest(publicacion);

      if (response.status == 201) {
        loadPublicaciones() // Llama a la función loadPublicaciones después de crear la publicación.
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updatePublicacionPorIdUsuario = async (idUsuario, idPublicacion, publicacion) => {
    try {
      const response = await updatePublicacionPorIdUsuarioRequest(idUsuario, idPublicacion, publicacion);
    
      if (response.status == 200) {
        loadPublicaciones() // Llama a la función loadPublicaciones después de actualizar la publicación.
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };

 

  return (
    <BlogContext.Provider
      value={{
        publicaciones,
        loadPublicaciones,
        getPublicacionesPorIdUsuario,
        deletePublicacionPorIdUsuario,
        createPublicacion,
        updatePublicacionPorIdUsuario,

      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
