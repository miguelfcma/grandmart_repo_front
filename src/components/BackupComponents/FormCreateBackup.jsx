//Este archivo es para el formulario de creacion de una copia de seguridad 

import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import Swal from "sweetalert2"; //Esta dependencia es para mostrar mensajes emergentes
import { useBackup } from "./BackupContext/BackupProvider";

export function FormCreateBackup() {
  //El objeto de usuario extrae el email
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  //Inicia un estado local de password para almacenar la contraseña introducida en el formulario
  const [password, setPassword] = useState("");
  //Obtiene la funcion backup del contexto
  const { getBackup } = useBackup();
  //Inicia un estado para manejar el error de contraseña
  const [passwordError, setPasswordError] = useState(false);

  //La funcion handleSubmit maneja la presentacion del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = usuario.email;
    //Un objeto credentials que contiene la contraseña y el email
    const credentials = {
      password,
      email,
    };

    if (!password) {
      // Verifica si el campo de contraseña está vacío
      setPasswordError(true);
      return; // Evita enviar el formulario si hay un error
    }

    try {
      //Si la contraseña no esta vacia, llama a getBackup con las credenciales
      const response = await getBackup(credentials);
     
      //Si la respuesta tiene un estado 200, muestra  la notificacion de exito y crea el backup
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Backup creado",
        });
        //Si la respuesta tiene un estado 400, muestra  la notificacion de error, indicando que la contraseña es incorrecta
      } else if (response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Contraseña incorrecta",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al crear el backup",
      });
    }
  };

  //Estado showForm para mostrar/ocultar el formulario, se establece inicialmente en false
  const [showForm, setShowForm] = useState(false);

  //Renderizado del componente
  return (
    <>
    {/*Boton para mostrar u ocultar el formulario*/}
      <Button variant="primary" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Ocultar formulario" : "Crear backup"}
      </Button>
      {showForm && (
        <Card className="mt-4">
          <Card.Header>
            <h4>Creación de Backup</h4>
          </Card.Header>
          <Card.Body>
            {/*El formulario permite introducir la contraseña al usuario*/}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="password">
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setPasswordError(false); // Restablece el error al cambiar la contraseña
                  }}
                />
                {/*Error visual si el campo de contraseña se encuentra vacio*/}
                {passwordError && (
                  <div className="text-danger">
                    El campo de contraseña no puede estar vacío.
                  </div>
                )}
              </Form.Group>
              {/*El boton para crear el backup*/}
              <Button variant="primary" type="submit">
                Crear backup
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
