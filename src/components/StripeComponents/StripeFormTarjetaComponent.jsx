import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51N3lEpIscKwQt1dmlVjJUXzP6ApQbK3RYOHZriO7cvEh1vbqa10wFM9e6STqP8rQLSvsadawGUc5x38frY08WhTz0029zsqXy9"
);

import axios from "axios";
import "./StripeFormTarjetaComponent.css";
import { AnimacionCargaComponent } from "../Animaciones/AnimacionCargaComponent";
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    setLoading(true);
    if (!error) {
      console.log(paymentMethod);
      const { id } = paymentMethod;

      try {
        /*
          const { data } = await axios.post(
            "http://localhost:3001/api/checkout",
            {
              id,
              amount: 10000, //cents
            }
          );
          console.log(data);
          elements.getElement(CardElement).clear();
          */
      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  };
  console.log(!stripe || loading);
  return (
    <form onSubmit={handleSubmit} className="card card-body">
      <div className="form-group">
        <CardElement className="form-control" />
      </div>
      <button disabled={!stripe} className="btn btn-success">
        {loading ? (
          <>
            <AnimacionCargaComponent />
          </>
        ) : (
          "Buy"
        )}
      </button>
    </form>
  );
};

export function StripeFormTarjetaComponent() {
  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="row-div">
          <div className="col-md-12">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}
