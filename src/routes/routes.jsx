import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotFoundPage } from "../pages/NotFoundPage";

// Páginas de administrador
import { CategoriasPage } from "../pages/DashAdminPages/DashPages/CategoriasPage";
import { DashAdmin } from "../pages/DashAdminPages/DashAdmin";
import { DatabaseBackup } from "../pages/DashAdminPages/DashPages/DatabaseBackup";
import { PerfilPageAdmin } from "../pages/DashAdminPages/DashPages/PerfilPageAdmin";
import { ProductoDetallesAdminPage } from "../pages/DashAdminPages/DashPages/ProductosPage/ProductoDetallesAdminPage";
import { ProductosPage } from "../pages/DashAdminPages/DashPages/ProductosPage";
import { RegistroProductoPage1 } from "../pages/DashAdminPages/DashPages/ProductosPage/RegistroProductoPage1";
import { RegistroProductoPage2 } from "../pages/DashAdminPages/DashPages/ProductosPage/RegistroProductoPage2";
import { ServiciosPage } from "../pages/DashAdminPages/DashPages/ServiciosPage";
import { UsuariosPage } from "../pages/DashAdminPages/DashPages/UsuariosPage";

// Páginas de cliente
import { CompraCarrito } from "../pages/HomePages/CarritoPage/CompraCarrito";
import { DashClient } from "../pages/DashClientPages/DashClient";
import { PedidosClient } from "../pages/DashClientPages/DashPages/PedidosClient";
import { PerfilPageClient } from "../pages/DashClientPages/DashPages/PerfilPageClient";
import { ProductoDetallesClientPage } from "../pages/DashClientPages/DashPages/ProductosPage/ProductoDetallesClientPage";
import { ProductosByCategoriaPage } from "../pages/HomePages/Productos-Pages/ProductosByCategoriaPage";
import { ProductosClient } from "../pages/DashClientPages/DashPages/ProductosClient";
import { RegistroProductoClientPage1 } from "../pages/DashClientPages/DashPages/ProductosPage/RegistroProductoClientPage1";
import { RegistroProductoClientPage2 } from "../pages/DashClientPages/DashPages/ProductosPage/RegistroProductoClientPage2";
import { ServiciosClient } from "../pages/DashClientPages/DashPages/ServiciosClient";

// Páginas de inicio de sesión y registro
import { BlogPage } from "../pages/HomePages/Blog-Pages/BlogPage";
import { HomePage } from "../pages/HomePages/HomePage";
import { LoginPage } from "../pages/HomePages/Login-Signup-Pages/LoginPage";
import { RecovPassPage } from "../pages/HomePages/Login-Signup-Pages/RecovPassPage";
import { SignupPage } from "../pages/HomePages/Login-Signup-Pages/SignupPage";

// Páginas de productos
import { ProductosDetallesPage } from "../pages/HomePages/productos-Pages/ProductosDetallesPage";

export function MyRoutes() {
  return (
    <Router>
      <Routes>
        {/* Rutas para la página de inicio y autenticación */}
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/blog" element={<BlogPage />} />

        {/* Rutas para administrador */}
        <Route exact path="/dashAdmin" element={<DashAdmin />} />
        <Route exact path="/dashAdmin/usuarios" element={<UsuariosPage />} />
        <Route
          exact
          path="/dashAdmin/categorias"
          element={<CategoriasPage />}
        />
        <Route exact path="/dashAdmin/productos" element={<ProductosPage />} />
        <Route
          exact
          path="/dashAdmin/productos/registro-producto"
          element={<RegistroProductoPage1 />}
        />
        <Route
          exact
          path="/dashAdmin/productos/registro-producto/:idProducto"
          element={<RegistroProductoPage2 />}
        />
        <Route
          exact
          path="/dashAdmin/productos/detalles/:id"
          element={<ProductoDetallesAdminPage />}
        />
        <Route exact path="/dashAdmin/servicios" element={<ServiciosPage />} />
        <Route exact path="/dashAdmin/perfil" element={<PerfilPageAdmin />} />
        <Route
          exact
          path="/dashAdmin/database-backup"
          element={<DatabaseBackup />}
        />

        {/* Rutas para cliente */}
        <Route exact path="/dashClient" element={<DashClient />} />
        <Route
          exact
          path="/dashClient/productos"
          element={<ProductosClient />}
        />
        <Route
          exact
          path="/dashClient/productos/registro-producto"
          element={<RegistroProductoClientPage1 />}
        />
        <Route
          exact
          path="/dashClient/productos/registro-producto/:idProducto"
          element={<RegistroProductoClientPage2 />}
        />
        <Route
          exact
          path="/dashClient/productos/detalles/:id"
          element={<ProductoDetallesClientPage />}
        />
        <Route
          exact
          path="/dashClient/servicios"
          element={<ServiciosClient />}
        />
        <Route exact path="/dashClient/pedidos" element={<PedidosClient />} />
        <Route exact path="/dashClient/perfil" element={<PerfilPageClient />} />

        {/* Otras rutas */}
        <Route
          exact
          path="/productos/detalles/:id"
          element={<ProductosDetallesPage />}
        />
        <Route
          exact
          path="/productos/categoria/:id_categoria"
          element={<ProductosByCategoriaPage />}
        />
        <Route exact path="/resumen-compras" element={<CompraCarrito />} />
        <Route exact path="/recuperar-contrasena" element={<RecovPassPage />} />

        {/* Ruta para manejar las rutas no encontradas */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
