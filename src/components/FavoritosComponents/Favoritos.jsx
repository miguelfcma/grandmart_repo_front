import { useProductos } from "../ProductoComponents/ProductosContext/ProductoProvider";
import "../HomePageComponents/NavBar.css";
import "./Favoritos.css";
export function Favoritos() {
  const { favoritos, eliminarFavorito } = useProductos();

  const handleEliminar = (producto) => {
    eliminarFavorito(producto);
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
                      <a href={`/productos/detalles/${producto.id}`}>
                        {producto.nombre}
                      </a>
                      <div className="eliminar-btn-container">
                        <button
                          className="eliminar-btn"
                          onClick={() => handleEliminar(producto)}
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
