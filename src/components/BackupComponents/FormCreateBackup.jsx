import { useState } from "react";
import { getBackupRequest } from "../../API/bdBackup.api";

export function FormCreateBackup() {
  const email = localStorage.getItem("emailUser")
    const token = localStorage.getItem("token");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    console.log(email)
    event.preventDefault();
    const credentials = {
        password,
        email,
        token
      };
  
    try {
        const response = await getBackupRequest(credentials);
        console.log({
          status: response.status,
          message: response.data.message,
        });
      } catch (error) {
        console.log({
          status: error.response.status,
          message: error.response.data.message,
        });
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="password">Contraseña:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
