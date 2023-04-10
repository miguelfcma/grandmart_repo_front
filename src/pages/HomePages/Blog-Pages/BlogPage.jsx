import { Navbar } from "../../../components/HomePageComponents/NavBar";
import { FormNuevaPublicacionBlog } from "../../../components/BlogComponents/FormNuevaPublicacionBlog";
import {ListaPublicacionesBlog} from "../../../components/BlogComponents/ListaPublicacionesBlog";
export  function BlogPage() {
  return (
    <div style={{ paddingTop: "80px" }}>
    <Navbar/>
    <FormNuevaPublicacionBlog/>
    <ListaPublicacionesBlog/>
    </div>
  )
}
