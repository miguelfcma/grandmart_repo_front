import React from 'react';

export function CardProductoOpcionesGeneral() {
  return (
    <div className="product-card">
      <img src="imagen-del-producto.jpg" alt="Producto" />
      <h2 className="product-title">Nombre del Producto</h2>
      <p className="product-description">Descripción del producto</p>
      <p className="product-price">Precio: $XX.XX</p>
      <div className="product-options">
        <button className="btn-buy-now">Compra Ahora</button>
        <button className="btn-add-to-cart">Agregar al Carrito</button>
        <button className="btn-add-to-favorites">Agregar a Favoritos</button>
      </div>
    </div>
  );
}
