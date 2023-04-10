import { SidebarAdmin } from "../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../components/DashAdminComponents/HeaderAdmin";
import { FormCreateBackup } from "../../../components/BackupComponents/FormCreateBackup"
import { Link } from "react-router-dom"

import { FormCreateRestore } from "../../../components/BackupComponents/FormCreateRestore";
export function DatabaseBackupAdmin() {
  return (
    <div>
      <HeaderAdmin/>
      <SidebarAdmin />
      <div style={{ marginLeft: '200px' }}>
        <FormCreateBackup />
        <FormCreateRestore />

      </div>
    </div>
  )
}