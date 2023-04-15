import { Navbar1 } from "../../../components/HomePageComponents/NavBar";
import { FormNuevaPublicacionBlog } from "../../../components/BlogComponents/FormNuevaPublicacionBlog";
import {ListaPublicacionesBlog} from "../../../components/BlogComponents/ListaPublicacionesBlog";
export  function BlogPage() {
  return (
    <div style={{ paddingTop: "80px" }}>
    <Navbar1/>
    <FormNuevaPublicacionBlog/>
    <ListaPublicacionesBlog/>
    </div>
  )
}
