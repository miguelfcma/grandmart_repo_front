import { useContext, useState, useEffect } from "react";

import { getCategoriasRequest,deleteCategoriaRequest,updateCategoriaRequest,createCategoriaRequest } from "../../../API/categorias.api";

import { CategoriaContext } from "./CategoriaContext";


export const useCategorias = () => {
  const context = useContext(CategoriaContext);
  if (context === undefined) {
    throw new Error(
      "useCategorias must be used within a CategoriaContextProvider"
    );
  }
  return context;
};

export const CategoriaContextProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);

  async function loadCategorias() {
    try {
      const response = await getCategoriasRequest();
      if (response === undefined) {
        throw new Error("No se pudo obtener la lista de categorias");
      }
      setCategorias(response);
    } catch (error) {
      console.error(error);
    }
  }

  const deleteCategoria = async (id) => {
    try {
      const response = await deleteCategoriaRequest(id);
      setCategorias(categorias.filter((categoria) => categoria.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const createCategoria = async (categoria) => {
    try {
      const response = await createCategoriaRequest(categoria);

      if (response.status == 201) {
        await refreshCategorias(); // Llama a la función refreshCategorias después de actualizar el categoria.
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateCategoria = async (id, categoria) => {
    try {
      const response = await updateCategoriaRequest(id, categoria);
      console.log(response);
      if (response.status == 200) {
        await refreshCategorias(); // Llama a la función refreshCategorias después de actualizar el categoria.
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const refreshCategorias = async () => {
    // Agrega la función refreshCategorias.
    try {
      const response = await getCategoriasRequest();
      if (response === undefined) {
        throw new Error("No se pudo obtener la lista de categorias");
      }
      setCategorias(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CategoriaContext.Provider
      value={{
        categorias,
        loadCategorias,
        deleteCategoria,
        createCategoria,
        updateCategoria,
      }}
    >
      {children}
    </CategoriaContext.Provider>
  );
};
