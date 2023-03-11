import { MyRoutes } from "./routes/routes";
import { UsuarioContextProvider } from "./components/usuarioComponents/UsuariosContext/UsuarioProvider";
import { ProductoContextProvider } from "./components/ProductoComponents/ProductosContext/ProductoProvider";
import { CategoriaContextProvider } from "./components/CategoriaComponents/CategoriasContext/CategoriaProvider";
function App() {
  return (
    <UsuarioContextProvider>
      <ProductoContextProvider>
        <CategoriaContextProvider>
      <div>
        <MyRoutes />
      </div>
      </CategoriaContextProvider>
      </ProductoContextProvider>
    </UsuarioContextProvider>
  );
}

export default App;
