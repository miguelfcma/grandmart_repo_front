import { useEffect, useState } from "react";
import { CardUsuario } from "./CardUsuario";
import "./ListUsuarios.css";
import { useUsuarios } from "../UsuariosContext/UsuarioProvider";

export function ListUsuarios() {
  const { usuarios, loadUsuarios } = useUsuarios();

  const [filtro, setFiltro] = useState("");

  // Al entrar a esta página, se ejecutará esta función
  useEffect(() => {
    loadUsuarios();
  }, []);

  function filtrarUsuarios() {
    if (filtro === "") {
      return usuarios;
    } else {
      return usuarios.filter((usuario) => {
        const filtroLowerCase = filtro.toLowerCase();

        const apellidoPaternoLowerCase = usuario.apellidoPaterno.toLowerCase();
        const apellidoMaternoLowerCase = usuario.apellidoMaterno.toLowerCase();

        return (
          usuario.id.toString().includes(filtroLowerCase) ||
          usuario.nombre.toLowerCase().includes(filtroLowerCase) ||
          usuario.apellidoPaterno.toLowerCase().includes(filtroLowerCase) ||
          usuario.apellidoMaterno.toLowerCase().includes(filtroLowerCase) ||
          usuario.email.toLowerCase().includes(filtroLowerCase) ||
          `${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`
            .toLowerCase()
            .includes(filtroLowerCase) ||
          `${usuario.apellidoPaterno} ${usuario.apellidoMaterno} ${usuario.nombre}`
            .toLowerCase()
            .includes(filtroLowerCase) ||
          `${usuario.id} ${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`
            .toLowerCase()
            .includes(filtroLowerCase) ||
          `${usuario.id} - ${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`
            .toLowerCase()
            .includes(filtroLowerCase) ||
          `${usuario.id}-${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`
            .toLowerCase()
            .includes(filtroLowerCase)
        );
      });
    }
  }

  function renderMain() {
    const usuariosFiltrados = filtrarUsuarios();

    if (usuariosFiltrados.length === 0) {
      return <h1>No hay usuarios registrados</h1>;
    } else {
      return usuariosFiltrados.map((usuario) => (
        <CardUsuario key={usuario.id} usuario={usuario} />
      ));
    }
  }

  return (
    <>
      <h2 className="titulo">Lista de usuarios:</h2>
      <input
        type="text"
        placeholder="Buscar por ID, nombre, apellido paterno, apellido materno o email"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="bordeFiltro"
      />
      <br></br>
      <br></br>
      <br></br>
      <div className="list-usuarios">{renderMain()}</div>
    </>
  );
}
