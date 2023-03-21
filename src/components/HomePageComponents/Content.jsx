import "./Content.css";
import { ListProductos } from "../ProductoComponents/client/ListProductos";
export function Content(){
    return(
        <>
            <main>
                <section id="hero">
                    <h1>Bienvenido</h1>
                    <p>Encuentra los mejores productos al mejor precio</p>
                    <button>Explora Ahora</button>
                </section>

                <ListProductos></ListProductos>
            </main>
            <footer>
                <p>Derechos Reservados © 2023 Mi Tienda</p>
            </footer>
        </>
    )
}