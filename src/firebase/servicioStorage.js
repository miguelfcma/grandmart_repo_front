// Importamos la aplicación Firebase desde el archivo 'config'.
import app from "./config";

// Importamos las funciones y utilidades necesarias de Firebase Storage.
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

// Importamos la función 'uuidv4' de la librería 'uuid' para generar identificadores únicos.
import { v4 as uuidv4 } from "uuid";

// Obtenemos una referencia al servicio de almacenamiento de Firebase utilizando la aplicación Firebase.
const storage = getStorage(app);

// Función para cargar una imagen de servicio en Firebase Storage.
export async function uploadImageServicio(file) {
  const MAX_SIZE_BYTES = 10 * 1024 * 1024; // Tamaño máximo de 10 MB en bytes

  // Verificamos si el tamaño del archivo excede el límite.
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error("El tamaño máximo de la imagen es de 10 MB");
  }

  // Generamos identificadores únicos para el prefijo y el nombre de la imagen.
  const uniquePrefix = "servicios/" + uuidv4();
  const uniqueSuffix = uniquePrefix + "_" + uuidv4();

  // Creamos una referencia al archivo en Firebase Storage y subimos el archivo.
  const storageRef = ref(storage, uniqueSuffix);
  await uploadBytes(storageRef, file);

  // Obtenemos la URL de descarga de la imagen y la devolvemos.
  const url = await getDownloadURL(storageRef);
  return url;
}

// Función para eliminar una imagen de servicio en Firebase Storage.
export async function deleteImageServicio(url) {
  const storageRef = ref(storage, url);

  // Eliminamos el objeto (imagen) en Firebase Storage.
  await deleteObject(storageRef);
}

// Función para eliminar varias imágenes de servicio en Firebase Storage.
export async function deleteImagesServicio(urls) {
  // Creamos referencias a los objetos a eliminar.
  const storageRefs = urls.map((url) => ref(storage, url));

  // Eliminamos los objetos (imágenes) en Firebase Storage en paralelo.
  await Promise.all(storageRefs.map((storageRef) => deleteObject(storageRef)));
}

// Función para cargar múltiples imágenes de servicio en Firebase Storage.
export async function uploadImagesServicio(files) {
  const MAX_SIZE_BYTES = 10 * 1024 * 1024; // Tamaño máximo de 10 MB en bytes

  // Generamos un prefijo único para los nombres de las imágenes.
  const uniquePrefix = "servicios/" + uuidv4();

  // Array para almacenar las URLs de las imágenes subidas.
  const urls = [];

  for (const file of files) {
    // Verificamos si el tamaño del archivo excede el límite.
    if (file.size > MAX_SIZE_BYTES) {
      throw new Error("El tamaño máximo de la imagen es de 10 MB");
    }

    // Generamos un nombre de archivo único.
    const uniqueSuffix = uniquePrefix + "_" + uuidv4();

    // Creamos una referencia al archivo en Firebase Storage y subimos el archivo.
    const storageRef = ref(storage, uniqueSuffix);
    await uploadBytes(storageRef, file);

    // Obtenemos la URL de descarga de la imagen y la agregamos al array.
    const url = await getDownloadURL(storageRef);
    urls.push(url);
  }

  // Devolvemos las URLs de las imágenes subidas.
  return urls;
}

// Función para actualizar una imagen de servicio en Firebase Storage.
export async function updateImageServicio(file, url) {
  const MAX_SIZE_BYTES = 10 * 1024 * 1024; // Tamaño máximo de 10 MB en bytes

  // Verificamos si el tamaño del archivo excede el límite.
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error("El tamaño máximo de la imagen es de 10 MB");
  }

  // Creamos una referencia al archivo existente en Firebase Storage.
  const storageRef = ref(storage, url);

  // Subimos el nuevo archivo para reemplazar la imagen existente.
  await uploadBytes(storageRef, file);

  // Obtenemos la URL actualizada de la imagen y la devolvemos.
  const updatedUrl = await getDownloadURL(storageRef);

  return updatedUrl;
}

// Función para actualizar varias imágenes de servicio en Firebase Storage.
export async function updateImagesServicio(files, urls) {
  const MAX_SIZE_BYTES = 10 * 1024 * 1024; // Tamaño máximo de 10 MB en bytes

  // Verificamos que el número de archivos coincida con el número de URLs.
  if (files.length !== urls.length) {
    throw new Error("El número de archivos no coincide con el número de URLs");
  }

  // Array para almacenar las URLs actualizadas de las imágenes.
  const updatedUrls = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const url = urls[i];

    // Verificamos si el tamaño del archivo excede el límite.
    if (file.size > MAX_SIZE_BYTES) {
      throw new Error("El tamaño máximo de la imagen es de 10 MB");
    }

    // Creamos una referencia al archivo existente en Firebase Storage.
    const storageRef = ref(storage, url);

    // Subimos el nuevo archivo para reemplazar la imagen existente.
    await uploadBytes(storageRef, file);

    // Obtenemos la URL actualizada de la imagen y la agregamos al array.
    const updatedUrl = await getDownloadURL(storageRef);
    updatedUrls.push(updatedUrl);
  }

  // Devolvemos las URLs actualizadas de las imágenes.
  return updatedUrls;
}
