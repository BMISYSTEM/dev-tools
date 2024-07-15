import { Outlet } from "react-router"

const Main = () => {
  return (
    <main className="w-full h-full  overflow-hidde flex flex-col ">
        {/* header */}
        <header className="w-full h-10 ">

        </header>
        {/* contenido section */}
        <section className="w-full h-full  ">
            <Outlet/>
        </section>
        {/* footer */}
        <footer className="w-full  h-10 border-t-2 border-slate-300 flex flex-row items-center justify-between p-2">
          <p className="text-slate-200 text-xs">Desarrollado por: Bayron Meneses Idarraga</p>
          <p className="text-slate-200 text-xs">Version: 0.00.1</p>
        </footer>
    </main>
  )
}

export default Main
