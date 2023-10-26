import { useServicios } from "../../../ServiciosContext/ServicioProvider";
import { Form, Button, Card } from "react-bootstrap";
import "./Form2.css";
import { useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { FooterHome } from "../../../../HomePageComponents/FooterHome";
import InputGroup from "react-bootstrap/InputGroup";
import Swal from "sweetalert2";

// Componente que permite a los usuarios completar una denuncia sobre un servicio.
export function Form2NuevaDenunciaServicioGeneral() {
  // Para que la página se muestre desde arriba.
  window.scrollTo(0, 0);

  const navigate = useNavigate();
  const { crearDenunciaServicio } = useServicios();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const location = useLocation();
  const opcion = new URLSearchParams(location.search).get("opcion");

  const { id_servicio } = useParams();

  // Estado para almacenar los datos del formulario de denuncia.
  const [formData, setFormData] = useState({
    motivo: opcion,
    descripcion: "",
    revisar: 0,
    id_servicio: id_servicio,
    id_usuario: usuario.id,
  });

  // Función que se ejecuta cuando se envía el formulario de denuncia.
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Intenta crear la denuncia llamando a la función crearDenunciaServicio.
      const status = await crearDenunciaServicio(formData);

      // Limpia el formulario después de la denuncia exitosa.
      setFormData({
        motivo: opcion,
        descripcion: "",
        id_servicio: id_servicio,
        id_usuario: usuario.id,
      });

      // Mostrar un mensaje de éxito con SweetAlert2.
      Swal.fire({
        title: "Éxito",
        text: "La denuncia fue creada exitosamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      }).then(() => {
        // Redirigir después de que el usuario haya aceptado el mensaje.
        navigate(`/servicios/detalles/${id_servicio}`);
      });
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al crear la denuncia.");
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/">
            <img
              alt="e-commerce"
              src="https://firebasestorage.googleapis.com/v0/b/grandmart-51065.appspot.com/o/src%2Flogo.png?alt=media&token=6c393680-5c89-4708-a0d3-f8ffcb0fc379"
            />
          </Link>
        </div>
      </nav>
      <div className="background2">
        <Card className="cardDenuncia2">
          <Card.Title className="tituloDenuns2">
            ¿Por qué quieres reportar la publicación?
          </Card.Title>

          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="txtDenuns">
                Cuéntanos más sobre el motivo de tu denuncia:
              </Form.Label>
              <InputGroup>
                <Form.Control
                  as="textarea"
                  aria-label="With textarea"
                  className="txtArea"
                  type="text"
                  placeholder="Escribe aquí los detalles de tu denuncia..."
                  value={formData.descripcion}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      descripcion: event.target.value,
                    })
                  }
                  required
                />
              </InputGroup>
            </Form.Group>
            <br></br>
            <Button type="submit" className="btn-azul">
              Enviar
            </Button>
          </Form>
          <br></br>
        </Card>
      </div>
      <div className="footerDenuncia2">
        <FooterHome />
      </div>
    </div>
  );
}
