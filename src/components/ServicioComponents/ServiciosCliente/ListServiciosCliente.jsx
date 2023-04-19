import { useEffect } from "react";
import { CardServicioCliente } from "./CardServicioCliente";
import { useServicios } from "../ServiciosContext/ServicioProvider";

export function ListServiciosCliente() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { serviciosUsuario, loadServiciosUsuario } = useServicios();

  useEffect(() => {
    async function fetchData() {
      try {
        await loadServiciosUsuario(usuario.id);
      } catch (error) {
        console.log("Error al cargar los servicios:", error);
      }
    }
    fetchData();
  }, []);

  function renderMain() {
    if (serviciosUsuario.length === 0) {
      return <h1>No hay servicios registrados</h1>;
    } else {
      return serviciosUsuario.map((servicio) => (
        <CardServicioCliente key={servicio.id} servicio={servicio} />
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
