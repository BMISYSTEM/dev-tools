import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Aside from "../components/Aside"
import Main from "../components/Main"
const PanelLayout = () => {
  return (
    <section className="w-full relative md:h-screen h-auto  md:overflow-hidden overflow-auto flex md:flex-row flex-col gap-0 bg-gradient-to-r from-slate-800 to-slate-950">
        {/* aside */}
        <Aside/>
        {/* main */}
        <Main/>
        <ToastContainer theme='dark'/>
    </section>
  )
}

export default PanelLayout
