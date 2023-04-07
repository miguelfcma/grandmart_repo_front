import { useState } from "react";
import { postRestoreRequest } from "../../API/BDBackupApiRest/bdBackup.api";

export function FormCreateRestore() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const token = localStorage.getItem("token");
  const [password, setPassword] = useState("");
  const [archivo, setArchivo] = useState(null);

  const handleArchivoChange = (event) => {
    setArchivo(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = usuario.email;
    const credentials = {
      password,
      email,
      token
    };
    console.log(credentials)
    try {
      const response = await postRestoreRequest(credentials, archivo);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <label>
        Archivo SQL:
        <input type="file" onChange={handleArchivoChange} />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
}
