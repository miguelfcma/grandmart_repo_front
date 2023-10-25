//Este archivo utiliza el contexto para proporcionar los datos relacionados con categorias del sistema, es decir, permite a otros componentes acceder a manipular categorias del sistema

import { useContext, useState, useEffect } from "react";
import {
  getCategoriasRequest,
  deleteCategoriaRequest,
  updateCategoriaRequest,
  createCategoriaRequest,
} from "../../../API/CategoriasApiRest/categorias.api";
import { CategoriaContext } from "./CategoriaContext";

//Hook useCategorias se utiliza para acceder a los datos de categorias
export const useCategorias = () => {
  const context = useContext(CategoriaContext);
  if (context === undefined) {
    throw new Error(
      "useCategorias debe ser utilizado dentro de un CategoriaContextProvider"
    );
  }
  return context;
};
//Componente que define y proporciona el contexto, este componente envuelve todos los recibe un prop "children" que representa los componentes hijos
export const CategoriaContextProvider = ({ children }) => {
  //Se inicia un estado "categorias" con una matriz vacia, esta matriz contendra las categorias obtenidas de la API
  const [categorias, setCategorias] = useState([]);
  //La funcion loadCategorias se utiliza para cargar las categorias
  async function loadCategorias() {
    try {
      //Cuando se llama realiza una solicitud a la API para obtener la lista
      const response = await getCategoriasRequest();
      //Actualiza el estado "categorias" con los datos obtenidos
      if (response.status === 200) {
        setCategorias(response.data);
      } else {
        throw new Error("No se pudo obtener la lista de categorias");
      }
    } catch (error) {
      console.error(error);
    }
  }

  //Operaciones CRUD en categorias
  const deleteCategoria = async (id) => {
    try {
      const response = await deleteCategoriaRequest(id);
      if (response.status == 204) {
        //Actualiza el estado "categorias"
        setCategorias(categorias.filter((categoria) => categoria.id !== id));
      }
      return response.status;
    } catch (error) {
      console.error(error);
    }
  };
  const createCategoria = async (categoria) => {
    try {
      const response = await createCategoriaRequest(categoria);

      if (response.status == 201) {
        loadCategorias();
      }
      return response.status;
    } catch (error) {
      console.error(error);
    }
  };
  const updateCategoria = async (id, categoria) => {
    try {
      const response = await updateCategoriaRequest(id, categoria);

      if (response.status == 200) {
        loadCategorias();
      }
      return response.status;
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
      {/*El contexto se pasa a los componentes hijos a traves de la propiedad "value" que contiene los datos y funciones de categorias*/}
      {children}
    </CategoriaContext.Provider>
  );
};
