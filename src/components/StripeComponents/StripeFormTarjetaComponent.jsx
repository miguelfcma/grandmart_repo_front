import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { API_BASE_URL } from "../../API/config.api";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useOrdenes } from "../OrdenesComponents/OrdenesContext/OrdenProvider";
import { useNavigate } from "react-router-dom";
const stripePromise = loadStripe(
  "pk_test_51N3lEpIscKwQt1dmlVjJUXzP6ApQbK3RYOHZriO7cvEh1vbqa10wFM9e6STqP8rQLSvsadawGUc5x38frY08WhTz0029zsqXy9"
);
import { Button, Container } from "react-bootstrap";
import axios from "axios";

import "./StripeFormTarjetaComponent.css";

import { AnimacionCargaComponent } from "../Animaciones/AnimacionCargaComponent";

const CheckoutForm = ({ detallesCarrito, carrito }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { crearOrden, verificacionDireccionEnvio } = useOrdenes();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = await verificacionDireccionEnvio(usuario.id);
    console.log(validation);

    if (validation === false) {
      alert("La dirección de envío no está verificada");
      navigate("/informacion-envio");
    } else if (carrito.detalles.length === 0) {
      alert("El carrito está vacío");
      navigate("/carrito-compras");
    } else {
      try {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
        });

        setLoading(true);

        if (!error) {
          const { id } = paymentMethod;
          const amountInCents = Math.round(detallesCarrito.total * 100);

          try {
            const orden = await crearOrden({
              id_card: id,
              amount: amountInCents,
              description: detallesCarrito.descripcion,
              id_usuario: usuario.id,
            });

     
            elements.getElement(CardElement).clear();
            navigate(`/final-compras/${orden.id}`); // Redirige a la página "/final-compras" con el ID de la orden en el URL
          } catch (error) {
            alert(
              "Ocurrió un error al procesar el pago. Por favor, verifica los datos de tu tarjeta e intenta nuevamente."
            );
            console.log("Error al crear la orden:", error);
          }

          setTimeout(() => {
            setLoading(false);
          }, 1000);
        } else {
          throw new Error(error.message);
        }
      } catch (error) {
        console.log("Error al crear el pago:", error.message);
        alert(
          "Ocurrió un error al procesar el pago. Por favor, verifica los datos de tu tarjeta e intenta nuevamente."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body formulario-compra">
      <Container className="contenedor-descripcion-compra">
        <h5 className="descripcion-compra">{detallesCarrito.descripcion}</h5>
        <h6 className="detalle-total-pago">
          Total: ${detallesCarrito.total} MXN
        </h6>
      </Container>
      <div className="form-group">
        <label htmlFor="card-element" className="label-tarjeta">
          Tarjeta de crédito o débito
        </label>
        <CardElement className="form-control input-tarjeta" />
      </div>
      <div className="botones-resumen-compras-actions">
        <button disabled={!stripe} className="btn btn-success boton-comprar">
          {loading ? (
            <>
              <AnimacionCargaComponent />
            </>
          ) : (
            "Comprar"
          )}
        </button>
      </div>
    </form>
  );
};

export function StripeFormTarjetaComponent({ detallesCarrito, carrito }) {
  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="row-div">
          <div className="col-md-12">
            <CheckoutForm detallesCarrito={detallesCarrito} carrito={carrito} />
          </div>
        </div>
      </div>
    </Elements>
  );
}
