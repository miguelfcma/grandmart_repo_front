import { useEffect, useState } from "react";
import { CardUsuario } from "./CardUsuario";
import "./ListUsuarios.css";
import { useUsuarios } from "./UsuariosContext/UsuarioProvider";
export function ListUsuarios() {
  const { usuarios, loadUsuarios } = useUsuarios();
  //Apenas entre a esta pagina se ejecutara esta función
  useEffect(() => {
    loadUsuarios();
  }, []);
  function renderMain() {
    if (usuarios.length === 0) {
      return <h1>No hay usuarios registrados</h1>;
    } else {
      return usuarios.map((usuario) => (
        <CardUsuario key={usuario.id} usuario={usuario} />
      ));
    }
  }
  
  return (
    <>
    <h2 className="titulo">Lista de usuarios:</h2>
      <div className="list-usuarios">{renderMain()}</div>
    </>
  );
}