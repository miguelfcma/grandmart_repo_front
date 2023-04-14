import { useState } from 'react';
import { FormNuevoServicioAdmin } from './FormularioServicioCompletoAdmin/FormNuevoServicioAdmin';
import { FormImgServicioCliente } from './FormularioServicioCompletoAdmin/FormImagesServicioAdmin';

export default function FormCompletoServicioAdmin() {
  const [datosServicioRegistrados, setDatosServicioRegistrados] = useState(false);
  const [idServicio, setIdServicio] = useState(null);

  const handleServicioRegistrado = (idServicio) => {
    
    setIdServicio(idServicio);
    setDatosServicioRegistrados(true);
  }

  return (
    <div>
      {!datosServicioRegistrados ? (
        <FormNuevoServicioAdmin handleServicioRegistrado={handleServicioRegistrado} />
      ) : (
        <FormImgServicioCliente idServicio={idServicio} />
      )}
    </div>
  );
}
