
import { FormCreateBackup } from "../../../components/BackupComponents/FormCreateBackup"
import { Sidebar } from "../../../components/DashAdminComponents/Sidebar";
import { Link } from "react-router-dom"

import { FormCreateRestore } from "../../../components/BackupComponents/FormCreateRestore";
export function DatabaseBackup() {
  return (
    <div>
      <Sidebar />
      <div style={{ marginLeft: '200px' }}>
        <FormCreateBackup />
        <FormCreateRestore />

      </div>
    </div>
  )
}