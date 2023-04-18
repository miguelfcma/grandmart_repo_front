import { useProductos } from "../ProductoComponents/ProductosContext/ProductoProvider";
import "../HomePageComponents/NavBar.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function Carrito() {
  const {
    carrito,
    obtenerCarritoDeCompras,
    actualizarCantidadProductoEnCarrito,
    eliminarProductoDelCarrito,
    vaciarCarrito,

   
  } = useProductos();
  
  useEffect(() => {
    obtenerCarritoDeCompras();
  }, []);




  return (
    <div className="cart-icon-container">
    
    </div>
  );
}
