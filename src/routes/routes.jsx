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
import { VentasPageAdmin } from "../pages/DashAdminPages/DashPages/VentasPageAdmin";
import { PreguntasPageAdmin } from "../pages/DashAdminPages/DashPages/PreguntasPageAdmin";
import { EstadisticasPageAdmin } from "../pages/DashAdminPages/DashPages/EstadisticasPageAdmin";
import { OrdenesDeCompraPageAdmin } from "../pages/DashAdminPages/DashPages/OrdenesDeCompraPageAdmin";
import { OrdenDetallesPageAdmin } from "../pages/DashAdminPages/DashPages/OrdenesPageAdmin/OrdenDetallesPageAdmin";
import { DenunciasPageAdmin } from "../pages/DashAdminPages/DashPages/DenunciasPageAdmin";
import { ComprasPageAdmin } from "../pages/DashAdminPages/DashPages/ComprasPageAdmin/ComprasPageAdmin";
import { CompraDetallesPageAdmin } from "../pages/DashAdminPages/DashPages/ComprasPageAdmin/CompraDetallesPageAdmin";
import { CompraOpinarProductoAdmin } from "../pages/DashAdminPages/DashPages/ComprasPageAdmin/CompraOpinarProductoAdmin";
// Páginas de cliente
import { CompraCarritoPage } from "../pages/HomePages/CarritoPage/CompraCarritoPage";
import { DashClient } from "../pages/DashClientPages/DashClient";

import { ComprasPageCliente } from "../pages/DashClientPages/DashPages/ComprasPageCliente/ComprasPageCliente";
import { CompraDetallesPageCliente } from "../pages/DashClientPages/DashPages/ComprasPageCliente/CompraDetallesPageCliente";
import { CompraOpinarProductoCliente } from "../pages/DashClientPages/DashPages/ComprasPageCliente/CompraOpinarProductoCliente";
import { VentasPageCliente } from "../pages/DashClientPages/DashPages/VentasPageCliente";
import { PerfilPageClient } from "../pages/DashClientPages/DashPages/PerfilPageClient";
import { ProductoDetallesClientPage } from "../pages/DashClientPages/DashPages/ProductosPageCliente/ProductoDetallesClientPage";
import { ProductosPageClient } from "../pages/DashClientPages/DashPages/ProductosPageClient";
import { RegistroProductoClientPage1 } from "../pages/DashClientPages/DashPages/ProductosPageCliente/RegistroProductoClientPage1";
import { RegistroProductoClientPage2 } from "../pages/DashClientPages/DashPages/ProductosPageCliente/RegistroProductoClientPage2";
import { ServiciosPageClient } from "../pages/DashClientPages/DashPages/ServiciosPageClient";
import { ServicioDetallesClientPage } from "../pages/DashClientPages/DashPages/ServicioPagesCliente/ServicioDetallesClientPage";

import { EstadisticasPageCliente } from "../pages/DashClientPages/DashPages/EstadisticasPageCliente";
import { PreguntasPageCliente } from "../pages/DashClientPages/DashPages/PreguntasPageCliente";
// Páginas de inicio de sesión y registro
import { BlogPage } from "../pages/HomePages/Blog-Pages/BlogPage";
import { HomePage } from "../pages/HomePages/HomePage";
import { ContactoPage } from "../pages/HomePages/Contacto-pages/ContactoPage";
import { LoginPage } from "../pages/HomePages/Login-Signup-Pages/LoginPage";
import { RecovPassPage } from "../pages/HomePages/Login-Signup-Pages/RecovPassPage";
import { SignupPage } from "../pages/HomePages/Login-Signup-Pages/SignupPage";

// Páginas de productos
import { ProductosDetallesPage } from "../pages/HomePages/Productos-Pages/ProductosDetallesPage";
import { ProductosByCategoriaPage } from "../pages/HomePages/Productos-Pages/ProductosByCategoriaPage";
import { FormNuevaDenunciaProductoGeneral } from "../components/ProductoComponents/ProductosGeneral/DenunciasProductoGeneral/DenunciasProductoComponentesGeneral/FormNuevaDenunciaProductoGeneral";
import { Form2NuevaDenunciaProductoGeneral } from "../components/ProductoComponents/ProductosGeneral/DenunciasProductoGeneral/DenunciasProductoComponentesGeneral/Form2NuevaDenunciaProductoGeneral";

// Páginas de servicios
import { ServiciosDetallesPage } from "../pages/HomePages/Servicios-Pages/ServiciosDetallesPage";
import { FormNuevaDenunciaServicioGeneral } from "../components/ServicioComponents/ServiciosGeneral/DenunciasServicioGeneral/DenunciasServicioComponentesGeneral/FormNuevaDenunciaServicioGeneral";
import { Form2NuevaDenunciaServicioGeneral } from "../components/ServicioComponents/ServiciosGeneral/DenunciasServicioGeneral/DenunciasServicioComponentesGeneral/Form2NuevaDenunciaServicioGeneral";

//Página de categorias de home page
import { CategoriasHomePage } from "../pages/HomePages/Categorias-pages/CategoriasHomePage";
import { ServiciosPage } from "../pages/HomePages/Servicios-Pages/ServiciosPage";

import { RegistroInformacionDeEnvioPage } from "../pages/HomePages/CarritoPage/RegistroInformacionDeEnvioPage";
import { ResumenComprasPage } from "../pages/HomePages/CarritoPage/ResumenComprasPage";
//Paginas de perfil de admin
import { DatosPerfilPageAdmin } from "../pages/DashAdminPages/DashPages/PerfilPagesAdmin/DatosPerfilPageAdmin";
import { DomicilioPerfilPageAdmin } from "../pages/DashAdminPages/DashPages/PerfilPagesAdmin/DomicilioPerfilPageAdmin";
import { SeguridadPerfilPageAdmin } from "../pages/DashAdminPages/DashPages/PerfilPagesAdmin/SeguridadPerfilPageAdmin";

//Paginas de perfil de cliente
import { DatosPerfilPageCliente } from "../pages/DashClientPages/DashPages/PerfilPagesCliente/DatosPerfilPageCliente";
import { SeguridadPerfilPageCliente } from "../pages/DashClientPages/DashPages/PerfilPagesCliente/SeguridadPerfilPageCliente";
import { DomicilioPerfilPageCliente } from "../pages/DashClientPages/DashPages/PerfilPagesCliente/DomicilioPerfilPageCliente";


/////////////PAGINAS DE REPARTIDOR///////////
import { DashRepartidor } from "../pages/DashRepartidorPages/DashRepartidor";
import { OrdenesDeCompraPageRepartidor } from "../pages/DashRepartidorPages/DashPages/OrdenesDeCompraPageRepartidor";
import { OrdenDetallesPageRepartidor } from "../pages/DashRepartidorPages/DashPages/OrdenesPageRepartidor/OrdenDetallesPageRepartidor";
import { ComprasFinalPage } from "../pages/HomePages/CarritoPage/ComprasFinalPage";
import { PerfilPageRepartidor } from "../pages/DashRepartidorPages/DashPages/PerfilPageRepartidor";
import { DatosPerfilPageRepartidor } from "../pages/DashRepartidorPages/DashPages/PerfilPagesRepartidor/DatosPerfilPageRepartidor";
import { SeguridadPerfilPageRepartidor } from "../pages/DashRepartidorPages/DashPages/PerfilPagesRepartidor/SeguridadPerfilPageRepartidor";
///
import { RegistroServicioClientPage1 } from "../pages/DashClientPages/DashPages/ServicioPagesCliente/RegistroServicioClientPage1";
import RegistroServicioAdminPage1 from "../pages/DashAdminPages/DashPages/ServiciosPageAdmin/RegistroServicioAdminPage1";

import RutasProtegidasAdmin from "./RutasProtegidasAdmin";
import RutasProtegidasCliente from "./RutasProtegidasCliente";
import RutasProtegidasRepartidor from "./RutasProtegidasRepartidor";
import RutasGeneral from "./RutasGeneral";
export function MyRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<RutasGeneral />}>
          {/* Rutas para la página de inicio y autenticación */}
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/contacto" element={<ContactoPage />} />
          <Route exact path="/signup" element={<SignupPage />} />
          <Route exact path="/blog" element={<BlogPage />} />
          <Route exact path="/categorias" element={<CategoriasHomePage />} />
          <Route exact path="/servicios" element={<ServiciosPage />} />
          <Route
            exact
            path="/carrito-compras"
            element={<CompraCarritoPage />}
          />
          <Route
            exact
            path="/resumen-compras"
            element={<ResumenComprasPage />}
          />
          <Route
            exact
            path="/informacion-envio"
            element={<RegistroInformacionDeEnvioPage />}
          />
          <Route
            exact
            path="/final-compras/:id"
            element={<ComprasFinalPage />}
          />
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
            path="/productos/categoria/:id_categoria"
            element={<ProductosByCategoriaPage />}
          />
          <Route
            exact
            path="/denuncia/producto/:id_producto"
            element={<FormNuevaDenunciaProductoGeneral />}
          />
          <Route
            exact
            path="/denuncia/producto/:id_producto/detalles"
            element={<Form2NuevaDenunciaProductoGeneral />}
          />
          <Route
            exact
            path="/servicios/detalles/:id"
            element={<ServiciosDetallesPage />}
          />
          <Route
            exact
            path="/denuncia/servicio/:id_servicio"
            element={<FormNuevaDenunciaServicioGeneral />}
          />
          <Route
            exact
            path="/denuncia/servicio/:id_servicio/detalles"
            element={<Form2NuevaDenunciaServicioGeneral />}
          />
          <Route
            exact
            path="/login/recuperar-contrasena"
            element={<RecovPassPage />}
          />
          {/* Ruta para manejar las rutas no encontradas */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route element={<RutasProtegidasAdmin />}>
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
          <Route exact path="/dashAdmin/ventas" element={<VentasPageAdmin />} />
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
            path="/dashAdmin/ordenes/detalles/:id_orden"
            element={<OrdenDetallesPageAdmin />}
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
            path="/dashAdmin/compras"
            element={<ComprasPageAdmin />}
          />

          <Route
            exact
            path="/dashAdmin/compras/detalles/:id_orden"
            element={<CompraDetallesPageAdmin />}
          />
          <Route
            exact
            path="/dashAdmin/compras/opinar/:id_producto"
            element={<CompraOpinarProductoAdmin />}
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
          <Route
            exact
            path="/dashAdmin/servicios/registro-servicio"
            element={<RegistroServicioAdminPage1 />}
          />
          {/*RUTAS DE PERFIL DE ADMINISTRADOR */}
          <Route exact path="/dashAdmin/perfil" element={<PerfilPageAdmin />} />
          <Route
            exact
            path="/dashAdmin/perfil/datos"
            element={<DatosPerfilPageAdmin />}
          />
          <Route
            exact
            path="/dashAdmin/perfil/seguridad"
            element={<SeguridadPerfilPageAdmin />}
          />
         
          <Route
            exact
            path="/dashAdmin/perfil/domicilio"
            element={<DomicilioPerfilPageAdmin />}
          />

          <Route
            exact
            path="/dashAdmin/database-backup"
            element={<DatabaseBackupAdmin />}
          />
          <Route
            exact
            path="/dashAdmin/denuncias"
            element={<DenunciasPageAdmin />}
          />
        </Route>
        <Route element={<RutasProtegidasCliente />}>
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
            path="/dashClient/servicios/registro-servicio"
            element={<RegistroServicioClientPage1 />}
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
            path="/dashClient/compras/detalles/:id_orden/opinar/:id_producto"
            element={<CompraOpinarProductoCliente />}
          />
          <Route
            exact
            path="/dashClient/ventas"
            element={<VentasPageCliente />}
          />
          <Route
            exact
            path="/dashClient/estadisticas"
            element={<EstadisticasPageCliente />}
          />
          <Route
            exact
            path="/dashClient/preguntas"
            element={<PreguntasPageCliente />}
          />
          {/*RUTAS DE PERFIL DE CLIENTES */}
          <Route
            exact
            path="/dashClient/perfil"
            element={<PerfilPageClient />}
          />
          <Route
            exact
            path="/dashClient/perfil/domicilio"
            element={<DomicilioPerfilPageCliente />}
          />
          <Route
            exact
            path="/dashClient/perfil/datos"
            element={<DatosPerfilPageCliente />}
          />
       
          <Route
            exact
            path="/dashClient/perfil/seguridad"
            element={<SeguridadPerfilPageCliente />}
          />
        </Route>
        <Route element={<RutasProtegidasRepartidor />}>
          {/* Rutas de repartidor */}
          <Route
            exact
            path="/dashRepartidor/perfil"
            element={<PerfilPageRepartidor />}
          />

          <Route
            exact
            path="/dashRepartidor/perfil/datos"
            element={<DatosPerfilPageRepartidor />}
          />
          <Route
            exact
            path="/dashRepartidor/perfil/seguridad"
            element={<SeguridadPerfilPageRepartidor />}
          />
          <Route exact path="/dashRepartidor" element={<DashRepartidor />} />
          <Route
            exact
            path="/dashRepartidor/ordenes"
            element={<OrdenesDeCompraPageRepartidor />}
          />
          <Route
            exact
            path="/dashRepartidor/ordenes/detalles/:id_orden"
            element={<OrdenDetallesPageRepartidor />}
          />
        </Route>
      </Routes>
    </Router>
  );
}
