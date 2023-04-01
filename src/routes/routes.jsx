import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotFoundPage } from "../pages/NotFoundPage";
import { HomePage } from "../pages/HomePages/HomePage";
import { UsuariosPage } from "../pages/DashAdminPages/DashPages/UsuariosPage";

import { LoginPage } from "../pages/HomePages/Login-Signup-Pages/LoginPage";

import { DashAdmin } from "../pages/DashAdminPages/DashAdmin";
import { CategoriasPage } from "../pages/DashAdminPages/DashPages/CategoriasPage";
import { ProductosPage } from "../pages/DashAdminPages/DashPages/ProductosPage";
import { ServiciosPage } from "../pages/DashAdminPages/DashPages/ServiciosPage";

import { ProductoDetallesAdminPage } from "../pages/DashAdminPages/DashPages/ProductosPage/ProductoDetallesAdminPage";

import { DashClient } from "../pages/DashClientPages/DashClient";
import { ProductosClient } from "../pages/DashClientPages/DashPages/ProductosClient";
import { ServiciosClient } from "../pages/DashClientPages/DashPages/ServiciosClient";
import { PedidosClient } from "../pages/DashClientPages/DashPages/PedidosClient";
import { CompraCarrito } from "../pages/HomePages/CarritoPage/CompraCarrito";
import { RecovPassPage } from "../pages/HomePages/Login-Signup-Pages/RecovPassPage";

import { RegistroProductoPage1 } from "../pages/DashAdminPages/DashPages/ProductosPage/RegistroProductoPage1";
import { RegistroProductoPage2 } from "../pages/DashAdminPages/DashPages/ProductosPage/RegistroProductoPage2";
import { DatabaseBackup } from "../pages/DashAdminPages/DashPages/DatabaseBackup";

import { ProductosByCategoriaPage } from "../pages/HomePages/Productos-Pages/ProductosByCategoriaPage";
import { ProductosDetallesPage } from "../pages/HomePages/productos-Pages/ProductosDetallesPage";
import { SignupPage } from "../pages/HomePages/Login-Signup-Pages/SignupPage";
import { PerfilPageAdmin } from "../pages/DashAdminPages/DashPages/PerfilPageAdmin";
import { BlogPage } from "../pages/HomePages/Blog-Pages/BlogPage";

export function MyRoutes() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />

        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/blog" element={<BlogPage />} />
        
        <Route exact path="/dashAdmin" element={<DashAdmin />} />
        <Route exact path="/dashAdmin/usuarios" element={<UsuariosPage />} />
        <Route
          exact
          path="/dashAdmin/categorias"
          element={<CategoriasPage />}
        />
        <Route exact path="/dashAdmin/productos" element={<ProductosPage />} />
        <Route exact path="/dashAdmin/perfil" element={<PerfilPageAdmin />} />
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
        <Route
          exact
          path="/dashAdmin/database-backup"
          element={<DatabaseBackup />}
        />

        <Route exact path="/dashClient" element={<DashClient />} />
        <Route
          exact
          path="/dashClient/productos"
          element={<ProductosClient />}
        />

        <Route
          exact
          path="/dashClient/servicios"
          element={<ServiciosClient />}
        />
        <Route exact path="/dashClient/pedidos" element={<PedidosClient />} />

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

        <Route exact path="/login/recoverpass" element={<RecovPassPage />} />

        <Route exact path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
