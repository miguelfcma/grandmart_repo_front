//Este componente se utiliza para mostrar la lista de copias de seguridad de base de datos y proporciona la funcionalidad para seleccionar, restaurar, eliminar y descargar las copias de seguridad

import { useBackup } from "./BackupContext/BackupProvider";
import { ItemBackup } from "./ItemBackup";
import React, { useState, useEffect } from "react";
import { ListGroup, Card, Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

export function ListaBackups() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  //Estado para almacenar contraseña
  const [password, setPassword] = useState("");
  //Estado para controlar la visibilidad de mensajes de error
  const [passwordError, setPasswordError] = useState(false);
  //Estos estados se utilizan para realizar un seguimiento de la copia de seguridad
  const [selectedBackup, setSelectedBackup] = useState("");
  const [selectedDeleteBackup, setSelectedDeleteBackup] = useState("");
  const [selectedDownloadBackup, setSelectedDownloadBackup] = useState("");
  //Se utiliza el hook useBackup para acceder a las funciones y datos del contexto BackupContext
  const {
    getListaDeBackups,
    postRestore,
    deleteBackup,
    backupList,
    downloadBackup,
  } = useBackup();

  //se utiliza el efecto useEffect para llamar la funcion getListaDeBackups
  useEffect(() => {
    const fetchBackupList = async () => {
      await getListaDeBackups();
    };
    fetchBackupList();
  }, []);

  //Se utiliza para seleccionar una copia de seguridad y actualizar los estados relacionados
  const handleSelect = (backup) => {
    setSelectedBackup(backup);
    setSelectedDeleteBackup("");
    setSelectedDownloadBackup("");
  };
  //Se utiliza para manejar la restauracion de una copia de seguridad
  const handleRestore = async (event) => {
    event.preventDefault();

    if (!selectedBackup) {
      // Verifica si no se ha seleccionado una copia de seguridad
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debes seleccionar una copia de seguridad antes de restaurar.",
      });
      return; // Evita continuar si no hay copia de seguridad seleccionada
    }

    const credentials = {
      password,
      email: usuario.email,
    };

    if (!password) {
      // Verifica si el campo de contraseña está vacío
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo de contraseña no puede estar vacío.",
      });
      return; // Evita enviar el formulario si hay un error
    }

    try {
      const response = await postRestore(selectedBackup, credentials);

      if (response.status === 200) {
        // Verifica si la acción fue exitosa
        setSelectedBackup("");
        setSelectedDeleteBackup("");
        setSelectedDownloadBackup("");

        Swal.fire({
          icon: "success",
          title: "Restauración exitosa",
          text: "La copia de seguridad ha sido restaurada con éxito.",
        });
      } else if (response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Contraseña incorrecta",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al intentar restaurar la copia de seguridad.",
      });
    }
  };
  //Se utilia¿za para eliminar una copia de seguridad
  const handleDelete = async (event) => {
    event.preventDefault();

    const credentials = {
      password,
      email: usuario.email,
    };

    if (!password) {
      // Verifica si el campo de contraseña está vacío
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo de contraseña no puede estar vacío.",
      });
      return; // Evita enviar el formulario si hay un error
    }

    try {
      const response = await deleteBackup(selectedDeleteBackup, credentials);
     
      if (response.status === 200) {
        setSelectedBackup("");
        setSelectedDeleteBackup("");
        setSelectedDownloadBackup("");

        Swal.fire({
          icon: "success",
          title: "Eliminación exitosa",
          text: "La copia de seguridad ha sido eliminada con éxito.",
        });
      } else if (response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Contraseña incorrecta",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al intentar eliminar la copia de seguridad.",
      });
    }
  };

  const handleDownload = async (event) => {
    event.preventDefault();

    const credentials = {
      password,
      email: usuario.email,
    };

    if (!password) {
      // Verifica si el campo de contraseña está vacío
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo de contraseña no puede estar vacío.",
      });
      return; // Evita enviar el formulario si hay un error
    }

    try {
      const response = await downloadBackup(
        selectedDownloadBackup,
        credentials
      );
      if (response.status === 200) {
        setSelectedBackup("");
        setSelectedDeleteBackup("");
        setSelectedDownloadBackup("");

        Swal.fire({
          icon: "success",
          title: "Descarga exitosa",
          text: "La copia de seguridad se ha descargado exitosamente.",
        });
      } else if (response.status == 400) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Contraseña incorrecta",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al intentar descargar la copia de seguridad.",
      });
    }
  };

  const handleSelectDelete = (backup) => {
    setSelectedDeleteBackup(backup);
    setSelectedBackup("");
    setSelectedDownloadBackup("");
  };
  const handleSelectDownload = (backup) => {
    setSelectedDownloadBackup(backup);
    setSelectedDeleteBackup("");
    setSelectedBackup("");
  };

  //Renderizado del componente
  return (
    <div>
      <h2>Lista de copias de seguridad:</h2>
      <p>
        Haz clic en el botón "Seleccionar" para restaurar esta copia de
        seguridad de la base de datos.
      </p>
      <p>
        Haz clic en el botón "Eliminar" para eliminar esta copia de seguridad de
        la base de datos.
      </p>
      <p>
        Haz clic en el botón "Descargar" para descargar el archivo SQL de la
        base de datos.
      </p>

      {/*Se renderiza una lista de copias de seguridad dentro de un componente ListGroup*/}
      <ListGroup>
        {/*Utiliza un mapeo de la lista de copias de seguridad backupList, para renderizar cada copia como un elemento ItemBackup*/}
        {backupList.map((backup, index) => (
          <ItemBackup
            key={index}
            backup={backup}
            handleSelect={handleSelect}
            handleDelete={handleSelectDelete}
            handleDownload={handleSelectDownload}
          />
        ))}
        {/*Tambien pasa las funciones como props a cada elemento ItemBackup*/}
      </ListGroup>

      {/*Un modal o ventana flotante para mostrar el backup seleccionado y para introducir la contraseña*/}
      <Modal show={!!selectedBackup} onHide={() => setSelectedBackup("")}>
        <Modal.Header closeButton>
          <Modal.Title>
            Backup seleccionado para restaurar: {selectedBackup}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRestore}>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setPasswordError(false); // Restablece el error al cambiar la contraseña
                }}
              />
              {passwordError && (
                <div className="text-danger">
                  El campo de contraseña no puede estar vacío.
                </div>
              )}
            </Form.Group>
            <Button variant="primary" type="submit">
              Restaurar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={!!selectedDeleteBackup}
        onHide={() => setSelectedDeleteBackup("")}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Backup seleccionado para eliminar: {selectedDeleteBackup}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleDelete}>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setPasswordError(false); // Restablece el error al cambiar la contraseña
                }}
              />
              {passwordError && (
                <div className="text-danger">
                  El campo de contraseña no puede estar vacío.
                </div>
              )}
            </Form.Group>
            <Button variant="primary" type="submit">
              Eliminar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={!!selectedDownloadBackup}
        onHide={() => setSelectedDownloadBackup("")}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Backup seleccionado para descargar: {selectedDownloadBackup}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleDownload}>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setPasswordError(false); // Restablece el error al cambiar la contraseña
                }}
              />
              {passwordError && (
                <div className="text-danger">
                  El campo de contraseña no puede estar vacío.
                </div>
              )}
            </Form.Group>
            <Button variant="primary" type="submit">
              Descargar archivo
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
