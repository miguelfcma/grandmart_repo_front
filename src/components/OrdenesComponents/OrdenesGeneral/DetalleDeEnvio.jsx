import { useState, useEffect } from "react";
import { useUsuarios } from "../../usuarioComponents/UsuariosContext/UsuarioProvider";
import { Container, Row, Col, Table, Image, Button } from "react-bootstrap";

export function DetalleDeEnvio() {
  const { domicilio, loadDomicilio } = useUsuarios();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    const fetchData = async (userId) => {
      try {
        await loadDomicilio(userId);
      } catch (error) {
        console.error(error);
      }
    };

    if (usuario && usuario.id) {
      fetchData(usuario.id);
    }
  }, []);

  return (
    <Container>
      {domicilio ? (
        <div>
          <h2>{domicilio.nombre_ine}</h2>
          <p>Código postal: {domicilio.postal}</p>
          <p>Estado: {domicilio.estado}</p>
          <p>Municipio o alcaldía: {domicilio.municipio_alcaldia}</p>
          <p>Colonia: {domicilio.colonia}</p>
          <p>Calle: {domicilio.calle}</p>
          <p>Número exterior: {domicilio.numeroExterior}</p>
          <p>Número interior: {domicilio.numeroInterior}</p>
          <p>Calle 1: {domicilio.calle1}</p>
          <p>Calle 2: {domicilio.calle2}</p>
          <p>Descripción: {domicilio.descripcion}</p>

          <button onClick="">Editar domicilio</button>

           
        </div>
      ) : (
        <div>
          <p>NO HAY DOMICILIO</p>
          
        </div>
      )}
    </Container>
  );
}
