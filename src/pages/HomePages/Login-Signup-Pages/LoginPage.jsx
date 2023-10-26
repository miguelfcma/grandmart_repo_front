// Importación del módulo necesario desde una ruta específica
import { LoginFormUsuario } from "../../../components/usuarioComponents/UsuarioLoginComponent/LoginFormUsuario";

// Definición del componente LoginPage
export function LoginPage() {
  return (
    <div>
      {/* Renderiza el formulario de inicio de sesión del usuario */}
      <LoginFormUsuario />
    </div>
  );
}
