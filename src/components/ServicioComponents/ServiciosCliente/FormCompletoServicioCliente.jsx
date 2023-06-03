import { useState } from "react";
import { FormNuevoServicioCliente } from "./FormularioServicioCompletoCliente/FormNuevoServicioCliente";
import { FormImgServicioCliente } from "./FormularioServicioCompletoCliente/FormImgServicioCliente";
import { FormInformacionServicioCliente } from "./FormularioServicioCompletoCliente/FormInformacionServicioCliente";

export default function FormCompletoServicioCliente() {
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
        <FormNuevoServicioCliente
          handleServicioRegistrado={handleServicioRegistrado}
        />
      ) : (
        <>
          {!infoServicioRegistrados ? (
            <FormInformacionServicioCliente
              handleInfoServicioRegistrados={handleInfoServicioRegistrados}
              idServicio={idServicio}
            />
          ) : (
            <FormImgServicioCliente idServicio={idServicio} />
          )}
        </>
      )}
    </div>
  );
}
