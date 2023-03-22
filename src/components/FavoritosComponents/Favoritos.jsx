import { useProductos } from "../ProductoComponents/ProductosContext/ProductoProvider";
import "../HomePageComponents/NavBar.css";

export function Favoritos() {
  const { favoritos, eliminarFavorito } = useProductos();
  const handleEliminar = (producto) => {
    eliminarFavorito(producto);
  };
  return (
    <div className="navbar-links">
      <ul>
        <li className="dropdown">
          <a href="#" className="dropbtn">
            Favoritos
          </a>
          <div className="dropdown-content">
            {favoritos.map((producto) => (
              <div key={producto.id}>
                <a href={`/productos/${producto.id}`}>{producto.nombre}</a>
                <button onClick={() => handleEliminar(producto)}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </li>
      </ul>
    </div>
  );
}
