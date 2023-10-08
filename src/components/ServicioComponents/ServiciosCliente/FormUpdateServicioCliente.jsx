import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useCategorias } from "../../CategoriaComponents/CategoriasContext/CategoriaProvider";
import { useServicios } from "../ServiciosContext/ServicioProvider";
import Swal from "sweetalert2";

export function FormUpdateServicioCliente({ onSubmit, servicio }) {
  const { updateServicioCliente } = useServicios();
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
      (categoria) => categoria.id === servicio.id_categoria
    );

    setCategoriaActual({ ...categoriaEncontrada });
  }, [servicio.id_categoria, categorias]);

  const [formValues, setFormValues] = useState({
    titulo: servicio.titulo,
    descripcion: servicio.descripcion,
    precio: servicio.precio,
    id_categoria: servicio.id_categoria,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const confirmResult = await Swal.fire({
      icon: "question",
      title: "Confirmar actualización",
      text: "¿Estás seguro de actualizar el servicio?",
      showCancelButton: true,
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6", // Color azul para el botón de confirmación
    });

    if (confirmResult.isConfirmed) {
      try {
        const status = await updateServicioCliente(servicio.id, formValues);

        if (status === 200) {
          Swal.fire({
            icon: "success",
            title: "Actualización exitosa",
            text: "El servicio se ha actualizado correctamente",
          }).then(() => {
            onSubmit();
          });
        } else if (status === 404) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se encontró el servicio",
          });
        } else if (status === 500) {
          Swal.fire({
            icon: "error",
            title: "Error en el servidor",
            text: "Ocurrió un error en el servidor. Por favor, intenta nuevamente más tarde.",
          });
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

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="titulo">
        <Form.Label>Título:</Form.Label>
        <Form.Control
          type="text"
          name="titulo"
          value={formValues.titulo}
          onChange={handleInputChange}
        />
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
          type="number"
          name="precio"
          value={formValues.precio}
          onChange={handleInputChange}
          min="0"
          required
        />
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
