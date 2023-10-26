// Importamos la función 'initializeApp' desde la librería Firebase.
import { initializeApp } from "firebase/app";

// Configuración de Firebase que contiene los detalles de autenticación y el proyecto.
const firebaseConfig = {
  apiKey: "AIzaSyANEWrOPw_5a_3NftgYVEh-dPhcvGXx5-k",
  authDomain: "grandmart-51065.firebaseapp.com",
  projectId: "grandmart-51065",
  storageBucket: "grandmart-51065.appspot.com",
  messagingSenderId: "589248633150",
  appId: "1:589248633150:web:170209812c5aaffc2ef46f",
};

// Inicializamos la aplicación Firebase utilizando la configuración proporcionada.
const app = initializeApp(firebaseConfig);

// Exportamos la aplicación Firebase inicializada para su uso en otros archivos.
export default app;
