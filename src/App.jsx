import { MyRoutes } from "./routes/routes";
import { UsuarioContextProvider } from "./components/usuarioComponents/UsuariosContext/UsuarioProvider";
import { ProductoContextProvider } from "./components/ProductoComponents/ProductosContext/ProductoProvider";
import { CategoriaContextProvider } from "./components/CategoriaComponents/CategoriasContext/CategoriaProvider";
import { BlogContextProvider } from "./components/BlogComponents/BlogContext/BlogProvider";
import { ServicioContextProvider } from "./components/ServicioComponents/ServiciosContext/ServicioProvider";
import { OrdenContextProvider } from "./components/OrdenesComponents/OrdenesContext/OrdenProvider";

import "./globalStyles.css";
import { BackupContextProvider } from "./components/BackupComponents/BackupContext/BackupProvider";

function App() {
  return (
    /* Proveedor de contexto para la copia de seguridad */
    <BackupContextProvider>
      {/* Proveedor de contexto para las órdenes */}
      <OrdenContextProvider>
        {/* Proveedor de contexto para los servicios */}
        <ServicioContextProvider>
          {/* Proveedor de contexto para los blogs */}
          <BlogContextProvider>
            {/* Proveedor de contexto para los usuarios */}
            <UsuarioContextProvider>
              {/* Proveedor de contexto para los productos */}
              <ProductoContextProvider>
                {/* Proveedor de contexto para las categorías */}
                <CategoriaContextProvider>
                  <div>
                    {/* Componente de rutas personalizado */}
                    <MyRoutes />
                  </div>
                </CategoriaContextProvider>
              </ProductoContextProvider>
            </UsuarioContextProvider>
          </BlogContextProvider>
        </ServicioContextProvider>
      </OrdenContextProvider>
    </BackupContextProvider>
  );
}

export default App;
