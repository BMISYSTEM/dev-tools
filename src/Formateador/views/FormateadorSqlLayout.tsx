import { FormEvent, useState } from "react";
import ButtonAnimation from "../../ComponentsGlobal/ButtonAnimation";
import { IconCopy } from "../assets/IconCopy";
import { IconFormat } from "../assets/IconFormat";
import { toast } from "react-toastify";
import 'animate.css'


const formateadorPalabra = (textSql:string,textBusqueda:string,estructura:string) =>{
  const oldsql = textSql.split(textBusqueda);
      let conAnd = '';
      oldsql.map((coma,index)=>{
        if(oldsql.length >= 2 && oldsql.length > index + 1 ) {
          conAnd += coma + estructura
        
        }else{
          conAnd += coma 
        }
      })
      return conAnd;
}
const FormateadorSqlLayout = () => {
  const [sql,setSql] = useState('')

  const handleClickSubmit = async (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    const format = async() =>{
      let format ='';
      let sinespacios = sql.replace(/\s+/g, '');
      let querySinSaltosDeLinea = sinespacios.replace(new RegExp('\n', 'gi'), '');
      format = '  SELECT\n     '
      const conselect = formateadorPalabra(querySinSaltosDeLinea.toUpperCase(),'SELECT',format)
      format = `,\n     `
      const concoma = formateadorPalabra(conselect,',',format)
      format = '\nINSERT\n     '
      const conInsert = formateadorPalabra(concoma,'INSERT',format)
      format = '\nFROM\n     '
      const conFrom = formateadorPalabra(conInsert,'FROM',format)
      format = '\nINNER JOIN\n     '
      const coninner = formateadorPalabra(conFrom,'INNERJOIN',format)
      format = '\nLEFT JOIN\n     '
      const conLeft = formateadorPalabra(coninner,'LEFTJOIN',format)
      format = '\nGROUP BY\n     '
      const congroup = formateadorPalabra(conLeft,'GROUPBY',format)
      format = '\nORDER BY\n     '
      const conorder = formateadorPalabra(congroup,'ORDER',format)
      format = '\nHAVING\n     '
      const conheaving = formateadorPalabra(conorder,'HAVING',format)
      format = `\nWHERE\n     `
      const conWhere = formateadorPalabra(conheaving,'WHERE',format)
      format = `\n     AND  `
      const conAnd = formateadorPalabra(conWhere,'AND',format)
      format = `\n     BETWEEN  `
      const conbetwen = formateadorPalabra(conAnd,'BETWEEN',format)
      format = `\n     ON  `
      const conOn = formateadorPalabra(conbetwen,'ON',format)
      format = ` = `
      const conIgual = formateadorPalabra(conOn,'=',format)
      format = ` )\n `
      const conCierre = formateadorPalabra(conIgual,')',format)
      format = ` AS `
      const conAs = formateadorPalabra(conCierre,'AS',format)
      format = ` CASE `
      const conCase = formateadorPalabra(conAs,'CASE',format)
      format = ` WHEN `
      const conWen = formateadorPalabra(conCase,'WHEN',format)
      format = ` THEN `
      const conthen = formateadorPalabra(conWen,'THEN',format)
      format = ` ELSE `
      const conElse = formateadorPalabra(conthen,'ELSE',format)
      format = ` END `
      const conEnd = formateadorPalabra(conElse,'END',format)
      format = ` + `
      const conMas = formateadorPalabra(conEnd,'+',format)
      format = ` BETWEEN `
      const conBetwewn = formateadorPalabra(conMas,'BETWEEN',format)
      setSql(conBetwewn)
    }
    await format()
  }

  const copySQL = async() => {
    const resolveAfter3Sec = navigator.clipboard.writeText(sql);
    toast.promise(
        resolveAfter3Sec,
        {
          pending: 'Copiando el SQL',
          success: 'Sql copiado👌',
          error: 'Se genero un erro al copiar el texto 🤯'
        },{position:"top-right",autoClose:1000}
    )

  };
  return (
    <section className="animate__animated animate__fadeIn w-full md:h-full h-screen flex flex-col gap-2 p-2 text-slate-300">
      <h1 className="text-2xl font-bold ">Formateador Consulta SQL</h1>
      <form action="" onSubmit={handleClickSubmit} className="w-full h-full flex flex-col mt-10 gap-5">
        <label htmlFor="" className="text-lg font-bold">Ingrese la consulta sql</label>
        
        <textarea name="" id="" className="w-full h-full p-2 border-2 rounded-lg text-slate-300 bg-slate-700 caret-green-500"
        placeholder="Ingrese la consulta que desea formatear"
        style={{
          whiteSpace: 'pre-wrap',  // Utiliza el tamaño de fuente del entorno del navegador
        }}
         value={sql} 
         onChange={(e)=>setSql(e.target.value)} ></textarea>
        <div className="flex flex-row gap-3">
          <ButtonAnimation type="submit" text="Formatear" loading={false} icon={IconFormat}  />
          <ButtonAnimation type="button" text="Copy" loading={false} icon={IconCopy} onClick={()=>copySQL()}/>
        </div>
      </form>
    </section>
  )
};

export default FormateadorSqlLayout;
