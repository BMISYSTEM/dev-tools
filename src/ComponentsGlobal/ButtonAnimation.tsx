
import spiner from '../assets/loading.png'
interface props {
    text:string;
    loading:boolean;
    onClick?:()=>void;
    icon:string;
    type: "submit" | "reset" | "button" | undefined;
}

const ButtonAnimation = ({text,loading,onClick,icon,type}:props) => {
  return (
    <button type={type} onClick={onClick} className="p-2 bg-indigo-500/20 rounded-xl flex flex-row gap-2 items-center border-2 border-indigo-500 hover:shadow-sm hover:shadow-indigo-300 transition-all">
        {loading ?    
            <img src={spiner} alt="" className='w-6 h-6 animate-spin' />
        : 
            <span className="w-6 h-6" dangerouslySetInnerHTML={{ __html: icon }} />
        }
        <p className="text-indigo-200 font-bold text-sm">{text}</p>
    </button>
  )
}

export default ButtonAnimation
