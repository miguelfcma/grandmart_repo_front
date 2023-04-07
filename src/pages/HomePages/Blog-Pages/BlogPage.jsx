import { Navbar } from "../../../components/HomePageComponents/NavBar";
import { NuevaPublicacionBlog } from "../../../components/BlogComponents/NuevaPublicacionBlog";
import {Publicaciones} from "../../../components/BlogComponents/Publicaciones";
export  function BlogPage() {
  return (
    <div style={{ paddingTop: "80px" }}>
    <Navbar/>
    <NuevaPublicacionBlog/>
    <Publicaciones/>
    </div>
  )
}
