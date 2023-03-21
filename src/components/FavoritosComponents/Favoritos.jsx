import { useProductos } from "../ProductoComponents/ProductosContext/ProductoProvider";

export function Favoritos() {
  const { favoritos } = useProductos();

  return (
    <div>
      <h1>Productos favoritos</h1>
      <ul>
        {favoritos.map((producto) => (
          <li key={producto.id}>
            <a href={`/productos/${producto.id}`}>{producto.nombre}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}