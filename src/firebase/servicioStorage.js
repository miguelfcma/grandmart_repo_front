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

export async function uploadImageServicio(file) {
  const MAX_SIZE_BYTES = 10 * 1024 * 1024; // Tamaño máximo de 10 MB en bytes
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error("El tamaño máximo de la imagen es de 10 MB");
  }
  const uniquePrefix = "servicios/" + uuidv4(); // Generación de un ID único para el prefijo de los nombres de las imágenes
  const uniqueSuffix = uniquePrefix + "_" + uuidv4(); // Generación de un ID único para el nombre de la imagen
  const storageRef = ref(storage, uniqueSuffix);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}

export async function deleteImageServicio(url) {
  const storageRef = ref(storage, url);
  await deleteObject(storageRef);
}

export async function deleteImagesServicio(urls) {
  const storageRefs = urls.map((url) => ref(storage, url));
  await Promise.all(storageRefs.map((storageRef) => deleteObject(storageRef)));
}

export async function uploadImagesServicio(files) {
  const MAX_SIZE_BYTES = 10 * 1024 * 1024; // Tamaño máximo de 10 MB en bytes
  const uniquePrefix = "servicios/" + uuidv4(); // Generación de un ID único para el prefijo de los nombres de las imágenes
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


export async function updateImageServicio(file, url) {
    const MAX_SIZE_BYTES = 10 * 1024 * 1024; // Tamaño máximo de 10 MB en bytes
    if (file.size > MAX_SIZE_BYTES) {
      throw new Error('El tamaño máximo de la imagen es de 10 MB');
    }
    const storageRef = ref(storage, url);
    await uploadBytes(storageRef, file);
    const updatedUrl = await getDownloadURL(storageRef);
    return updatedUrl;
  }
  

  export async function updateImagesServicio(files, urls) {
    const MAX_SIZE_BYTES = 10 * 1024 * 1024; // Tamaño máximo de 10 MB en bytes
    if (files.length !== urls.length) {
      throw new Error('El número de archivos no coincide con el número de URLs');
    }
    const updatedUrls = [];
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = urls[i];
      if (file.size > MAX_SIZE_BYTES) {
        throw new Error('El tamaño máximo de la imagen es de 10 MB');
      }
      const storageRef = ref(storage, url);
      await uploadBytes(storageRef, file);
      const updatedUrl = await getDownloadURL(storageRef);
      updatedUrls.push(updatedUrl);
    }
  
    return updatedUrls;
  }
  