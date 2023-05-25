import { useContext, useState, useEffect } from "react";

import {
  getServiciosRequest,
  createServicioRequest,
  deleteServicioRequest,
  updateServicioRequest,
  getServiciosByUsuarioIdRequest,
  getServicioByIdRequest
} from "../../../API/ServiciosApiRest/servicios.api";

import { 
  createServicioImageRequest,
  createImagenesRequest,
  getServicioImagePortadaRequest,
  getAllImagesServicioRequest,
} from "../../../API/ServiciosApiRest/imagenServicio.api";


import {
  crearPreguntaServicioRequest,
  getPreguntasByIdServicioRequest,
  crearRespuestaServicioRequest,
  getServiciosConPreguntasByUsuarioIdRequest,
  eliminarPreguntaServicioRequest
} from "../../../API/ServiciosApiRest/preguntasServicio.api";

import { 
  crearDenunciaServicioRequest,
  getDenunciasByIdServicioRequest,
  getServiciosConDenunciasByUsuarioIdRequest,
  getTodasLasDenunciasRequestServicio,
  actualizarDenunciaARevisadaServicio,
  eliminarDenunciaServicioRequest

} from "../../../API/ServiciosApiRest/denunciasServicio.api";

import { ServicioContext } from "./ServicioContext";

export const useServicios = () => {
  const context = useContext(ServicioContext);
  if (context === undefined) {
    throw new Error(
      "useServicios must be used within a ServicioContextProvider"
    );
  }
  return context;
};


export const ServicioContextProvider = ({ children }) => {
  const [serviciosAll, setServiciosAll] = useState([]);
  const [serviciosUsuario, setServiciosUsuario] = useState([]);
  const [serviciosPreguntas, setServiciosPreguntas] = useState([]);
  const [serviciosDenuncias, setServiciosDenuncias] = useState([]);
  

  async function loadServicios() {
    try {
      const response = await getServiciosRequest();
      if (response === undefined) {
        throw new Error("No se pudo obtener la lista de servicios");
      }
      setServiciosAll(response);
    } catch (error) {
      console.error(error);
    }
  }

  const createServicio = async (servicio) => {
    try {
      const response = await createServicioRequest(servicio);

      if (response.status === 201) {
        loadServicios();
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateServicio = async (id, servicio) => {
    try {
      const response = await updateServicioRequest(id, servicio);

      if (response.status == 200) {
        loadServicios();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getServicioById = async (id_servicio) => {
    try {
      const response = await getServicioByIdRequest(id_servicio);

      if (response.status === 200) {
        return response.data;
      } else if (response.status === 404) {
        console.log("No se pudo obtener servicio");
        return null;
      } else {
        throw new Error("No se pudo obtener servicio");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteServicio = async (id) => {
    try {
      const response = await deleteServicioRequest(id);
      if (response.status == 200) {
      setServiciosAll(serviciosAll.filter((servicio) => servicio.id !== id));
    }}catch (error) {
      console.error(error);
    }
  };

  const createImagenesServicioEnbd = async (id_servicio, imagenes) => {
    try {
      const response = await createImagenesRequest(
        id_servicio,
        imagenes
      );

      if (response.status == 201) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function loadServicios() {
    try {
      const response = await getServiciosRequest();

      if (response.status === 200) {
        setServiciosAll(response.data);
      } else {
        throw new Error("No se pudo obtener la lista de servicios");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const loadServiciosUsuario = async (id_usuario) => {
    try {
      const response = await getServiciosByUsuarioIdRequest(id_usuario);

      if (response.status === 200) {
        setServiciosUsuario(response.data);
      } else if (response.status === 404) {
        console.log("La lista de servicios no existe");
        setServiciosUsuario([]);
      } else {
        throw new Error("No se pudo obtener la lista de servicios");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createServicioImage = async (imgServicio) => {
    try {
      const response = await createServicioImageRequest(imgServicio);

      if (response.status == 201) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getImgPortadaServicio = async (id_servicio) => {
    const response = await getServicioImagePortadaRequest(id_servicio);
    if (response.status == 200) {
      return response.data.url;
    } else {
      return null;
    }
  };

  const getAllImagesServicio = async (id_servicio) => {
    const response = await getAllImagesServicioRequest(id_servicio);
    if (response.status == 200) {
      return response.data;
    } else {
      return null;
    }
  };

    //Preguntas

    const crearPreguntaServicio = async (data) => {
      try {
        const response = await crearPreguntaServicioRequest(data);
        if (response.status == 201) {
          return response.data;
        } else {
          return null;
        }
      } catch (error) {
        console.error(error);
      }
    };

    const getPreguntasByIdServicio = async (data) => {
      try {
        const response = await getPreguntasByIdServicioRequest(data);
        console.log(response);
        if (response.status == 200) {
          return response.data;
        } else {
          return null;
        }
      } catch (error) {
        console.error(error);
      }
    };

    const getServiciosConPreguntasByUsuarioId = async (id_usuario) => {
      try {
        const response = await getServiciosConPreguntasByUsuarioIdRequest(
          id_usuario
        );
        console.log(response);
        if (response.status == 200) {
          setServiciosPreguntas(response.data);
          return response.data;
        } else {
          return null;
        }
      } catch (error) {
        console.error(error);
      }
    };

    const crearRespuestaServicio = async (id_usuario, id_pregunta, data) => {
      try {
        const response = await crearRespuestaServicioRequest(id_pregunta, data);
        console.log(response);
        if (response.status == 200) {
          await getServiciosConPreguntasByUsuarioId(id_usuario);
          return response.data;
        } else {
          return null;
        }
      } catch (error) {
        console.error(error);
      }
    };


    const eliminarPreguntaServicio = async (id_pregunta) => {
      try {
        const response = await eliminarPreguntaServicioRequest(id_pregunta);
        console.log(response);
        if (response.status == 200) {
          return response.data;
        } else {
          return null;
        }
      } catch (error) {
        console.error(error);
      }
    };

    /////////////////////////////////////////////////////////////////

  //Denuncias

  const crearDenunciaServicio = async (data) => {
    console.log("datos desde el provider", data);
    try {
      const response = await crearDenunciaServicioRequest(data);

      if (response.status == 201) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getDenunciasByIdServicio = async (data) => {
    try {
      const response = await getDenunciasByIdServicioRequest(data);
      console.log(response);
      if (response.status == 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getServiciosConDenunciasByUsuarioId = async (id_usuario) => {
    try {
      const response = await getServiciosConDenunciasByUsuarioIdRequest(
        id_usuario
      );
      console.log(response);
      if (response.status == 200) {
        setServiciosDenuncias(response.data);
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerTodasLasDenunciasServicios = async () => {
    try {
      const response = await getTodasLasDenunciasRequestServicio();

      if (response.status === 200) {
        setServiciosDenuncias(response.data);
      } else {
        throw new Error("No se logró obtener las denuncias");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const actualizarDenunciaRevisadaServicio = async (id_denuncia, data) => {
    console.log(id_denuncia + data);
    try {
      const response = await actualizarDenunciaARevisadaServicio(id_denuncia, data);

      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      } else {
        throw new Error("No se obtener las ordenes");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarDenunciaServicio = async (id_denuncia) => {
    try {
      const response = await eliminarDenunciaServicioRequest(id_denuncia);
      console.log(response);
      if (response.status == 200) {
        obtenerTodasLasDenunciasServicios(); /*Volver a cargar las denuncias */
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <ServicioContext.Provider
      value={{
        serviciosAll,
        serviciosUsuario,
        loadServicios,
        loadServiciosUsuario,
        getServicioById,
        deleteServicio,
        createServicio,
        updateServicio,
        createServicioImage,
        createImagenesServicioEnbd,
        getImgPortadaServicio,
        getAllImagesServicio,

        crearPreguntaServicio,
        getPreguntasByIdServicio,
        getServiciosConPreguntasByUsuarioId,
        crearRespuestaServicio,
        serviciosPreguntas,
        eliminarPreguntaServicio,

        crearDenunciaServicio,
        getDenunciasByIdServicio,
        serviciosDenuncias,
        getServiciosConDenunciasByUsuarioId,
        obtenerTodasLasDenunciasServicios,
        actualizarDenunciaRevisadaServicio,
        eliminarDenunciaServicio,

      }}
    >
      {children}
    </ServicioContext.Provider>
  );
};
