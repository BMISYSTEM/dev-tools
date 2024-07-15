import { Link } from "react-router-dom";
import 'animate.css'
interface props{
    id:number,
    text:string,
    icon:string,
    imagehidden:boolean,
    url:string,
    select:number,
    onclick:()=>void
}

const ButtonImage = ({text,icon,imagehidden,url,id,select,onclick}:props) => {

  return (
    <Link to={url} onClick={onclick} className={`text-slate-200 text-sm font-bold w-full 
    p-2 flex flex-row gap-2   rounded-sm items-center
     hover:bg-slate-200 hover:text-slate-700 hover:border-l-8 hover:border-indigo-500 transition-all ${select === id ? ' border-l-8 text-slate-700 border-indigo-500 bg-slate-200' : '' }`} >
        <span className="w-6 h-6" dangerouslySetInnerHTML={{ __html: icon }} />
        {imagehidden ? 
            <p className={`  animate__animated animate__fadeIn flex`}>{text}</p>
        
        : null}
    </Link>
  )
}

export default ButtonImage
