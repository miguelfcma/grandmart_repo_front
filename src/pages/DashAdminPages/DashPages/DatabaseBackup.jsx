import { Sidebar } from "../../../components/DashAdminComponents/Sidebar";
import { Header } from "../../../components/DashAdminComponents/Header";
import { FormCreateBackup } from "../../../components/BackupComponents/FormCreateBackup"
import { Link } from "react-router-dom"

export function DatabaseBackup() {
  return (
    <div>
      <Header/>
      <Sidebar />
      <div style={{ marginLeft: '200px' }}>
        <FormCreateBackup />
      </div>
    </div>
  )
}