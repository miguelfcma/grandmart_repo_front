import { useProductos } from "../ProductoComponents/ProductosContext/ProductoProvider";
import { Link, useNavigate } from "react-router-dom";
import "../HomePageComponents/NavBar.css";
import "./Favoritos.css";
import { useEffect } from "react";

export function Favoritos() {
  const { favoritos, eliminarFavorito, loadFavoritos } = useProductos();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const navigate = useNavigate();

  useEffect(() => {
    if (usuario && usuario.id) {
      loadFavoritos(usuario.id);
    }
  }, []);

  const handleEliminar = (id_producto) => {
    eliminarFavorito(usuario.id, id_producto);
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
                      <Link to={`/productos/detalles/${producto.producto.id}`}>
                        {producto.producto.nombre}
                      </Link>
                      <div className="eliminar-btn-container">
                        <button
                          className="eliminar-btn"
                          onClick={() => handleEliminar(producto.id)}
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
