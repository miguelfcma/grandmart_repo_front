import React, { useState } from "react";
import { useUsuarios } from "../../UsuariosContext/UsuarioProvider";
import Swal from 'sweetalert2';

export function FormEditarPerfil({
  onSubmit,
  nombre,
  apellidoPaterno,
  apellidoMaterno,
  fechaNacimiento,
  telefono,
  sexo,
}) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const { actualizarPerfilUsuario } = useUsuarios();
  const [formulario, setFormulario] = useState({
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    fechaNacimiento,
    telefono,
    sexo,
  });

  // Estado para manejar errores del teléfono
  const [telefonoError, setTelefonoError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validación de longitud y formato del teléfono
    if (name === "telefono") {
      const telefonoPattern = /^[0-9]{10}$/;
      if (!telefonoPattern.test(value)) {
        setTelefonoError("El formato del teléfono es incorrecto. Debe contener 10 dígitos numéricos.");
      } else {
        setTelefonoError(""); // Limpia el error si es válido
      }
    }

    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      [name]: value,
    }));
  };

  const validateEdadMinima = (fechaNacimiento) => {
    const fechaActual = new Date();
    const fechaNacimientoDate = new Date(fechaNacimiento);
    const edadMinima = 18;

    let edadCalculada =
      fechaActual.getFullYear() - fechaNacimientoDate.getFullYear();
    if (
      fechaActual.getMonth() < fechaNacimientoDate.getMonth() ||
      (fechaActual.getMonth() === fechaNacimientoDate.getMonth() &&
        fechaActual.getDate() < fechaNacimientoDate.getDate())
    ) {
      edadCalculada--;
    }

    return edadCalculada >= edadMinima;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de teléfono
    if (telefonoError) {
      console.log("El número de teléfono no es válido");
      return;
    }

    // Validación de edad mínima
    if (!validateEdadMinima(formulario.fechaNacimiento)) {
      console.log("Debes tener al menos 18 años para enviar el formulario");
      return;
    }

    try {
      const result = await Swal.fire({
        title: "Confirmar actualización",
        text: "¿Estás seguro de que deseas actualizar tu perfil?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, actualizar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        await actualizarPerfilUsuario(usuario.id, formulario);
        Swal.fire(
          "¡Éxito!",
          "Perfil de usuario actualizado correctamente",
          "success"
        );
        onSubmit();
      } else {
        // El usuario canceló la actualización
        console.log("Actualización del perfil cancelada por el usuario");
      }
    } catch (error) {
      console.error("Error al actualizar el perfil del usuario:", error);
      Swal.fire(
        "¡Error!",
        "Error al actualizar el perfil del usuario",
        "error"
      );
      // Manejar el error de actualización del perfil
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          name="nombre"
          value={formulario.nombre}
          onChange={handleChange}
        />
      </label>
      <label>
        Apellido Paterno:
        <input
          type="text"
          name="apellidoPaterno"
          value={formulario.apellidoPaterno}
          onChange={handleChange}
        />
      </label>
      <label>
        Apellido Materno:
        <input
          type="text"
          name="apellidoMaterno"
          value={formulario.apellidoMaterno}
          onChange={handleChange}
        />
      </label>
      <label>
        Fecha de Nacimiento:
        <input
          type="date"
          name="fechaNacimiento"
          value={formulario.fechaNacimiento}
          onChange={handleChange}
        />
      </label>
      <label>
        Teléfono:
        <input
          type="tel"
          name="telefono"
          value={formulario.telefono}
          onChange={handleChange}
          pattern="[0-9]*"
          title="Ingresa solo números"
          required
        />
        {/* Mostrar mensaje de error del teléfono */}
        {telefonoError && <p className="error">{telefonoError}</p>}
      </label>
      <label>
        Sexo:
        <select
          id="sexo"
          name="sexo"
          value={formulario.sexo}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>
      </label>
      <button type="submit">Guardar cambios</button>
    </form>
  );
}
