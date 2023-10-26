import { useCategorias } from "../../CategoriaComponents/CategoriasContext/CategoriaProvider";
import { useState, useEffect } from "react";
import { useProductos } from "../ProductosContext/ProductoProvider";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, FormControl, Button, Alert } from "react-bootstrap";
import Swal from "sweetalert2";

// Componente de formulario para crear productos administrativos
export function FormProductoAdmin() {
  const navigate = useNavigate(); // Proporciona la función de navegación
  const usuario = JSON.parse(localStorage.getItem("usuario")); // Obtiene información del usuario actual desde el almacenamiento local
  const { createProducto } = useProductos(); // Utiliza el contexto de productos para crear un producto
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
    id_usuario: usuario.id, // Asigna el ID del usuario actual al producto
  });
  const [validationErrors, setValidationErrors] = useState({});

  const { categorias, loadCategorias } = useCategorias(); // Utiliza el contexto de categorías para cargar categorías disponibles
  useEffect(() => {
    loadCategorias(); // Carga las categorías al montar el componente
  }, []);

  // Maneja los cambios en los campos del formulario
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProducto((prevProducto) => ({
      ...prevProducto,
      [name]: value,
    }));
  };

  // Maneja el envío del formulario para crear un producto
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(producto);

    try {
      const response = await createProducto(producto); // Intenta crear el producto utilizando el contexto de productos
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "El producto se creó correctamente",
        });
        const idProducto = response.data.producto.id;
        navigate(`/dashAdmin/productos/registro-producto/${idProducto}`); // Navega a la página de registro del nuevo producto
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

  // Maneja los cambios en la selección de categoría
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
          type="text"
          name="precio"
          pattern="^\d+(\.\d+)?$"
          title="Ingrese un número no negativo con hasta dos decimales"
          min="0"
          value={producto.precio}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Form.Label>Stock del producto:</Form.Label>
        <FormControl
          type="text"
          name="stock"
          value={producto.stock}
          title="Ingrese un número entero mayor a cero"
          onChange={handleChange}
          required
          pattern="[0-9]*"
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
