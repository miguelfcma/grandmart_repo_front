import { app } from "./config";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

// Obtenemos una referencia al servicio de almacenamiento de Firebase utilizando la aplicación Firebase.
const storage = getStorage(app);

// Función para eliminar una lista de imágenes desde Firebase Storage.
async function deleteImages(urls) {
  // Crear referencias a los objetos de almacenamiento correspondientes a las URLs proporcionadas.
  const storageRefs = urls.map((url) => ref(storage, url));

  // Recorremos las referencias y tratamos de eliminar cada imagen.
  for (const storageRef of storageRefs) {
    try {
      await deleteObject(storageRef);
      console.log(
        `La imagen con URL ${storageRef.toString()} fue eliminada de Firebase Storage`
      );
    } catch (error) {
      console.warn(
        `Error al eliminar la imagen con URL ${storageRef.toString()}:`,
        error
      );
    }
  }
}

// Función para validar y actualizar un conjunto de URLs de imágenes.
export async function validateAndUpdateImages(urls) {
  // Crear referencias a los objetos de almacenamiento correspondientes a las URLs proporcionadas.
  const storageRefs = urls.map((url) => ref(storage, url));
  const existingUrls = [];

  // Verificar si las URL ya existen en Firebase Storage.
  for (const storageRef of storageRefs) {
    try {
      await getDownloadURL(storageRef);
      existingUrls.push(storageRef.toString());
    } catch (error) {
      console.warn(
        `La imagen con URL ${storageRef.toString()} no existe en Firebase Storage`
      );
    }
  }

  // Eliminar las URL que no existen en Firebase Storage.
  const deletedUrls = urls.filter(
    (url) => !existingUrls.includes(ref(storage, url).toString())
  );
  await deleteImages(deletedUrls);

  // Devolver el conjunto actualizado de URL existentes.
  return existingUrls.map((url) => url.toString());
}
