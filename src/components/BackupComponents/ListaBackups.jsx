import { useBackup } from "./BackupContext/BackupProvider";
import { ItemBackup } from "./ItemBackup";
import React, { useState, useEffect } from "react";
import { ListGroup, Card, Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

export function ListaBackups() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [password, setPassword] = useState("");

  const [selectedBackup, setSelectedBackup] = useState("");
  const [selectedDeleteBackup, setSelectedDeleteBackup] = useState("");
  const [selectedDownloadBackup, setSelectedDownloadBackup] = useState("");
  const {
    getListaDeBackups,
    postRestore,
    deleteBackup,
    backupList,
    downloadBackup,
  } = useBackup();

  useEffect(() => {
    const fetchBackupList = async () => {
      await getListaDeBackups();
    };
    fetchBackupList();
  }, []);

  const handleSelect = (backup) => {
    setSelectedBackup(backup);
    setSelectedDeleteBackup("");
    setSelectedDownloadBackup("");
  };

  const handleRestore = async (event) => {
    event.preventDefault();
    try {
      const credentials = {
        password,
        email: usuario.email,
      };
    
      const response = await postRestore(selectedBackup, credentials);
      setSelectedBackup("");
      setSelectedDeleteBackup("");
      setSelectedDownloadBackup("");

      Swal.fire({
        icon: "success",
        title: "Restauración exitosa",
        text: "La copia de seguridad ha sido restaurada con éxito.",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al intentar restaurar la copia de seguridad.",
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

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const credentials = {
        password,
        email: usuario.email,
      };
   
      const response = await deleteBackup(selectedDeleteBackup, credentials);
      setSelectedBackup("");
      setSelectedDeleteBackup("");
      setSelectedDownloadBackup("");

      Swal.fire({
        icon: "success",
        title: "Eliminación exitosa",
        text: "La copia de seguridad ha sido eliminada con éxito.",
      });
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
    try {
      const credentials = {
        password,
        email: usuario.email,
      };

      const response = await downloadBackup(
        selectedDownloadBackup,
        credentials
      );
      setSelectedBackup("");
      setSelectedDeleteBackup("");
      setSelectedDownloadBackup("");

      Swal.fire({
        icon: "success",
        title: "Descarga exitosa",
        text: "La copia de seguridad se ha descargado exitosamente.",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al intentar descargar la copia de seguridad.",
      });
    }
  };

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

      <ListGroup>
        {backupList.map((backup, index) => (
          <ItemBackup
            key={index}
            backup={backup}
            handleSelect={handleSelect}
            handleDelete={handleSelectDelete}
            handleDownload={handleSelectDownload}
          />
        ))}
      </ListGroup>

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
                onChange={(event) => setPassword(event.target.value)}
              />
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
                onChange={(event) => setPassword(event.target.value)}
              />
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
                onChange={(event) => setPassword(event.target.value)}
              />
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
