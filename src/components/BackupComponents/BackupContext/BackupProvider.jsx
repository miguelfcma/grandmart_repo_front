import { useState, useContext } from "react";
import {
  getBackupRequest,
  postRestoreRequest,
  getListaDeBackupsRequest,
  deleteBackupRequest,
  downloadFile
} from "../../../API/BDBackupApiRest/bdBackup.api";
import { BackupContext } from "./BackupContext";

export const useBackup = () => {
  const context = useContext(BackupContext);
  if (context === undefined) {
    throw new Error(
      "useBackup debe ser utilizado dentro de un BackupContextProvider"
    );
  }
  return context;
};


export const BackupContextProvider = ({ children }) => {
  const [backupList, setBackupList] = useState([]);
  
  const getBackup = async (credentials) => {
    try {
      const response = await getBackupRequest(credentials);
      if (response.status === 200) {
        await getListaDeBackups();
      } else {
        throw new Error(
          "No se pudo obtener la copia de seguridad de la base de datos"
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const postRestore = async (filename,credentials) => {
    try {
      const response = await postRestoreRequest(filename,credentials);
      if (response.status === 200) {
        await getListaDeBackups();
      } else {
        throw new Error(
          "No se pudo restaurar la base de datos a partir de la copia de seguridad"
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getListaDeBackups = async () => {
    try {
      const response = await getListaDeBackupsRequest();
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

  const deleteBackup = async (filename,credentials) => {
    try {
      const response = await deleteBackupRequest(filename,credentials);
      if (response.status === 200) {
        const updatedBackupList = backupList.filter(
          (backup) => backup.filename !== filename
        );
        setBackupList(updatedBackupList);
        await getListaDeBackups(); // Actualiza la lista después de eliminar una copia de seguridad
        return response.data;
      } else {
        throw new Error(
          "No se pudo eliminar la copia de seguridad de la base de datos"
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  const downloadBackup = async (filename,credentials) => {
    try {
       await downloadFile(filename,credentials);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <BackupContext.Provider
      value={{
        getBackup,
        postRestore,
        getListaDeBackups,
        deleteBackup,
        backupList,
        downloadBackup
      }}
    >
      {children}
    </BackupContext.Provider>
  );
};
