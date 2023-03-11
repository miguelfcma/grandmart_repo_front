
export function FormCategoria() {
    const {createUsuario, updateUsuario} = useUsuarios();

    const [nombre, setNombre] = useState("");


  

  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const formData = {
        nombre: nombre,
      };
  
      try {
        let status;
  
       
        status = await createUsuario(formData);
     
        console.log(status)
        if (status == true) {
          setNombre("");
          onSubmit();
        } else {
          window.alert("Ha ocurrido un error al procesar la solicitud. Inténtelo de nuevo más tarde.");
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">
            Nombre:
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              required
            />
          </label>
 
          <br />
          <button type="submit">Enviar</button>
        </form>
      </>
    );
  };