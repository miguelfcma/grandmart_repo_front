import { useProductos } from "../ProductoComponents/ProductosContext/ProductoProvider";
import "../HomePageComponents/NavBar.css";

export function Favoritos() {
  const { favoritos } = useProductos();

  return (
    <div className="navbar-links">
      <ul>
        <li className="dropdown">
          <a href="#" className="dropbtn">
            Favoritos
          </a>
          <div className="dropdown-content">
            {favoritos.map((producto) => (
              <a key={producto.id} href={`/productos/${producto.id}`}>
                {producto.nombre}
              </a>
            ))}
          </div>
        </li>
      </ul>
    </div>
  );
}
