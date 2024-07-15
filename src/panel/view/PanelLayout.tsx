import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Aside from "../components/Aside"
import Main from "../components/Main"
const PanelLayout = () => {
  return (
    <section className="w-full h-screen overflow-hidden flex flex-row gap-0 bg-gradient-to-r from-slate-800 to-slate-950">
        {/* aside */}
        <Aside/>
        {/* main */}
        <Main/>
        <ToastContainer theme='dark'/>
    </section>
  )
}

export default PanelLayout
