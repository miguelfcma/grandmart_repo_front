import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useCategorias } from "../../CategoriaComponents/CategoriasContext/CategoriaProvider";
import { useServicios } from "../ServiciosContext/ServicioProvider";
import Swal from "sweetalert2";

export function FormUpdateServicioAdmin({ onSubmit, servicio }) {
  const { updateServicio } = useServicios();
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
    try {
      const { isConfirmed } = await Swal.fire({
        title: "Confirmar actualización",
        text: "¿Estás seguro de que deseas actualizar el servicio?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, actualizar",
        cancelButtonText: "Cancelar",
      });

      if (isConfirmed) {
        const status = await updateServicio(servicio.id, formValues);

        if (status === 200) {
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "El servicio se ha actualizado correctamente",
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
            title: "Error",
            text: "Ocurrió un error en el servidor. Por favor, intenta nuevamente más tarde.",
          });
        }

        onSubmit();
      }
    } catch (error) {
      console.error(error);
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
          required
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
          type="text"
          name="precio"
          pattern="^\d+(\.\d+)?$"
          title="Ingrese un número no negativo con hasta dos decimales"
          min="0"
          value={formValues.precio}
          onChange={handleInputChange}
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
