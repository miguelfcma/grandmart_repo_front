import { SidebarAdmin } from "../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../components/DashAdminComponents/HeaderAdmin";
import { FormCreateBackup } from "../../../components/BackupComponents/FormCreateBackup"
import { Link } from "react-router-dom"

import { ListaBackups } from "../../../components/BackupComponents/ListaBackups";
export function DatabaseBackupAdmin() {
  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <HeaderAdmin />
        <FormCreateBackup />
       
        <ListaBackups/>
      </div>
    </div>
  )
}