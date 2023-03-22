import "./Content.css";
import { ListProductos } from "../ProductoComponents/client/ListProductos";
export function Content({ searchTerm }){
    console.log(searchTerm)
    return(
        <>
            <main>
                <section id="hero">
                    <h1>Bienvenido</h1>
                    <p>Encuentra los mejores productos al mejor precio</p>
                    <button>Explora Ahora</button>
                </section>

                <ListProductos searchTerm={searchTerm} />
            </main>
            <footer>
                <p>Derechos Reservados © 2023 Mi Tienda</p>
            </footer>
        </>
    )
}