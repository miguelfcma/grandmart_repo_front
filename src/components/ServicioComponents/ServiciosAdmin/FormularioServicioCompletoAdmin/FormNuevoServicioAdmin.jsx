import { useCategorias } from "../../../CategoriaComponents/CategoriasContext/CategoriaProvider";
import { useState, useEffect } from "react";
import { useServicios } from "../../ServiciosContext/ServicioProvider";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import Swal from "sweetalert2";

// Componente para crear un nuevo servicio por parte de los administradores
export function FormNuevoServicioAdmin({ handleServicioRegistrado }) {
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Obtiene la función `createServicio` del contexto de servicios
  const { createServicio } = useServicios();

  // Estado para almacenar la información del servicio
  const [servicio, setServicio] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    id_categoria: "",
    id_usuario: usuario.id,
  });

  // Obtiene las categorías y carga las categorías al montar el componente
  const { categorias, loadCategorias } = useCategorias();
  useEffect(() => {
    loadCategorias();
  }, []);

  // Función para manejar cambios en los campos del formulario
  const handleChange = (event) => {
    const { name, value } = event.target;

    setServicio((prevServicio) => ({
      ...prevServicio,
      [name]: value,
    }));
  };

  // Función para manejar el envío del formulario
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
        // Mostrar una notificación de éxito si el servicio se crea con éxito
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "El servicio se creó con éxito",
        });
        const idServicio = response.data.servicio.id;
        handleServicioRegistrado(idServicio);
      } else if (status === 400) {
        // Mostrar una notificación de error si el servicio ya existe en la cuenta
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "El servicio ya está registrado en su cuenta",
        });
      } else if (status === 500) {
        // Mostrar una notificación de error si hay un error en el servidor
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

  // Función para manejar el cambio en la opción de categoría
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
      {/* El patrón en esta línea es una expresión regular que valida que el
      input sea un número con hasta dos decimales. ^ indica el inicio de la
      línea. \d+ permite uno o más dígitos. (\.\d{(1, 2)})? es un grupo
      opcional que permite un punto seguido de uno o dos dígitos. El ? hace que
      todo el grupo sea opcional. $ indica el final de la línea.
      Por lo
      tanto, este patrón aceptará números como "123", "123.4", y "123.45", pero
  no "123.456".*/}
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
