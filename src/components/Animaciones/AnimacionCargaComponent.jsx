import { Spinner } from 'react-bootstrap';
import "./AnimacionCargaComponent.css"

export function AnimacionCargaComponent() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 carga-container">
      <div className="carga-container">
        <Spinner animation="border" variant="primary" role="status" className="carga-spinner" />
        <span className="carga-text"><box-icon name='shopping-bag' animation='burst' color='#53adf0' ></box-icon>Cargando...</span>
      </div>
    </div>
  )
}
