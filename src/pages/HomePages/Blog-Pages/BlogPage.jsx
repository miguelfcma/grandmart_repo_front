import { Navbar } from "../../../components/HomePageComponents/NavBar";
import { NuevaPublicacion } from "../../../components/BlogComponents/NuevaPublicacion";
import {Publicaciones} from "../../../components/BlogComponents/Publicaciones";
export  function BlogPage() {
  return (
    <div style={{ paddingTop: "80px" }}>
    <Navbar/>
    <NuevaPublicacion/>
    <Publicaciones/>
    </div>
  )
}
