import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";

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