import { useUsuarios } from "../UsuariosContext/UsuarioProvider";
import { useState, useEffect } from "react";

export default function ContrasenaUpdate({ onSubmit, initialContrasena }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { updateContrasenaUsuarioByUserId } = useUsuarios();

  const [formData, setFormData] = useState({ password: initialContrasena });

  useEffect(() => {
    setFormData({ password: initialContrasena });
  }, [initialContrasena]);

  const handleChange = (e) => {
    setFormData({ password: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateContrasenaUsuarioByUserId(usuario.id, formData);
      onSubmit && onSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Contraseña:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Actualizar contraseña</button>
    </form>
  );
}
