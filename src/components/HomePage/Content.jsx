import "./Content.css";

export function Content(){
    return(
        <>
            <main>
                <section id="hero">
                    <h1>Bienvenido</h1>
                    <p>Encuentra los mejores productos al mejor precio</p>
                    <button>Explora Ahora</button>
                </section>

                <section id="destacados">
                    <h2>Productos Destacados</h2>
                    <div className="destacados-grid">
                        <article>
                            <img src="https://via.placeholder.com/250x250" alt="producto destacado" />
                            <h3>Producto Destacado 1</h3>
                            <p>$19.99</p>
                            <button>Añadir al Carrito</button>
                        </article>
                        <article>
                            <img src="https://via.placeholder.com/250x250" alt="producto destacado" />
                            <h3>Producto Destacado 2</h3>
                            <p>$29.99</p>
                            <button>Añadir al Carrito</button>
                        </article>
                        <article>
                            <img src="https://via.placeholder.com/250x250" alt="producto destacado" />
                            <h3>Producto Destacado 3</h3>
                            <p>$39.99</p>
                            <button>Añadir al Carrito</button>
                        </article>
                    </div>
                </section>

                <section id="ofertas">
                    <h2>Ofertas</h2>
                    <div className="ofertas-grid">
                        <article>
                            <img src="https://via.placeholder.com/250x250" alt="oferta" />
                            <h3>Oferta 1</h3>
                            <p>50% de descuento</p>
                            <button>Ver Oferta</button>
                        </article>
                        <article>
                            <img src="https://via.placeholder.com/250x250" alt="oferta" />
                            <h3>Oferta 2</h3>
                            <p>30% de descuento</p>
                            <button>Ver Oferta</button>
                        </article>
                        <article>
                            <img src="https://via.placeholder.com/250x250" alt="oferta" />
                            <h3>Oferta 3</h3>
                            <p>20% de descuento</p>
                            <button>Ver Oferta</button>
                        </article>
                    </div>
                </section>
            </main>
            <footer>
                <p>Derechos Reservados © 2023 Mi Tienda</p>
            </footer>
        </>
    )
}