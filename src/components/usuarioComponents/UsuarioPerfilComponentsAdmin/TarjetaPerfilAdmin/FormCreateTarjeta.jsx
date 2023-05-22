import { useUsuarios } from "../../UsuariosContext/UsuarioProvider";
import { useState } from "react";

export function FormCreateTarjeta({ onSubmit }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { create_info_bancaria} = useUsuarios();

  const [formData, setFormData] = useState({
    nombre_titular: "",
    numero_cuenta: "",
    banco: "",

    usuario_id: usuario.id,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const info_bancaria = await create_info_bancaria(formData);
      setFormData({
        nombre_titular: "",
        numero_cuenta: "",
        banco: "",

        usuario_id: usuario.id,
      });
      onSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre del titular de la cuenta:
        <input
          type="text"
          name="nombre_ine"
          value={formData.numero_cuenta}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Banco:
        <input
          type="text"
          name="postal"
          value={formData.banco}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Número de cuenta:
        <input
          type="text"
          name="estado"
          value={formData.numero_cuenta}
          onChange={handleChange}
        />
      </label>
      <br />

      <button type="submit">Guardar</button>
    </form>
  );
}
