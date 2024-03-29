//Este archivo muestra los favoritos agregados por cada perfil de cliente

import { useProductos } from "../ProductoComponents/ProductosContext/ProductoProvider";
import { Link, useNavigate } from "react-router-dom";
import "../HomePageComponents/NavBar.css";
import "./Favoritos.css";
import { useEffect } from "react";

export function Favoritos() {
  // Acceder a funciones y datos relacionados con los productos desde el contexto
  const { favoritos, eliminarFavorito, loadFavoritos } = useProductos();

  // Obtener los datos del usuario almacenados en el almacenamiento local
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Acceder a la funcion de navegación proporcionada por React Router
  const navigate = useNavigate();

  // Cargar la lista de productos favoritos del usuario al cargar el componente
  useEffect(() => {
    if (usuario && usuario.id) {
      loadFavoritos(usuario.id);
    }
  }, []);

  // Manejar la eliminación de un producto de la lista de favoritos
  const handleEliminar = async (id_producto) => {
    await eliminarFavorito(usuario.id, id_producto);
  };

  return (
    <div className="navbar-links">
      <ul>
        <li className="dropdown">
          {favoritos.length === 0 ? (
            <div></div>
          ) : (
            <div className="favoritos-count">{favoritos.length}</div>
          )}
          Favoritos
          <div className="dropdown-content">
            <div className="favoritos-dropdown">
              {favoritos.length === 0 ? (
                <p>No has agregado favoritos.</p>
              ) : (
                <>
                  {favoritos.map((producto) => (
                    <div key={producto.id} className="favoritos-item">
                      <div className="favoritos-item-nombre">
                        <Link
                          to={`/productos/detalles/${producto.producto.id}`}
                        >
                          {producto.producto.nombre}
                        </Link>
                      </div>
                      <div className="eliminar-btn-container">
                        <button
                          className="eliminar-btn"
                          onClick={() => handleEliminar(producto.producto.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
