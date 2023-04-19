import { useState } from 'react';
import { FormNuevoServicioAdmin } from './FormularioServicioCompletoAdmin/FormNuevoServicioAdmin';
import { FormImgServicioAdmin } from './FormularioServicioCompletoAdmin/FormImgServicioAdmin';

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
        <FormImgServicioAdmin idServicio={idServicio} />
      )}
    </div>
  );
}
