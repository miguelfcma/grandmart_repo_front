import { MyRoutes } from "./routes/routes";
import { UsuarioContextProvider } from "./components/usuarioComponents/UsuariosContext/UsuarioProvider";
import { ProductoContextProvider } from "./components/ProductoComponents/ProductosContext/ProductoProvider";
import { CategoriaContextProvider } from "./components/CategoriaComponents/CategoriasContext/CategoriaProvider";
import { BlogContextProvider } from "./components/BlogComponents/BlogContext/BlogProvider";
import './globalStyles.css';
function App() {
  return (
    <BlogContextProvider>
      <UsuarioContextProvider>
        <ProductoContextProvider>
          <CategoriaContextProvider>
            <div>
              <MyRoutes />
            </div>
          </CategoriaContextProvider>
        </ProductoContextProvider>
      </UsuarioContextProvider>
    </BlogContextProvider>
  );
}

export default App;
