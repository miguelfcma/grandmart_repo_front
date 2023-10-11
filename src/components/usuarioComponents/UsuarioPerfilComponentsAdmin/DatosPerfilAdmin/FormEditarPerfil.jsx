import React, { useState, useEffect } from "react";

import { useUsuarios } from "../../UsuariosContext/UsuarioProvider";
import Swal from "sweetalert2";

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

  const [telefonoError, setTelefonoError] = useState(""); // Nuevo estado para el error del teléfono
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validación de longitud del teléfono
    if (name === "telefono") {
      // Bloquear letras y limitar a 10 dígitos
      const telefonoValue = value.replace(/\D/g, "").slice(0, 10);
      setFormulario((prevFormulario) => ({
        ...prevFormulario,
        [name]: telefonoValue,
      }));

      // Validar la longitud y mostrar el mensaje de error
      if (telefonoValue.length !== 10) {
        setTelefonoError("  (Debe ser a 10 dígitos)");
      } else {
        setTelefonoError(""); // No hay error
      }
    } else {
      setFormulario((prevFormulario) => ({
        ...prevFormulario,
        [name]: value,
      }));
    }
  };

  const validateTelefono = (telefono) => {
    const telefonoRegex = /^\d{10}$/;
    return telefonoRegex.test(telefono);
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

    if (!validateTelefono(formulario.telefono)) {
      console.log("Debe tener 10 dígitos!");
      return;
    }

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
          required
        />
      </label>
      <label>
        Apellido Paterno:
        <input
          type="text"
          name="apellidoPaterno"
          value={formulario.apellidoPaterno}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Apellido Materno:
        <input
          type="text"
          name="apellidoMaterno"
          value={formulario.apellidoMaterno}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Fecha de Nacimiento:
        <input
          type="date"
          name="fechaNacimiento"
          value={formulario.fechaNacimiento}
          onChange={handleChange}
          required
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
      </label>
      {/* Mostrar el mensaje de error debajo del campo de entrada */}
      {telefonoError && <span style={{ color: "red" }}>{telefonoError}</span>}
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
