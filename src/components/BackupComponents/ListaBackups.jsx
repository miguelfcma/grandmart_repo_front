import { useBackup } from "./BackupContext/BackupProvider";
import { ItemBackup } from "./ItemBackup";
import React, { useState, useEffect } from "react";
import { ListGroup, Card, Button, Form } from "react-bootstrap";

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
      console.log(credentials);
      const response = await postRestore(selectedBackup, credentials);
      setSelectedBackup("");
      setSelectedDeleteBackup("");
      setSelectedDownloadBackup("");
      console.log(response);
      // Aquí puedes agregar la lógica para mostrar un mensaje de éxito o error
    } catch (error) {
      console.error(error);
      // Aquí puedes agregar la lógica para mostrar un mensaje de error
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
      console.log(credentials);
      const response = await deleteBackup(selectedDeleteBackup, credentials);
      setSelectedBackup("");
      setSelectedDeleteBackup("");
      setSelectedDownloadBackup("");
      console.log(response);
      // Aquí puedes agregar la lógica para mostrar un mensaje de éxito o error
    } catch (error) {
      console.error(error);
      // Aquí puedes agregar la lógica para mostrar un mensaje de error
    }
  };
  const handleDownload = async (event) => {
    event.preventDefault();
    try {
      const credentials = {
        password,
        email: usuario.email,
      };
      console.log("download", credentials);
      const response = await downloadBackup(selectedDownloadBackup, credentials);
      setSelectedBackup("");
      setSelectedDeleteBackup("");
      setSelectedDownloadBackup("");
      console.log(response);
      // Aquí puedes agregar la lógica para mostrar un mensaje de éxito o error
    } catch (error) {
      console.error(error);
      // Aquí puedes agregar la lógica para mostrar un mensaje de error
    }

  };
  return (
    <div>
      <h2>Lista de copias de seguridad:</h2>
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
      {selectedBackup && (
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>
              Backup seleccionado para restaurar: {selectedBackup}
            </Card.Title>
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
          </Card.Body>
        </Card>
      )}

      {selectedDeleteBackup && (
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>
              Backup seleccionado para eliminar: {selectedDeleteBackup}
            </Card.Title>
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
          </Card.Body>
        </Card>
      )}

      {selectedDownloadBackup && (
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>
              Backup seleccionado para descargar: {selectedDownloadBackup}
            </Card.Title>
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
          </Card.Body>
        </Card>
      )}
    </div>
  );
}
