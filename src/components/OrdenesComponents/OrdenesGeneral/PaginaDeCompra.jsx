import { StripeFormTarjetaComponent } from "../../StripeComponents/StripeFormTarjetaComponent";
import { DetalleDeProductos } from "./DetalleDeProductos";
import { DetalleDeEnvio } from "./DetalleDeEnvio";
import { Button } from "react-bootstrap";
import "./PaginaDeCompra.css";
import { Link, useNavigate } from "react-router-dom";
import { useOrdenes } from "../OrdenesContext/OrdenProvider";
import { useProductos } from "../../ProductoComponents/ProductosContext/ProductoProvider";
import { useEffect } from "react";


export function PaginaDeCompra() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { verificacionDireccionEnvio } = useOrdenes();
  const { carrito, obtenerCarritoDeCompras } =
  useProductos();

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
  const procederConPago = async () => {
    const validation = await verificacionDireccionEnvio(usuario.id);
    console.log(validation);
    if (validation == false ) {
      navigate("/informacion-envio");
    }else if(carrito.detalles.length === 0){
      alert("carrito vacio")
    } 
    else {
      navigate("/qwqwqwqw");
    }
  };

  return (
    <div>
      <h1 className="titulo-resumen-compras">Detalles de mi compra</h1>

      <DetalleDeProductos />
      <DetalleDeEnvio />
      {/* <StripeFormTarjetaComponent /> */}

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
        <Button
          className="btn-pagar-final"
          variant="success"
          onClick={procederConPago}
        >
          Proceder al pago
        </Button>
      </div>
    </div>
  );
}
