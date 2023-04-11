import { app } from "./config";
import { getDownloadURL, getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";

const storage = getStorage(app);

async function deleteImages(urls) {
  const storageRefs = urls.map((url) => ref(storage, url));

  for (const storageRef of storageRefs) {
    try {
      await deleteObject(storageRef);
      console.log(`La imagen con URL ${storageRef.toString()} fue eliminada de Firebase Storage`);
    } catch (error) {
      console.warn(`Error al eliminar la imagen con URL ${storageRef.toString()}:`, error);
    }
  }
}

export async function validateAndUpdateImages(urls) {
  const storageRefs = urls.map((url) => ref(storage, url));
  const existingUrls = [];

  // Verificar si las URL ya existen en Firebase Storage
  for (const storageRef of storageRefs) {
    try {
      await getDownloadURL(storageRef);
      existingUrls.push(storageRef.toString());
    } catch (error) {
      console.warn(`La imagen con URL ${storageRef.toString()} no existe en Firebase Storage`);
    }
  }

  // Eliminar las URL que no existen en Firebase Storage
  const deletedUrls = urls.filter((url) => !existingUrls.includes(ref(storage, url).toString()));
  await deleteImages(deletedUrls);

  // Devolver el conjunto actualizado de URL existentes
  return existingUrls.map((url) => url.toString());
}
