import React, { useState } from "react";
import { FormNuevoServicioAdmin } from "./FormularioServicioCompletoAdmin/FormNuevoServicioAdmin";
import { FormImgServicioAdmin } from "./FormularioServicioCompletoAdmin/FormImgServicioAdmin";
import { FormInformacionServicioAdmin } from "./FormularioServicioCompletoAdmin/FormInformacionServicioAdmin";

export default function FormCompletoServicioAdmin() {
  const [datosServicioRegistrados, setDatosServicioRegistrados] =
    useState(false);
  const [infoServicioRegistrados, setInfoServicioRegistrados] = useState(false);
  const [idServicio, setIdServicio] = useState(null);

  const handleServicioRegistrado = (idServicio) => {
    setIdServicio(idServicio);
    setDatosServicioRegistrados(true);
  };

  const handleInfoServicioRegistrados = () => {
    setInfoServicioRegistrados(true);
  };

  return (
    <div>
      {!datosServicioRegistrados ? (
        <FormNuevoServicioAdmin handleServicioRegistrado={handleServicioRegistrado} />
      ) : (
        <>
          {!infoServicioRegistrados ? (
            <FormInformacionServicioAdmin handleInfoServicioRegistrados={handleInfoServicioRegistrados} idServicio={idServicio} />
          ) : (
            <FormImgServicioAdmin idServicio={idServicio} />
          )}
        </>
      )}
    </div>
  );
}
