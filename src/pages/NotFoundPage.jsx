// Estilos para los elementos en la página NotFoundPage
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f8f8f8",
    fontFamily: "sans-serif",
  },
  title: {
    fontSize: "5rem",
    marginBottom: "1rem",
    color: "#333",
    textShadow: "2px 2px 0 #ddd",
  },
  message: {
    fontSize: "2rem",
    color: "#666",
  },
  logo: {
    width: "200px",
    height: "auto",
    marginBottom: "20px",
  },
};

// Componente NotFoundPage que muestra un mensaje de error 404
// Esta página se muestra cuando un usuario intenta acceder a una página que no existe dentro del dominio del servidor.
export function NotFoundPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 No encontrado</h1>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/grandmart-51065.appspot.com/o/src%2Flogo.png?alt=media&token=6c393680-5c89-4708-a0d3-f8ffcb0fc379"
        style={styles.logo}
        alt="Logo"
      ></img>
      <p style={styles.message}>La página que estás buscando no existe.</p>
      <button onClick={() => window.history.back()}>Regresar</button>
    </div>
  );
}
