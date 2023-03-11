import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotFoundPage } from "../pages/NotFoundPage";
import { HomePage } from "../pages/HomePage";
import { UsuariosPage } from "../pages/DashAdminPages/DashPages/UsuariosPage";
import {ImagenesPage} from "../pages/ImagenesPage";
import {LoginPage} from "../pages/LoginPage";
import {DashAdmin} from "../pages/DashAdminPages/DashAdmin";
import { CategoriasPage } from "../pages/DashAdminPages/DashPages/CategoriasPage";
import { ProductosPage} from "../pages/DashAdminPages/DashPages/ProductosPage";
import { ServiciosPage } from "../pages/DashAdminPages/DashPages/ServiciosPage";
export function MyRoutes() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        
        <Route exact path="/imagenes" element={<ImagenesPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/dashAdmin" element={<DashAdmin />} />
        <Route exact path="/dashAdmin/usuarios" element={<UsuariosPage />} />
        <Route exact path="/dashAdmin/categorias" element={<CategoriasPage />} />
        <Route exact path="/dashAdmin/productos" element={<ProductosPage />} />
        <Route exact path="/dashAdmin/servicios" element={<ServiciosPage />} />
        <Route exact path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
