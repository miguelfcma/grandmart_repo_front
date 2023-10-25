import React from 'react'; // Importa la biblioteca React
import ReactDOM from 'react-dom/client'; // Importa ReactDOM para renderizar la aplicación
import App from './App'; // Importa el componente principal App
import 'boxicons'; // Importa el conjunto de iconos Boxicons
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el CSS de Bootstrap
import 'sweetalert2/dist/sweetalert2.css'; // Importa el CSS de SweetAlert2

ReactDOM.createRoot(document.getElementById('root')).render( // Crea una raíz de renderización en el elemento HTML con id "root"
  <React.StrictMode> 
    <App /> 
  </React.StrictMode>,
);
// Utiliza React.StrictMode para identificar problemas potenciales en la aplicación durante el desarrollo

// Renderiza el componente principal de la aplicación, App