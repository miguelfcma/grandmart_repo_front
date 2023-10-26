// Importación del módulo necesario desde una ruta específica
import { RecoverPassForm } from "../../../components/usuarioComponents/usuarioRecoverPassword/RecoverPassForm";

// Definición del componente RecovPassPage
export function RecovPassPage() {
  return (
    <div>
      {/* Renderiza el formulario de recuperación de contraseña de usuario */}
      <RecoverPassForm />
    </div>
  );
}
