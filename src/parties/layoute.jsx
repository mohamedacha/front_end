import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import '../css_files/Footer.css'

export default function Layoute(){

return(
    <>
        <Header/>
            <main>
                <Outlet/>
            </main>
        <Footer/>
    </>
)

}