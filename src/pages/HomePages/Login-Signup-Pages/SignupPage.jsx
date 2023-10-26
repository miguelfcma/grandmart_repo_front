// Importación del módulo necesario desde una ruta específica
import { SignupFormUsuario } from "../../../components/usuarioComponents/UsuarioSignupComponets/SignupFormUsuario";

// Importación del archivo CSS para estilos
import "./SignupPage.css";

// Definición del componente SignupPage
export function SignupPage() {
  return (
    <div className="signup-container">
      {/* Renderiza el formulario de registro de usuario */}
      <SignupFormUsuario />
    </div>
  );
}
