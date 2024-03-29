// Este archivo representa un formulario para crear o actualizar categorias

import { useState } from "react";
import { useCategorias } from "./CategoriasContext/CategoriaProvider";
import { Form, Button, Alert } from "react-bootstrap";
import Swal from "sweetalert2";

export const FormCategoria = ({ categoria = null, onSubmit }) => {
  // Se obtienen las funciones y datos relacionados con las categorias desde el contexto
  const { categorias, createCategoria, updateCategoria } = useCategorias();
  
  // Estado local para rastrear la categoría en edicion o creacion, asi como errores en el nombre
  const [categoriaEditada, setCategoriaEditada] = useState(
    categoria || {
      nombre: "",
      id_parent: null,
    }
  );
  const [nombreError, setNombreError] = useState("");

  // Determina si se esta editando una categoria existente
  const editando = categoriaEditada.id != null;

  // Maneja la presentación del formulario y valida la entrada del usuario
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (categoriaEditada.nombre.trim() === "") {
      setNombreError("El nombre es obligatorio");
      return;
    }
    if (editando) {
      const confirmed = await showConfirmation(
        "Confirmar actualización",
        "¿Estás seguro de que deseas actualizar la categoría?"
      );
      if (confirmed) {
        const status = await updateCategoria(
          categoriaEditada.id,
          categoriaEditada
        );
        handleUpdateResponse(status);
      }
    } else {
      const status = await createCategoria(categoriaEditada);
      handleCreateResponse(status);
    }
    onSubmit();
  };

  // Muestra un cuadro de diálogo de confirmacion
  const showConfirmation = async (title, text) => {
    const result = await Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    });
    return result.isConfirmed;
  };

  // Maneja las respuestas de actualizacion
  const handleUpdateResponse = (status) => {
    switch (status) {
      case 200:
        Swal.fire(
          "Actualización exitosa",
          "La categoría se actualizó correctamente.",
          "success"
        );
        break;
      case 400:
        Swal.fire(
          "Error de actualización",
          "La categoría no puede ser su propia hija.",
          "error"
        );
        break;
      case 401:
        Swal.fire(
          "Error de actualización",
          "La categoría no puede ser hija de una de sus hijas.",
          "error"
        );
        break;
      case 404:
        Swal.fire("Error de actualización", "La categoría no existe.", "error");
        break;
      default:
        Swal.fire(
          "Error de actualización",
          "Ha ocurrido un error en la actualización de la categoría.",
          "error"
        );
    }
  };

  // Maneja las respuestas de creacion
  const handleCreateResponse = (status) => {
    switch (status) {
      case 201:
        Swal.fire(
          "Creación exitosa",
          "La categoría ha sido creada exitosamente.",
          "success"
        );
        break;
      case 400:
        Swal.fire("Error de creación", "La categoría ya existe.", "error");
        break;
      case 401:
        Swal.fire(
          "Error de creación",
          "La categoría padre no existe.",
          "error"
        );
        break;
      default:
        Swal.fire(
          "Error de creación",
          "Ha ocurrido un error en la creación de la categoría.",
          "error"
        );
    }
  };

  // Maneja el cambio en el campo "Nombre"
  const handleNombreChange = (e) => {
    const nombre = e.target.value;
    setCategoriaEditada({
      ...categoriaEditada,
      nombre,
    });
    setNombreError(nombre.trim() === "" ? "El nombre es obligatorio" : "");
  };

  // Maneja el cambio en el campo "Categoria Padre"
  const handleIdParentChange = (e) => {
    const id_parent = e.target.value.trim() ? e.target.value : null;
    setCategoriaEditada({
      ...categoriaEditada,
      id_parent,
    });
  };

  // Crea opciones de selección para el campo "Categoria Padre"
  const buildOptions = (categorias, indent = 0) => {
    const categoriasFiltradas = categorias.filter(categoria => categoria.id_parent === null);
    
    return categoriasFiltradas.map((categoria) => {
      const prefix = new Array(indent + 1).join("-");
      return (
        <option key={categoria.id} value={categoria.id}>
          {prefix} {categoria.nombre}
        </option>
      );
    });
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      {/* Muestra el campo "ID" solo cuando se esta editando */}
      {editando && (
        <Form.Group controlId="formId">
          <Form.Label>ID:</Form.Label>
          <Form.Control
            type="text"
            value={categoriaEditada.id}
            onChange={(e) =>
              setCategoriaEditada({
                ...categoriaEditada,
                id: e.target.value,
              })
            }
            disabled
          />
        </Form.Group>
      )}
      <Form.Group controlId="formNombre">
        <Form.Label>Nombre:</Form.Label>
        <Form.Control
          type="text"
          value={categoriaEditada.nombre}
          onChange={handleNombreChange}
          required
        />
        {nombreError && <Alert variant="danger">{nombreError}</Alert>}
      </Form.Group>
      <Form.Group controlId="formIdParent">
        <Form.Label>Categoría Padre:</Form.Label>
        <Form.Control
          as="select"
          name="id_parent"
          value={categoriaEditada.id_parent || ""}
          onChange={handleIdParentChange}
        >
          <option value="">-- Sin Categoría Padre --</option>
          {buildOptions(categorias)}
        </Form.Control>
      </Form.Group>
      <Button type="submit">Guardar</Button>
    </Form>
  );
};
