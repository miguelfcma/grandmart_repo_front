import { FormCreateBackup } from "../../../components/BackupComponents/FormCreateBackup"
import { Link } from "react-router-dom"
export  function DatabaseBackup() {
  return (
    <div>
      <FormCreateBackup/>
      <Link to="/dashAdmin" style={{ textDecoration: "none" }}>
            <button className="back-button" type="button">
              <span>Atrás</span>
            </button>
          </Link>
    </div>
  )
}
