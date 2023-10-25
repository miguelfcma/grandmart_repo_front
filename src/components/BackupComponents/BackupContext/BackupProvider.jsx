//Este archivo funciona para gestionar BackupContext, esto para compartir datos y funciones relacionadas con las copias de seguridad

import { useState, useContext } from "react";
import {
  getBackupRequest,
  postRestoreRequest,
  getListaDeBackupsRequest,
  deleteBackupRequest,
  downloadFile,
} from "../../../API/BDBackupApiRest/bdBackup.api";
import { BackupContext } from "./BackupContext";

//Esta funcion useBackup utiliza el hook useContext para obtener el contexto
export const useBackup = () => {
  const context = useContext(BackupContext);
  if (context === undefined) {
    //si no encuentra un contexto valido regresa un error
    throw new Error(
      "useBackup debe ser utilizado dentro de un BackupContextProvider"
    );
  }
  //pero si lo encuentra devuelve el contexto que contiene las funciones y datos
  return context;
};


//Este componente actua como el Provider del contexto
export const BackupContextProvider = ({ children }) => {
  //Contiene un estado local backupList que contiene una lista de copias de seguridad de la base de datos
  const [backupList, setBackupList] = useState([]);
  //Se definen funciones asincronas para interactuar con las copias de seguridad
  //Se hace una solicitud para obtener una copia de seguridad
  const getBackup = async (credentials) => {
    try {
      const response = await getBackupRequest(credentials);

      if (response.status === 200) {
        await getListaDeBackups();
        return response;
      } else {
        return response;
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Se hace una solicitud para restaurar una copia de seguridad
  const postRestore = async (filename, credentials) => {
    try {
      const response = await postRestoreRequest(filename, credentials);
      if (response.status === 200) {
        await getListaDeBackups();
        return response;
      } else {
        return response;
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Se realiza una solicitud para obtener una lista de copias de seguridad 
  const getListaDeBackups = async () => {
    try {
      const response = await getListaDeBackupsRequest();
      //y actualiza el estado backupList con la respuesta
      if (response.status === 200) {
        setBackupList(response.data);
        return response.data;
      } else {
        throw new Error(
          "No se pudo obtener la lista de copias de seguridad de la base de datos"
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  //se realiza una  solicitud para eliminar una copia de seguridad 
  const deleteBackup = async (filename, credentials) => {
    try {
      const response = await deleteBackupRequest(filename, credentials);
      if (response.status === 200) {
        const updatedBackupList = backupList.filter(
          (backup) => backup.filename !== filename
        );
        setBackupList(updatedBackupList);
        await getListaDeBackups(); // y actualiza la lista despues de eliminar una copia de seguridad
        return response;
      } else {
        return response;
      }
    } catch (error) {
      console.error(error);
    }
  };

  //realiza solicitud para descargar una copia de seguridad
  const downloadBackup = async (filename, credentials) => {
    try {
      const response = await downloadFile(filename, credentials);
  
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  return (

    //El componente BackupContext.Provider proporciona el contexto a los componentes secundarios, pasando las funciones y datos en el value prop 
    <BackupContext.Provider
      value={{
        getBackup,
        postRestore,
        getListaDeBackups,
        deleteBackup,
        backupList,
        downloadBackup,
      }}
    >
      {children}
    </BackupContext.Provider>
  );
};
