import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useCategorias } from "../../CategoriaComponents/CategoriasContext/CategoriaProvider";
import { useProductos } from "../ProductosContext/ProductoProvider";

import Swal from "sweetalert2";

export function FormUpdateProductoCliente({ onSubmit, producto }) {
  const { updateProductoCliente } = useProductos();
  const { categorias, loadCategorias } = useCategorias();
  const [categoriaActual, setCategoriaActual] = useState("");

  useEffect(() => {
    const fetchCategorias = async () => {
      await loadCategorias();
    };

    fetchCategorias();
  }, []);

  useEffect(() => {
    const categoriaEncontrada = categorias.find(
      (categoria) => categoria.id === producto.id_categoria
    );

    setCategoriaActual({ ...categoriaEncontrada });
  }, [producto.id_categoria, categorias]);

  const [formValues, setFormValues] = useState({
    nombre: producto.nombre,
    precio: producto.precio,
    stock: producto.stock,
    descripcion: producto.descripcion,
    marca: producto.marca,
    modelo: producto.modelo,
    color: producto.color,
    estado: producto.estado,
    id_categoria: producto.id_categoria,
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const { isConfirmed } = await Swal.fire({
          icon: "question",
          title: "Confirmar actualización",
          text: "¿Estás seguro de que deseas actualizar el producto?",
          showCancelButton: true,
          confirmButtonText: "Sí, actualizar",
          cancelButtonText: "Cancelar",
        });

        if (isConfirmed) {
          const status = await updateProductoCliente(producto.id, formValues);

          if (status === 200) {
            Swal.fire({
              icon: "success",
              title: "Éxito",
              text: "El producto se ha actualizado correctamente",
            });
          } else if (status === 404) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "El producto no se encontró o no existe",
            });
          } else if (status === 500) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Hubo un error en el servidor",
            });
          }

          onSubmit();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleIdParentChange = (event) => {
    const { value } = event.target;
    if (value === "") {
      // No se seleccionó ninguna categoría nueva, se mantiene la categoría actual
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        id_categoria: categoriaActual.id,
      }));
    } else {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        id_categoria: value,
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validación del nombre
    if (formValues.nombre === "") {
      errors.nombre = "El nombre es obligatorio";
    }

    // Validación del formato del precio
    if (!/^\d+(\.\d{1,2})?$/.test(formValues.precio)) {
      errors.precio =
        "El formato del precio es incorrecto. Ejemplo: 10 o 10.99";
    }

    // Validación del stock
    if (isNaN(formValues.stock) || formValues.stock < 0) {
      errors.stock = "El stock debe ser un número positivo";
    }

    // Validación del estado
    if (formValues.estado === "") {
      errors.estado = "El estado es obligatorio";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="nombre">
        <Form.Label>Nombre:</Form.Label>
        <Form.Control
          type="text"
          name="nombre"
          value={formValues.nombre}
          onChange={handleInputChange}
          isInvalid={validationErrors.nombre}
        />
        {validationErrors.nombre && (
          <Alert variant="danger">{validationErrors.nombre}</Alert>
        )}
      </Form.Group>

      <Form.Group controlId="precio">
        <Form.Label>Precio:</Form.Label>
        <Form.Control
          type="number"
          name="precio"
          value={formValues.precio}
          onChange={handleInputChange}
          isInvalid={validationErrors.precio}
        />
        {validationErrors.precio && (
          <Alert variant="danger">{validationErrors.precio}</Alert>
        )}
      </Form.Group>

      <Form.Group controlId="stock">
        <Form.Label>Stock:</Form.Label>
        <Form.Control
          type="number"
          name="stock"
          value={formValues.stock}
          onChange={handleInputChange}
          isInvalid={validationErrors.stock}
        />
        {validationErrors.stock && (
          <Alert variant="danger">{validationErrors.stock}</Alert>
        )}
      </Form.Group>

      <Form.Group controlId="descripcion">
        <Form.Label>Descripción:</Form.Label>
        <Form.Control
          as="textarea"
          name="descripcion"
          value={formValues.descripcion}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="marca">
        <Form.Label>Marca:</Form.Label>
        <Form.Control
          type="text"
          name="marca"
          value={formValues.marca}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="modelo">
        <Form.Label>Modelo:</Form.Label>
        <Form.Control
          type="text"
          name="modelo"
          value={formValues.modelo}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="color">
        <Form.Label>Color:</Form.Label>
        <Form.Control
          type="text"
          name="color"
          value={formValues.color}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="estado">
        <Form.Label>Estado:</Form.Label>
        <Form.Control
          as="select"
          name="estado"
          value={formValues.estado}
          onChange={handleInputChange}
          isInvalid={validationErrors.estado}
        >
          <option value="">Seleccione una opción</option>
          <option value="true" selected={true === formValues.estado}>
            Nuevo
          </option>
          <option value="false" selected={false === formValues.estado}>
            Usado
          </option>
        </Form.Control>
        {validationErrors.estado && (
          <Alert variant="danger">{validationErrors.estado}</Alert>
        )}
      </Form.Group>

      <Form.Group controlId="id_categoria">
        <Form.Label>Categoría del producto:</Form.Label>
        <Form.Text>
          La categoría actual del producto es:
          <strong> {categoriaActual.nombre}</strong>
        </Form.Text>

        <Form.Control
          as="select"
          name="id_categoria"
          value={formValues.id_categoria}
          onChange={handleIdParentChange}
        >
          <option value="">Seleccionar categoría padre</option>
          {categorias
            .filter((categoria) => categoria.id_parent === null)
            .map((categoriaPadre) => (
              <optgroup
                className="categoria-padre"
                label={categoriaPadre.nombre}
                key={categoriaPadre.id}
              >
                {categorias
                  .filter(
                    (categoria) =>
                      categoria.id_parent === categoriaPadre.id &&
                      categoria.id !== formValues.id_categoria
                  )
                  .map((categoriaHija) => (
                    <option
                      key={categoriaHija.id}
                      value={categoriaHija.id}
                      label={categoriaHija.nombre}
                      defaultValue={
                        categoriaHija.id === formValues.id_categoria
                      }
                    >
                      {categoriaHija.nombre}
                    </option>
                  ))}
              </optgroup>
            ))}
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit">
        Actualizar producto
      </Button>
    </Form>
  );
}
