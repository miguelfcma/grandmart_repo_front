import { useUsuarios } from "../../UsuariosContext/UsuarioProvider";
import { useState, useEffect } from "react";

export function FormUpdateTarjeta({ onSubmit, info_bancaria_inicial }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { update_info_bancaria } = useUsuarios();

  const [formData, setFormData] = useState(info_bancaria_inicial);

  useEffect(() => {
    setFormData(info_bancaria_inicial);
  }, [info_bancaria_inicial]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await update_info_bancaria(usuario.id,formData);
      onSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre titular:
        <input
          type="text"
          name="nombre_ine"
          value={formData.nombre_titular}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Número de cuenta:
        <input
          type="text"
          name="numero_cuenta"
          value={formData.numero_cuenta}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Banco:
        <input
          type="text"
          name="banco"
          value={formData.banco}
          onChange={handleChange}
        />
      </label>
      <br />

      <button type="submit">Actualizar Domicilio</button>
    </form>
  );
}
