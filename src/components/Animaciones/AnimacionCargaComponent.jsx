import { Spinner } from 'react-bootstrap';


export function AnimacionCargaComponent() {
  return (
    <div >
      <div className="carga-container">
        <Spinner animation="border" variant="primary" role="status" className="carga-spinner" />
        <span className="carga-text">Cargando...</span>
      </div>
    </div>
  )
}
