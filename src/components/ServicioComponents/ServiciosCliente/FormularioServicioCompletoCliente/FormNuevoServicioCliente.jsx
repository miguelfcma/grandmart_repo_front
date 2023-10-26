import { useCategorias } from "../../../CategoriaComponents/CategoriasContext/CategoriaProvider";
import { useState, useEffect } from "react";
import { useServicios } from "../../ServiciosContext/ServicioProvider";

import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
export function FormNuevoServicioCliente({ handleServicioRegistrado }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { createServicio } = useServicios();
  const [servicio, setServicio] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    id_categoria: "",
    id_usuario: usuario.id,
  });

  const { categorias, loadCategorias } = useCategorias();
  useEffect(() => {
    loadCategorias();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setServicio((prevServicio) => ({
      ...prevServicio,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      servicio.titulo === "" ||
      servicio.precio === "" ||
      servicio.id_categoria === ""
    ) {
      console.log("Por favor complete los campos obligatorios");
      return;
    }

    try {
      const response = await createServicio(servicio);
      const status = response ? response.status : null;

      if (status === 201) {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "El servicio se creó con éxito",
        });
        const idServicio = response.data.servicio.id;
        handleServicioRegistrado(idServicio);
      } else if (status === 400) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "El servicio ya está registrado en su cuenta",
        });
      } else if (status === 500) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error en el servidor",
        });
      }
    } catch (error) {
      console.error(error);
      // Mostrar una alerta de error genérica
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al crear el servicio",
      });
    }
  };

  const handleIdParentChange = (event) => {
    const { value } = event.target;
    setServicio((prevServicio) => ({
      ...prevServicio,
      id_categoria: value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Título del servicio:</Form.Label>
        <Form.Control
          type="text"
          name="titulo"
          value={servicio.titulo}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Precio del servicio:</Form.Label>
        <Form.Control
          type="text"
          name="precio"
          pattern="^\d+(\.\d+)?$"
          title="Ingrese un número no negativo con hasta dos decimales"
          min="0"
          value={servicio.precio}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Descripción del servicio (opcional):</Form.Label>
        <Form.Control
          as="textarea"
          name="descripcion"
          value={servicio.descripcion}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Categoría del servicio:</Form.Label>
        <Form.Control
          as="select"
          name="id_categoria"
          value={servicio.id_categoria}
          onChange={handleIdParentChange}
          required
        >
          <option value="">Seleccionar categoría padre</option>
          {categorias
            .filter((categoria) => categoria.id_parent === null)
            .map((categoriaPadre) => (
              <optgroup
                className="categoria-padre" // Agregamos una clase a las opciones de las categorías padres
                label={categoriaPadre.nombre}
                key={categoriaPadre.id}
              >
                {categorias
                  .filter(
                    (categoria) =>
                      categoria.id_parent === categoriaPadre.id &&
                      categoria.id !== servicio.id_categoria // para evitar que se pueda seleccionar como categoría padre a sí mismo
                  )
                  .map((categoriaHija) => (
                    <option key={categoriaHija.id} value={categoriaHija.id}>
                      {categoriaHija.nombre}
                    </option>
                  ))}
              </optgroup>
            ))}
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Registrar
      </Button>
    </Form>
  );
}
