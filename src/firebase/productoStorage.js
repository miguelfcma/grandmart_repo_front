import app from "./config";
import { getDownloadURL, getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const storage = getStorage(app);

export async function uploadImageProducto(file) {
  const MAX_SIZE_BYTES = 10 * 1024 * 1024; // Tamaño máximo de 10 MB en bytes
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error('El tamaño máximo de la imagen es de 10 MB');
  }
  const uniquePrefix = 'productos/' + uuidv4(); // Generación de un ID único para el prefijo de los nombres de las imágenes
  const uniqueSuffix = uniquePrefix + '_' + uuidv4(); // Generación de un ID único para el nombre de la imagen
  const storageRef = ref(storage, uniqueSuffix);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}

export async function deleteImageProducto(url) {
  const storageRef = ref(storage, url);
  await deleteObject(storageRef);
}

export async function deleteImagesProducto(urls) {
  const storageRefs = urls.map((url) => ref(storage, url));
  await Promise.all(storageRefs.map((storageRef) => deleteObject(storageRef)));
}

export async function uploadImagesProducto(files) {
  const MAX_SIZE_BYTES = 10 * 1024 * 1024; // Tamaño máximo de 10 MB en bytes
  const uniquePrefix = 'productos/' + uuidv4(); // Generación de un ID único para el prefijo de los nombres de las imágenes
  const urls = [];

  for (const file of files) {
    if (file.size > MAX_SIZE_BYTES) {
      throw new Error('El tamaño máximo de la imagen es de 10 MB');
    }
    const uniqueSuffix = uniquePrefix + '_' + uuidv4(); // Generación de un ID único para el nombre de la imagen
    const storageRef = ref(storage, uniqueSuffix);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    urls.push(url);
  }

  return urls;
}
