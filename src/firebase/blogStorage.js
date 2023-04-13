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

export async function uploadImageBlog(file) {
  const MAX_SIZE_BYTES = 10 * 1024 * 1024; // Tamaño máximo de 10 MB en bytes
  if (file.size > MAX_SIZE_BYTES) {
    throw { status: 400, message: "El tamaño máximo de la imagen es de 10 MB" };
  }
  const uniquePrefix = "blog/" + uuidv4(); // Generación de un ID único para el prefijo de los nombres de las imágenes
  const uniqueSuffix = uniquePrefix + "_" + uuidv4(); // Generación de un ID único para el nombre de la imagen
  const storageRef = ref(storage, uniqueSuffix);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return { status: 201, message: "Imagen subida correctamente", url };
}

export async function deleteImageBlog(url) {
  const storageRef = ref(storage, url);
  await deleteObject(storageRef);
  return { status: 200, message: "Imagen eliminada correctamente" };
}

export async function deleteImagesBlog(urls) {
  const storageRefs = urls.map((url) => ref(storage, url));
  await Promise.all(storageRefs.map((storageRef) => deleteObject(storageRef)));
  return { status: 200, message: "Imágenes eliminadas correctamente" };
}

export async function uploadImagesBlog(files) {
  const MAX_SIZE_BYTES = 10 * 1024 * 1024; // Tamaño máximo de 10 MB en bytes
  const uniquePrefix = "blog/" + uuidv4(); // Generación de un ID único para el prefijo de los nombres de las imágenes
  const urls = [];

  for (const file of files) {
    if (file.size > MAX_SIZE_BYTES) {
      throw {
        status: 400,
        message: "El tamaño máximo de la imagen es de 10 MB",
      };
    }
    const uniqueSuffix = uniquePrefix + "_" + uuidv4(); // Generación de un ID único para el nombre de la imagen
    const storageRef = ref(storage, uniqueSuffix);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    urls.push(url);
  }

  return { status: 201, message: "Imágenes subidas correctamente", urls };
}

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
