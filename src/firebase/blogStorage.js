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

// Función para cargar una imagen de blog
export async function uploadImageBlog(file) {
  const MAX_SIZE_BYTES = 10 * 1024 * 1024; // Tamaño máximo de 10 MB en bytes
 // Verifica si el tamaño de la imagen supera el límite
  if (file.size > MAX_SIZE_BYTES) {
    throw { status: 400, message: "El tamaño máximo de la imagen es de 10 MB" };
  }
   // Genera identificadores únicos para el nombre de la imagen y el prefijo
  const uniquePrefix = "blog/" + uuidv4(); // Generación de un ID único para el prefijo de los nombres de las imágenes
  const uniqueSuffix = uniquePrefix + "_" + uuidv4(); // Generación de un ID único para el nombre de la imagen

  // Crea una referencia al almacenamiento de Firebase con el nombre único
  const storageRef = ref(storage, uniqueSuffix);
  // Sube el archivo de imagen al almacenamiento de Firebase
  await uploadBytes(storageRef, file);
  // Obtiene la URL de descarga de la imagen subida
  const url = await getDownloadURL(storageRef);
  return { status: 201, message: "Imagen subida correctamente", url };
}

// Función para cargar varias imágenes de blog
export async function uploadImagesBlog(files) {
  const MAX_SIZE_BYTES = 10 * 1024 * 1024; // Tamaño máximo de 10 MB en bytes
  const uniquePrefix = "blog/" + uuidv4(); // Generación de un ID único para el prefijo de los nombres de las imágenes
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

// Función para eliminar una imagen de blog
export async function deleteImageBlog(url) {
  const storageRef = ref(storage, url);
  await deleteObject(storageRef);
  return { status: 200, message: "Imagen eliminada correctamente" };
}

// Función para eliminar varias imágenes de blog
export async function deleteImagesBlog(urls) {
  const storageRefs = urls.map((url) => ref(storage, url));
  await Promise.all(storageRefs.map((storageRef) => deleteObject(storageRef)));
  return { status: 200, message: "Imágenes eliminadas correctamente" };
}

// Función para actualizar una imagen de blog
export async function updateImageBlog(file, url) {
  const MAX_SIZE_BYTES = 10 * 1024 * 1024; // Tamaño máximo de 10 MB en bytes
  if (file.size > MAX_SIZE_BYTES) {
    throw { status: 400, message: "El tamaño máximo de la imagen es de 10 MB" };
  }
  const storageRef = ref(storage, url);
  await uploadBytes(storageRef, file);
  const updatedUrl = await getDownloadURL(storageRef);
  return {
    status: 200,
    message: "Imagen actualizada correctamente",
    url: updatedUrl,
  };
}

// Función para actualizar varias imágenes de blog
export async function updateImagesBlog(files, urls) {
  const MAX_SIZE_BYTES = 10 * 1024 * 1024; // Tamaño máximo de 10 MB en bytes
  if (files.length !== urls.length) {
    throw new Error("El número de archivos no coincide con el número de URLs");
  }
  const updatedUrls = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const url = urls[i];
    if (file.size > MAX_SIZE_BYTES) {
      throw new Error("El tamaño máximo de la imagen es de 10 MB");
    }
    const storageRef = ref(storage, url);
    await uploadBytes(storageRef, file);
    const updatedUrl = await getDownloadURL(storageRef);
    updatedUrls.push(updatedUrl);
  }

  return updatedUrls;
}
