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
import { ServicioDetallesAdminPage } from "../pages/DashAdminPages/DashPages/ServiciosPageAdmin/ServicioDetallesAdminPage";
import { UsuariosPageAdmin } from "../pages/DashAdminPages/DashPages/UsuariosPageAdmin";
import { PedidosPageAdmin } from "../pages/DashAdminPages/DashPages/PedidosPageAdmin";
import { PedidoDetallesPagesAdmin } from "../pages/DashAdminPages/DashPages/PedidosPageAdmin/PedidoDetallesPagesAdmin";
import { PreguntasPageAdmin } from "../pages/DashAdminPages/DashPages/PreguntasPageAdmin";
import { EstadisticasPageAdmin } from "../pages/DashAdminPages/DashPages/EstadisticasPageAdmin";
import { OrdenesDeCompraPageAdmin } from "../pages/DashAdminPages/DashPages/OrdenesDeCompraPageAdmin";
import { OrdenDetallesPageAdmin } from "../pages/DashAdminPages/DashPages/OrdenesPageAdmin/OrdenDetallesPageAdmin";

// Páginas de cliente
import { CompraCarritoPage } from "../pages/HomePages/CarritoPage/CompraCarritoPage";
import { DashClient } from "../pages/DashClientPages/DashClient";
import { ComprasPageCliente } from "../pages/DashClientPages/DashPages/ComprasPageCliente/ComprasPageCliente";
import { CompraDetallesPageCliente } from "../pages/DashClientPages/DashPages/ComprasPageCliente/CompraDetallesPageCliente";
import { CompraOpinarProductoCliente } from "../pages/DashClientPages/DashPages/ComprasPageCliente/CompraOpinarProductoCliente";
import { PedidosPageClient } from "../pages/DashClientPages/DashPages/PedidosPageClient";
import { PerfilPageClient } from "../pages/DashClientPages/DashPages/PerfilPageClient";
import { ProductoDetallesClientPage } from "../pages/DashClientPages/DashPages/ProductosPageCliente/ProductoDetallesClientPage";
import { ProductosPageClient } from "../pages/DashClientPages/DashPages/ProductosPageClient";
import { RegistroProductoClientPage1 } from "../pages/DashClientPages/DashPages/ProductosPageCliente/RegistroProductoClientPage1";
import { RegistroProductoClientPage2 } from "../pages/DashClientPages/DashPages/ProductosPageCliente/RegistroProductoClientPage2";
import { ServiciosPageClient } from "../pages/DashClientPages/DashPages/ServiciosPageClient";
import { ServicioDetallesClientPage } from "../pages/DashClientPages/DashPages/ServicioPagesCliente/ServicioDetallesClientPage";

// Páginas de inicio de sesión y registro
import { BlogPage } from "../pages/HomePages/Blog-Pages/BlogPage";
import { HomePage } from "../pages/HomePages/HomePage";
import { LoginPage } from "../pages/HomePages/Login-Signup-Pages/LoginPage";
import { RecovPassPage } from "../pages/HomePages/Login-Signup-Pages/RecovPassPage";
import { SignupPage } from "../pages/HomePages/Login-Signup-Pages/SignupPage";

// Páginas de productos
import { ProductosDetallesPage } from "../pages/HomePages/Productos-Pages/ProductosDetallesPage";
import { ProductosByCategoriaPage } from "../pages/HomePages/Productos-Pages/ProductosByCategoriaPage";

// Páginas de servicios
import { ServiciosDetallesPage } from "../pages/HomePages/Servicios-Pages/ServiciosDetallesPage";

//Página de categorias de home page
import { CategoriasHomePage } from "../pages/HomePages/Categorias-pages/CategoriasHomePage";
import { ServiciosPage } from "../pages/HomePages/Servicios-Pages/ServiciosPage";

export function MyRoutes() {
  return (
    <Router>
      <Routes>
        {/* Rutas para la página de inicio y autenticación */}
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/blog" element={<BlogPage />} />
        <Route exact path="/categorias" element={<CategoriasHomePage />} />
        <Route exact path="/servicios" element={<ServiciosPage />} />
        {/* Rutas para administrador 
        
        
        import { PedidosPageAdmin } from "../pages/DashAdminPages/DashPages/PedidosPageAdmin";
import { ComprasPageAdmin } from "../pages/DashAdminPages/DashPages/ComprasPageAdmin";
        
        */}
        <Route exact path="/dashAdmin" element={<DashAdmin />} />
        <Route
          exact
          path="/dashAdmin/usuarios"
          element={<UsuariosPageAdmin />}
        />
        <Route
          exact
          path="/dashAdmin/categorias"
          element={<CategoriasPageAdmin />}
        />
        <Route exact path="/dashAdmin/pedidos" element={<PedidosPageAdmin />} />
        <Route
          exact
          path="/dashAdmin/productos"
          element={<ProductosPageAdmin />}
        />
        <Route
          exact
          path="/dashAdmin/ordenes"
          element={<OrdenesDeCompraPageAdmin />}
        />
        <Route
          exact
          path="/dashAdmin/preguntas"
          element={<PreguntasPageAdmin />}
        />
        <Route
          exact
          path="/dashAdmin/estadisticas"
          element={<EstadisticasPageAdmin />}
        />
        <Route
          exact
          path="/dashAdmin/ordenes/detalles/:id_orden"
          element={<OrdenDetallesPageAdmin />}
        />
        <Route
          exact
          path="/dashAdmin/pedidos/detalles/:id_orden"
          element={<PedidoDetallesPagesAdmin />}
        />
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
        <Route
          exact
          path="/dashAdmin/servicios"
          element={<ServiciosPageAdmin />}
        />
        <Route
          exact
          path="/dashAdmin/servicios/detalles/:id"
          element={<ServicioDetallesAdminPage />}
        />
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
        <Route
          exact
          path="/dashClient/servicios/detalles/:id"
          element={<ServicioDetallesClientPage />}
        />
        <Route
          exact
          path="/dashClient/compras"
          element={<ComprasPageCliente />}
        />
        <Route
          exact
          path="/dashClient/compras/detalles/:id_orden"
          element={<CompraDetallesPageCliente />}
        />
        <Route
          exact
          path="/dashClient/compras/opinar/:id_producto"
          element={<CompraOpinarProductoCliente />}
        />
        <Route
          exact
          path="/dashClient/pedidos"
          element={<PedidosPageClient />}
        />
        <Route exact path="/dashClient/perfil" element={<PerfilPageClient />} />
        {/* Otras rutas */}
        <Route
          exact
          path="/productos/detalles/:id"
          element={<ProductosDetallesPage />}
        />
        <Route
          exact
          path="/productos/categoria/:id_categoria/:nombre_categoria"
          element={<ProductosByCategoriaPage />}
        />
        <Route
          exact
          path="/servicios/detalles/:id"
          element={<ServiciosDetallesPage />}
        />
        <Route exact path="/resumen-compras" element={<CompraCarritoPage />} />
        <Route
          exact
          path="/login/recuperar-contrasena"
          element={<RecovPassPage />}
        />
        {/* Ruta para manejar las rutas no encontradas */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
