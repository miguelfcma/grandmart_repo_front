import { useState } from 'react';
import { FormNuevoServicioCliente } from './FormularioServicioCompletoCliente/FormNuevoServicioCliente';
import { FormImgServicioCliente } from './FormularioServicioCompletoCliente/FormImgServicioCliente';

export default function FormCompletoServicioCliente() {
  const [datosServicioRegistrados, setDatosServicioRegistrados] = useState(false);
  const [idServicio, setIdServicio] = useState(null);

  const handleServicioRegistrado = (idServicio) => {
    
    setIdServicio(idServicio);
    setDatosServicioRegistrados(true);
  }

  return (
    <div>
      {!datosServicioRegistrados ? (
        <FormNuevoServicioCliente handleServicioRegistrado={handleServicioRegistrado} />
      ) : (
        <FormImgServicioCliente idServicio={idServicio} />
      )}
    </div>
  );
}
