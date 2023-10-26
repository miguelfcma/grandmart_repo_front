import React, { useState } from "react";
import { FormNuevoServicioAdmin } from "./FormularioServicioCompletoAdmin/FormNuevoServicioAdmin";
import { FormImgServicioAdmin } from "./FormularioServicioCompletoAdmin/FormImgServicioAdmin";
import { FormInformacionServicioAdmin } from "./FormularioServicioCompletoAdmin/FormInformacionServicioAdmin";

export default function FormCompletoServicioAdmin() {
  const [datosServicioRegistrados, setDatosServicioRegistrados] =
    useState(false);
  const [infoServicioRegistrados, setInfoServicioRegistrados] = useState(false);
  const [idServicio, setIdServicio] = useState(null);

  // Función para manejar el evento de servicio registrado
  const handleServicioRegistrado = (idServicio) => {
    setIdServicio(idServicio);
    setDatosServicioRegistrados(true);
  };

  // Función para manejar el evento de información del servicio registrada
  const handleInfoServicioRegistrados = () => {
    setInfoServicioRegistrados(true);
  };

  return (
    <div>
      {!datosServicioRegistrados ? (
        // Muestra el formulario de nuevo servicio si los datos del servicio no están registrados
        <FormNuevoServicioAdmin
          handleServicioRegistrado={handleServicioRegistrado}
        />
      ) : (
        <>
          {!infoServicioRegistrados ? (
            // Muestra el formulario de información del servicio si los datos del servicio están registrados
            <FormInformacionServicioAdmin
              handleInfoServicioRegistrados={handleInfoServicioRegistrados}
              idServicio={idServicio}
            />
          ) : (
            // Muestra el formulario de imágenes del servicio si la información del servicio está registrada
            <FormImgServicioAdmin idServicio={idServicio} />
          )}
        </>
      )}
    </div>
  );
}
