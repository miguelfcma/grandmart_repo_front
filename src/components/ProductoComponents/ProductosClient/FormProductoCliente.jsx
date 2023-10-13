import { useCategorias } from "../../CategoriaComponents/CategoriasContext/CategoriaProvider";
import { useState, useEffect } from "react";
import { useProductos } from "../ProductosContext/ProductoProvider";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, FormControl, Button, Alert } from "react-bootstrap";

import Swal from "sweetalert2";
export function FormProductoCliente() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { createProducto } = useProductos();
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    stock: "",
    descripcion: "",
    marca: "",
    modelo: "",
    color: "",
    estado: "",
    id_categoria: "",
    id_usuario: usuario.id,
  });
  const [validationErrors, setValidationErrors] = useState({});

  const { categorias, loadCategorias } = useCategorias();
  useEffect(() => {
    loadCategorias();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProducto((prevProducto) => ({
      ...prevProducto,
      [name]: value,
    }));
  };
  const validateForm = () => {
    const errors = {};

     // Validación del formato del precio
     if (formValues.precio.trim() === "") {
      errors.precio = "El precio es obligatorio";
    } else if (!/^\d+(\.\d{1,2})?$/.test(formValues.precio)) {
      errors.precio =
        "El formato del precio es incorrecto. Ejemplo: 10 o 10.99";
    }

    // Validación del stock
    if (isNaN(producto.stock) || producto.stock < 0) {
      errors.stock = "El stock debe ser un número positivo";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(producto);

    if (
      producto.nombre === "" ||
      producto.precio === "" ||
      producto.stock === "" ||
      producto.id_categoria === "" ||
      producto.estado === ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "Campos obligatorios",
        text: "Por favor complete todos los campos obligatorios",
      });
      return;
    }

    // Validación adicional del formulario
    if (!validateForm()) {
      return;
    }
    try {
      const response = await createProducto(producto);
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "El producto se creó correctamente",
        });
        const idProducto = response.data.producto.id;
        navigate(`/dashClient/productos/registro-producto/${idProducto}`);
      } else if (response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Este producto ya está registrado en su cuenta",
        });
      } else if (response.status === 500) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error en el servidor. Por favor, inténtelo de nuevo más tarde",
        });
      }
    } catch (error) {
      console.error("Error al crear el producto:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al crear el producto. Por favor, inténtelo de nuevo más tarde",
      });
    }
  };

  const handleIdParentChange = (event) => {
    const { value } = event.target;
    setProducto((prevProducto) => ({
      ...prevProducto,
      id_categoria: value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Form.Label>Nombre del producto:</Form.Label>
        <FormControl
          type="text"
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Form.Label>Precio del producto:</Form.Label>
        <FormControl
          type="number"
          name="precio"
          value={producto.precio}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Form.Label>Stock del producto:</Form.Label>
        <FormControl
          type="number"
          name="stock"
          value={producto.stock}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Form.Label>Descripción del producto (opcional):</Form.Label>
        <FormControl
          as="textarea"
          name="descripcion"
          value={producto.descripcion}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Form.Label>Marca del producto (opcional):</Form.Label>
        <FormControl
          type="text"
          name="marca"
          value={producto.marca}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Form.Label>Modelo del producto (opcional):</Form.Label>
        <FormControl
          type="text"
          name="modelo"
          value={producto.modelo}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Form.Label>Color del producto (opcional):</Form.Label>
        <FormControl
          type="text"
          name="color"
          value={producto.color}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Form.Label>Estado del producto:</Form.Label>
        <FormControl
          as="select"
          name="estado"
          value={producto.estado}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar el estado del producto</option>
          <option value="true">Nuevo</option>
          <option value="false">Usado</option>
        </FormControl>
      </FormGroup>

      <FormGroup>
        <Form.Label>Categoría del producto:</Form.Label>
        <FormControl
          as="select"
          name="id_categoria"
          value={producto.id_categoria}
          onChange={handleIdParentChange}
          required
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
                      categoria.id !== producto.id_categoria
                  )
                  .map((categoriaHija) => (
                    <option key={categoriaHija.id} value={categoriaHija.id}>
                      {categoriaHija.nombre}
                    </option>
                  ))}
              </optgroup>
            ))}
        </FormControl>
      </FormGroup>
      {validationErrors.stock && (
        <Alert variant="danger">{validationErrors.stock}</Alert>
      )}
      <Button type="submit">Agregar</Button>
    </Form>
  );
}
