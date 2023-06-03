import { StripeFormTarjetaComponent } from "../../StripeComponents/StripeFormTarjetaComponent";
import { DetalleDeProductos } from "./DetalleDeProductos";
import { DetalleDeEnvio } from "./DetalleDeEnvio";
import { Button } from "react-bootstrap";
import "./PaginaDeCompra.css";
import { Link, useNavigate } from "react-router-dom";
import { useOrdenes } from "../OrdenesContext/OrdenProvider";
import { useProductos } from "../../ProductoComponents/ProductosContext/ProductoProvider";
import { useEffect,useState } from "react";

export function PaginaDeCompra() {

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const { carrito, obtenerCarritoDeCompras } = useProductos();

  useEffect(() => {
    const fetchData = async (userId) => {
      try {
        await obtenerCarritoDeCompras(userId);
      } catch (error) {
        console.error(error);
      }
    };

    if (usuario && usuario.id) {
      fetchData(usuario.id);
    }
  }, []);
  
  const [detallesCarrito, setDetallesCarrito] = useState({
    descripcion: "",
    total: ""
  });
  
  // Función para recibir los detalles del carrito desde el componente hijo
  const recibirDetallesCarrito = (detalles) => {
    setDetallesCarrito(detalles);

  };
  
  return (
    <div>
      <h1 className="titulo-resumen-compras">Detalles de mi compra</h1>

      <DetalleDeProductos enviarDetallesCarrito={recibirDetallesCarrito} />

      <DetalleDeEnvio />
      <StripeFormTarjetaComponent detallesCarrito={detallesCarrito} carrito={carrito}/>
      <div className="botones-resumen-compras-actions">
        <Link
          to={`/`}
          style={{ textDecoration: "none" }}
          title={"Clic para ver más información del producto"}
        >
          <Button variant="primary" className="btn-continuar-comprando">
            Continuar comprando
          </Button>
        </Link>
       
      </div>
    </div>
  );
}
