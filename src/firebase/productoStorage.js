import app from "./config";
import { getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const storage = getStorage(app);

export async function uploadImageProducto(file) {
    const MAX_SIZE_BYTES = 5 * 1024 * 1024; // Tamaño máximo de 5 MB en bytes
  //const MAX_SIZE_BYTES = 500000;
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error('El tamaño máximo de la imagen es de 5 MB');
  }
  const uniqueSuffix = 'productos/' + uuidv4(); // Generación de un ID único para el nombre de la imagen
  const storageRef = ref(storage, uniqueSuffix);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}
