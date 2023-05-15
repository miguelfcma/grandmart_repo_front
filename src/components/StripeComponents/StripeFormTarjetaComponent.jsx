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

const stripePromise = loadStripe(
  "pk_test_51N3lEpIscKwQt1dmlVjJUXzP6ApQbK3RYOHZriO7cvEh1vbqa10wFM9e6STqP8rQLSvsadawGUc5x38frY08WhTz0029zsqXy9"
);

import axios from "axios";

import "./StripeFormTarjetaComponent.css";

import { AnimacionCargaComponent } from "../Animaciones/AnimacionCargaComponent";

const CheckoutForm = ({ detallesCarrito }) => {
  const stripe = useStripe();
  const elements = useElements();

  const { crearOrden } = useOrdenes();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orden = await crearOrden({ id_usuario: usuario.id });

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      setLoading(true);
      if (!error) {
        console.log(paymentMethod);
        const { id } = paymentMethod;
        const amountInCents = Math.round(detallesCarrito.total * 100); // Convertir el total a centavos
        try {
          const { data } = await axios.post(API_BASE_URL + `stripe/pagos`, {
            id,
            amount: amountInCents,
            description: detallesCarrito.descripcion,
            id_usuario: usuario.id,
            id_orden: orden.id,
          });
          console.log(data);
          elements.getElement(CardElement).clear();
        } catch (error) {
          console.log(error);
        }
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(!stripe || loading);

  return (
    <form onSubmit={handleSubmit} className="card card-body">
      <h5>{detallesCarrito.descripcion}</h5>
      <h6>Total: ${detallesCarrito.total} MXN</h6>
      <div className="form-group">
        <CardElement className="form-control" />
      </div>
      <button disabled={!stripe} className="btn btn-success">
        {loading ? (
          <>
            <AnimacionCargaComponent />
          </>
        ) : (
          "Comprar"
        )}
      </button>
    </form>
  );
};

export function StripeFormTarjetaComponent({ detallesCarrito }) {
  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="row-div">
          <div className="col-md-12">
            <CheckoutForm detallesCarrito={detallesCarrito} />
          </div>
        </div>
      </div>
    </Elements>
  );
}
