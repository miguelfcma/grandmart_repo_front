import { useUsuarios } from "../UsuariosContext/UsuarioProvider";
import { useState } from "react";

export function FormCreateUsuarioDomicilio({onSubmit}) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { createDomicilioUsuario } = useUsuarios();


  const [formData, setFormData] = useState({
    nombre_ine: "",
    postal: "",
    estado: "",
    municipio_alcaldia: "",
    colonia: "",
    calle: "",
    numeroExterior: "",
    numeroInterior: "",
    calle1: "",
    calle2: "",
    descripcion: "",
    id_usuario: usuario.id,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createDomicilioUsuario(formData);
      setFormData({
        nombre_ine: "",
        postal: "",
        estado: "",
        municipio_alcaldia: "",
        colonia: "",
        calle: "",
        numeroExterior: "",
        numeroInterior: "",
        calle1: "",
        calle2: "",
        descripcion: "",
        id_usuario: "",
      });
      onSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre INE:
        <input
          type="text"
          name="nombre_ine"
          value={formData.nombre_ine}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Código postal:
        <input
          type="text"
          name="postal"
          value={formData.postal}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Estado:
        <input
          type="text"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Municipio o alcaldía:
        <input
          type="text"
          name="municipio_alcaldia"
          value={formData.municipio_alcaldia}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Colonia:
        <input
          type="text"
          name="colonia"
          value={formData.colonia}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Calle:
        <input
          type="text"
          name="calle"
          value={formData.calle}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Número exterior:
        <input
          type="text"
          name="numeroExterior"
          value={formData.numeroExterior}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Número interior:
        <input
          type="text"
          name="numeroInterior"
          value={formData.numeroInterior}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Calle 1:
        <input
          type="text"
          name="calle1"
          value={formData.calle1}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Calle 2:
        <input
          type="text"
          name="calle2"
          value={formData.calle2}
          onChange={(e) => setFormData({ ...formData, calle2: e.target.value })}
          required
        />
      </label>
      <label>
        Descripción:
        <input
          type="text"
          name="descripcion"
          value={formData.descripcion}
          onChange={(e) =>
            setFormData({ ...formData, descripcion: e.target.value })
          }
          required
        />
      </label>
      <button type="submit">Crear Domicilio</button>
    </form>
  );
}
