import { useEffect, useState } from "react";
import { CardProducto } from "./client/CardProducto";
import "./ListProductsGeneral.css";
import { useProductos } from "./ProductosContext/ProductoProvider";

export function ListProductsGeneral() {
  const { productos, loadProductos } = useProductos();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  useEffect(() => {
    loadProductos();
  }, []);

  function renderMain() {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productos.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

    if (currentProducts.length === 0) {
      return <h1>No hay productos registrados</h1>;
    } else {
      return currentProducts.map((producto) => (
        <CardProducto key={producto.id} producto={producto} />
      ));
    }
  }

  function renderPagination() {
    const totalPages = Math.ceil(productos.length / productsPerPage);
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <a
          key={i}
          className={i === currentPage ? "active" : ""}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </a>
      );
    }

    return <div className="pagination">{pages}</div>;
  }

  return (
    <>
      <h2 className="titulo">Lista de productos:</h2>
      <div className="list-productos">{renderMain()}</div>
      {renderPagination()}
    </>
  );
}
