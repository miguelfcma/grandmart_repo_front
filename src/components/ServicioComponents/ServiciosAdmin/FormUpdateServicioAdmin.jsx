import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useCategorias } from "../../CategoriaComponents/CategoriasContext/CategoriaProvider";
import { useServicios } from "../ServiciosContext/ServicioProvider";
import Swal from "sweetalert2";

// Componente de formulario para actualizar información de servicio administrativo
export function FormUpdateServicioAdmin({ onSubmit, servicio }) {
  // Obtenemos la función para actualizar un servicio
  const { updateServicio } = useServicios();

  // Obtenemos las categorías y la función para cargarlas
  const { categorias, loadCategorias } = useCategorias();

  // Estado local para almacenar la categoría actual
  const [categoriaActual, setCategoriaActual] = useState("");

  // Efecto para cargar las categorías
  useEffect(() => {
    const fetchCategorias = async () => {
      await loadCategorias();
    };
    fetchCategorias();
  }, []);

  // Efecto para establecer la categoría actual del servicio
  useEffect(() => {
    const categoriaEncontrada = categorías.find(
      (categoria) => categoria.id === servicio.id_categoria
    );
    setCategoriaActual({ ...categoriaEncontrada });
  }, [servicio.id_categoria, categorias]);

  // Estado local para el formulario
  const [formValues, setFormValues] = useState({
    titulo: servicio.titulo,
    descripcion: servicio.descripcion,
    precio: servicio.precio,
    id_categoria: servicio.id_categoria,
  });

  // Estado local para mensajes de error
  const [validationErrors, setValidationErrors] = useState({});

  // Maneja cambios en los campos del formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Maneja la presentación del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Valida el formulario
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        // Muestra una confirmación antes de la actualización
        const { isConfirmed } = await Swal.fire({
          title: "Confirmar actualización",
          text: "¿Estás seguro de que deseas actualizar el servicio?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Sí, actualizar",
          cancelButtonText: "Cancelar",
        });

        // Si se confirma la actualización, realiza la solicitud
        if (isConfirmed) {
          const status = await updateServicio(servicio.id, formValues);

          if (status === 200) {
            // Muestra un mensaje de éxito
            Swal.fire({
              icon: "success",
              title: "Éxito",
              text: "El servicio se ha actualizado correctamente",
            });
          } else if (status === 404) {
            // Muestra un mensaje de error si no se encuentra el servicio
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se encontró el servicio",
            });
          } else if (status === 500) {
            // Muestra un mensaje de error si hay un error en el servidor
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
    } else {
      setValidationErrors(errors);
    }
  };

  // Maneja cambios en la categoría del servicio
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

  // Función para validar el formulario
  const validateForm = () => {
    const errors = {};

    // Validación del título
    if (formValues.titulo.trim() === "") {
      errors.titulo = "El título es obligatorio";
    }

    // Validación del formato del precio
    if (formValues.precio.trim() === "") {
      errors.precio = "El precio es obligatorio";
    } else if (!/^\d+(\.\d{1,2})?$/.test(formValues.precio)) {
      errors.precio =
        "El formato del precio es incorrecto. Ejemplo: 10 o 10.99";
    }

    setValidationErrors(errors);
    return errors;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="titulo">
        <Form.Label>Título:</Form.Label>
        <Form.Control
          type="text"
          name="titulo"
          value={formValues.titulo}
          onChange={handleInputChange}
          isInvalid={validationErrors.titulo}
        />
        {validationErrors.titulo && (
          <Alert variant="danger">{validationErrors.titulo}</Alert>
        )}
      </Form.Group>

      <Form.Group controlId="descripcion">
        <Form.Label>Descripción (opcional):</Form.Label>
        <Form.Control
          as="textarea"
          name="descripcion"
          value={formValues.descripcion}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="precio">
        <Form.Label>Precio:</Form.Label>
        <Form.Control
          type="text"
          name="precio"
          pattern="^\d+(\.\d{1,2})?$"
          title="Ingrese un número no negativo con hasta dos decimales"
          min="0"
          value={formValues.precio}
          onChange={handleInputChange}
          isInvalid={validationErrors.precio}
        />
        {validationErrors.precio && (
          <Alert variant="danger">{validationErrors.precio}</Alert>
        )}
      </Form.Group>

      <Form.Group controlId="id_categoria">
        <Form.Label>Categoría del servicio:</Form.Label>
        <Form.Text>
          La categoría actual del servicio es:
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
                      selected={categoriaHija.id === formValues.id_categoria}
                    >
                      {categoriaHija.nombre}
                    </option>
                  ))}
              </optgroup>
            ))}
        </Form.Control>
      </Form.Group>

      <Button type="submit">Actualizar servicio</Button>
    </Form>
  );
}
