import { useEffect } from "react";
import { CardServicioAdmin } from "./CardServicioAdmin";
import { useServicios } from "../ServiciosContext/ServicioProvider";

export function ListServiciosAdmin() {
  const { serviciosAll, loadServicios} = useServicios();

  useEffect(() => {
    loadServicios();
  }, []);

  function renderMain() {
    if (serviciosAll.length === 0) {
      return <h1>No hay servicios registrados</h1>;
    } else {
      return serviciosAll.map((servicio) => (
        <CardServicioAdmin key={servicio.id} servicio={servicio} />
      ));
    }
  }

  return (
    <>
      <h2 className="titulo">Lista de servicios:</h2>
      <div className="list-productos">{renderMain()}</div>
    </>
  );
}
