import { useState } from "react";
import { FormNuevoServicioCliente } from "./FormularioServicioCompletoCliente/FormNuevoServicioCliente";
import { FormImgServicioCliente } from "./FormularioServicioCompletoCliente/FormImgServicioCliente";
import { FormInformacionServicioCliente } from "./FormularioServicioCompletoCliente/FormInformacionServicioCliente";

// Componente para el formulario completo de un servicio por parte del cliente
export default function FormCompletoServicioCliente() {
  // Estado para rastrear si los datos del servicio han sido registrados
  const [datosServicioRegistrados, setDatosServicioRegistrados] =
    useState(false);
  // Estado para rastrear si la información del servicio ha sido registrada
  const [infoServicioRegistrados, setInfoServicioRegistrados] = useState(false);
  // Estado para almacenar el ID del servicio registrado
  const [idServicio, setIdServicio] = useState(null);

  // Maneja el evento de registro del servicio
  const handleServicioRegistrado = (idServicio) => {
    setIdServicio(idServicio);
    setDatosServicioRegistrados(true);
  };

  // Maneja el evento de registro de la información del servicio
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
