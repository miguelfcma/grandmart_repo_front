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
import Swal from "sweetalert2";
import "./StripeFormTarjetaComponent.css";

import { AnimacionCargaComponent } from "../Animaciones/AnimacionCargaComponent";
// Componente que representa el formulario de pago con tarjeta.
const CheckoutForm = ({ detallesCarrito, carrito }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { crearOrden, verificacionDireccionEnvio } = useOrdenes();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [loading, setLoading] = useState(false);

  // Maneja la creación y procesamiento del pago.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica si el usuario tiene una dirección de envío registrada.
    const status = await verificacionDireccionEnvio(usuario.id);

    if (status === 400) {
      Swal.fire({
        icon: "error",
        text: "El usuario no tiene una dirección de envío registrada",
      });
      navigate("/informacion-envio");
    } else if (carrito.detalles.length === 0) {
      Swal.fire({
        icon: "error",
        text: "El usuario no tiene un carrito de compra",
      });
      navigate("/carrito-compras");
    } else {
      try {
        // Crea el método de pago y procesa la orden.
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
        });

        setLoading(true);

        if (!error) {
          const { id } = paymentMethod;
          const amountInCents = Math.round(detallesCarrito.total * 100);

          try {
            const response = await crearOrden({
              id_card: id,
              amount: amountInCents,
              description: detallesCarrito.descripcion,
              id_usuario: usuario.id,
            });
            console.log(response);
            if (response.status === 201) {
              elements.getElement(CardElement).clear();
              Swal.fire({
                icon: "success",
                text: "¡La orden se ha creado exitosamente!",
              }).then(() => {
                navigate(`/final-compras/${response.data.nuevaOrden.id}`);
              });
            } else if (response.status === 400) {
              Swal.fire({
                icon: "error",
                text: response.data.message,
              });
            } else if (response.status === 500) {
              Swal.fire({
                icon: "error",
                text: "Ha ocurrido un error en el servidor",
              });
            }
          } catch (error) {
            console.log("Error al crear la orden:2", error);
          }

          setTimeout(() => {
            setLoading(false);
          }, 1000);
        } else {
          throw new Error(error.message);
        }
      } catch (error) {
        console.log("Error al crear el pago 1:", error.message);
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
          Total: $ {detallesCarrito.total} MXN
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

// Componente que envuelve el formulario de pago con tarjeta y carga el contexto de Stripe.
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
