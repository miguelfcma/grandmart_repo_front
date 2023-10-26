import app from "./config";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const storage = getStorage(app);

// Función para cargar una imagen de producto en Firebase Storage.
export async function uploadImageProducto(file) {
  const MAX_SIZE_BYTES = 10 * 1024 * 1024; // Tamaño máximo de 10 MB en bytes
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error("El tamaño máximo de la imagen es de 10 MB");
  }
  const uniquePrefix = "productos/" + uuidv4(); // Generación de un ID único para el prefijo de los nombres de las imágenes
  const uniqueSuffix = uniquePrefix + "_" + uuidv4(); // Generación de un ID único para el nombre de la imagen
  const storageRef = ref(storage, uniqueSuffix);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}

// Función para eliminar una imagen de producto en Firebase Storage.
export async function deleteImageProducto(url) {
  const storageRef = ref(storage, url);
  await deleteObject(storageRef);
}

// Función para eliminar varias imágenes de producto en Firebase Storage.
export async function deleteImagesProducto(urls) {
  const storageRefs = urls.map((url) => ref(storage, url));
  await Promise.all(storageRefs.map((storageRef) => deleteObject(storageRef)));
}

// Función para cargar múltiples imágenes de producto en Firebase Storage.
export async function uploadImagesProducto(files) {
  const MAX_SIZE_BYTES = 10 * 1024 * 1024; // Tamaño máximo de 10 MB en bytes
  const uniquePrefix = "productos/" + uuidv4(); // Generación de un ID único para el prefijo de los nombres de las imágenes
  const urls = [];

  for (const file of files) {
    if (file.size > MAX_SIZE_BYTES) {
      throw new Error("El tamaño máximo de la imagen es de 10 MB");
    }
    const uniqueSuffix = uniquePrefix + "_" + uuidv4(); // Generación de un ID único para el nombre de la imagen
    const storageRef = ref(storage, uniqueSuffix);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    urls.push(url);
  }
  return urls;
}
// Función para actualizar una imagen de producto en Firebase Storage.
export async function updateImageProducto(file, url) {
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

// Función para actualizar varias imágenes de producto en Firebase Storage.
export async function updateImagesProducto(files, urls) {
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
