import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotFoundPage } from "../pages/NotFoundPage";

// Páginas de administrador
import { CategoriasPageAdmin } from "../pages/DashAdminPages/DashPages/CategoriasPageAdmin";
import { DashAdmin } from "../pages/DashAdminPages/DashAdmin";
import { DatabaseBackupAdmin } from "../pages/DashAdminPages/DashPages/DatabaseBackupAdmin";
import { PerfilPageAdmin } from "../pages/DashAdminPages/DashPages/PerfilPageAdmin";
import { ProductoDetallesAdminPage } from "../pages/DashAdminPages/DashPages/ProductosPageAdmin/ProductoDetallesAdminPage";
import { ProductosPageAdmin } from "../pages/DashAdminPages/DashPages/ProductosPageAdmin";
import { RegistroProductoAdminPage1 } from "../pages/DashAdminPages/DashPages/ProductosPageAdmin/RegistroProductoAdminPage1";
import { RegistroProductoAdminPage2 } from "../pages/DashAdminPages/DashPages/ProductosPageAdmin/RegistroProductoAdminage2";
import { ServiciosPageAdmin } from "../pages/DashAdminPages/DashPages/ServiciosPageAdmin";
import { UsuariosPageAdmin } from "../pages/DashAdminPages/DashPages/UsuariosPageAdmin";

// Páginas de cliente
import { CompraCarrito } from "../pages/HomePages/CarritoPage/CompraCarrito";
import { DashClient } from "../pages/DashClientPages/DashClient";
import { PedidosPageClient } from "../pages/DashClientPages/DashPages/PedidosPageClient";
import { PerfilPageClient } from "../pages/DashClientPages/DashPages/PerfilPageClient";
import { ProductoDetallesClientPage } from "../pages/DashClientPages/DashPages/ProductosPageCliente/ProductoDetallesClientPage";
import { ProductosPageClient } from "../pages/DashClientPages/DashPages/ProductosPageClient";
import { RegistroProductoClientPage1 } from "../pages/DashClientPages/DashPages/ProductosPageCliente/RegistroProductoClientPage1";
import { RegistroProductoClientPage2 } from  "../pages/DashClientPages/DashPages/ProductosPageCliente/RegistroProductoClientPage2";
import { ServiciosPageClient } from "../pages/DashClientPages/DashPages/ServiciosPageClient";

// Páginas de inicio de sesión y registro
import { BlogPage } from "../pages/HomePages/Blog-Pages/BlogPage";
import { HomePage } from "../pages/HomePages/HomePage";
import { LoginPage } from "../pages/HomePages/Login-Signup-Pages/LoginPage";
import { RecovPassPage } from "../pages/HomePages/Login-Signup-Pages/RecovPassPage";
import { SignupPage } from "../pages/HomePages/Login-Signup-Pages/SignupPage";

// Páginas de productos
import { ProductosDetallesPage } from "../pages/HomePages/Productos-Pages/ProductosDetallesPage";
import { ProductosByCategoriaPage } from "../pages/HomePages/Productos-Pages/ProductosByCategoriaPage";

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
        <Route exact path="/dashAdmin/usuarios" element={<UsuariosPageAdmin />} />
        <Route
          exact
          path="/dashAdmin/categorias"
          element={<CategoriasPageAdmin />}
        />
        <Route exact path="/dashAdmin/productos" element={<ProductosPageAdmin />} />
        <Route
          exact
          path="/dashAdmin/productos/registro-producto"
          element={<RegistroProductoAdminPage1 />}
        />
        <Route
          exact
          path="/dashAdmin/productos/registro-producto/:idProducto"
          element={<RegistroProductoAdminPage2 />}
        />
        <Route
          exact
          path="/dashAdmin/productos/detalles/:id"
          element={<ProductoDetallesAdminPage />}
        />
        <Route exact path="/dashAdmin/servicios" element={<ServiciosPageAdmin />} />
        <Route exact path="/dashAdmin/perfil" element={<PerfilPageAdmin />} />
        <Route
          exact
          path="/dashAdmin/database-backup"
          element={<DatabaseBackupAdmin />}
        />

        {/* Rutas para cliente */}
        <Route exact path="/dashClient" element={<DashClient />} />
        <Route
          exact
          path="/dashClient/productos"
          element={<ProductosPageClient />}
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
          element={<ServiciosPageClient />}
        />
        <Route exact path="/dashClient/pedidos" element={<PedidosPageClient />} />
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
        <Route exact path="/login/recuperar-contrasena" element={<RecovPassPage />} />

        {/* Ruta para manejar las rutas no encontradas */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
