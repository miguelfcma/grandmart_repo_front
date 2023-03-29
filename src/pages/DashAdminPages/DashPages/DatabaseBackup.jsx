
import { FormCreateBackup } from "../../../components/BackupComponents/FormCreateBackup"
import { DashAdmin } from "../DashAdmin";
import { Link } from "react-router-dom"



export function DatabaseBackup() {
  return (
    <div>
      <DashAdmin />
      <div style={{ marginLeft: '200px' }}>
        <FormCreateBackup />
      </div>
    </div>
  )
}