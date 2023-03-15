import React, { useState, useEffect } from "react";
import { createProductoRequest } from "../../API/productos.api";
import "./FormProducto.css";
import { useProductos } from "./ProductosContext/ProductoProvider";

export function FormProducto ({ onSubmit, initialProducto = null }) {
  const { createProducto, updateProducto } = useProductos();

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (initialProducto !== null) {
      setNombre(initialProducto.nombre);
      setPrecio(initialProducto.precio);
      setStock(initialProducto.stock);
      setDescripcion(initialProducto.descripcion);
      setMarca(initialProducto.marca);
      setModelo(initialProducto.modelo);
      setColor(initialProducto.color);
    }
  }, [initialProducto]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      nombre: nombre,
      precio: precio,
      stock: stock,
      descripcion: descripcion,
      marca: marca,
      modelo: modelo,
      color: color,
    };

    try {
      let status;

      if (initialProducto === null) {
        status = await createProducto(formData);
      } else {
        status = await updateProducto(initialProducto.id, formData);
      }

      if (status === true) {
        setNombre("");
        setPrecio("");
        setStock("");
        setDescripcion("");
        setMarca("");
        setModelo("");
        setColor("");
        onSubmit();
      } else {
        window.alert(
          "Ha ocurrido un error al procesar la solicitud. Inténtelo de nuevo más tarde."
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">
          Nombre:
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            required
          />
        </label>
        <br />
        <label htmlFor="precio">
          Precio:
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={(event) => setPrecio(event.target.value)}
            required
          />
        </label>
        <br />
        <label htmlFor="stock">
          Stock:
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(event) => setStock(event.target.value)}
            required
          />
        </label>
        <br />
        <label htmlFor="descripcion">
          Descripción:
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(event) => setDescripcion(event.target.value)}
            required
          />
        </label>
        <br />
        <label htmlFor="marca">
          Marca:
          <input
            type="text"
            id="marca"
            value={marca}
            onChange={(event) => setMarca(event.target.value)}
            required
          />
        </label>
        <br />
        <label htmlFor="modelo">
          Modelo:
          <input
            type="text"
            id="modelo"
            value={modelo}
            onChange={(event) => setModelo(event.target.value)}
            required
          />
        </label>
        <br />
        <label htmlFor="precio">
          Precio:
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={(event) => setPrecio(event.target.value)}
            required
            min="0"
          />
        </label>
        <br />
        <label htmlFor="stock">
          Stock:
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(event) => setStock(event.target.value)}
            required
            min="0"
          />
        </label>
        <br />
        <label htmlFor="descripcion">
          Descripción:
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(event) => setDescripcion(event.target.value)}
            required
          ></textarea>
        </label>
        <br />
        <label htmlFor="marca">
          Marca:
          <input
            type="text"
            id="marca"
            value={marca}
            onChange={(event) => setMarca(event.target.value)}
            required
          />
        </label>
        <br />
        <label htmlFor="modelo">
          Modelo:
          <input
            type="text"
            id="modelo"
            value={modelo}
            onChange={(event) => setModelo(event.target.value)}
            required
          />
        </label>
        <br />
        <label htmlFor="color">
          Color:
          <input
            type="text"
            id="color"
            value={color}
            onChange={(event) => setColor(event.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
};