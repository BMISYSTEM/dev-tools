import React, { FormEvent, useState,  } from 'react';
import { read, utils } from 'xlsx';
import ButtonAnimation from '../../ComponentsGlobal/ButtonAnimation';
import { IconTable } from '../assets/IconTable';
import { IconDev } from '../assets/IconDev';
import { IconTracks } from '../assets/IconTrask';
import { IconCopy } from '../assets/IconCopy';
import { toast } from 'react-toastify';
import 'animate.css'
import { IconExcel } from '../assets/IconExcel';

const FileReaderComponent: React.FC = () => {
  const [excel, setExcel] = useState<any>(null);
  const [dataExcel,setDataExcel] = useState<any>(null)
  const [table,setTable] = useState<string>('')
  const [pantalla,setPantalla] = useState<number>(1)
  const [sql,setSql] = useState<string | null>(null)
  const [loading,setLoading] = useState(false)
  const handleFileChange = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    if(!table) {
      toast.error('El nombre de la tabla es obligatorio' ,{position:'top-right',autoClose:1000})
      setLoading(false)
      return
    }
    if (excel) {
      try {
        const excelBuffer = await excel.arrayBuffer();
        const excelLeyendo = read(excelBuffer);
        const ws = excelLeyendo.Sheets[excelLeyendo.SheetNames[0]];
        const data = utils.sheet_to_json<any>(ws);
        await generarSQL(data)
        setDataExcel(data)
        toast.success('Archivo leido con exito',{position:'top-right',autoClose:1000})
      } catch (error) {
        toast.error('Fue imposible leer el archivo verifique que sea xlsx o que sus datos esten completos ' ,{position:'top-right',autoClose:1000})
      }
    } else {
      toast.error('No se selecciono ningun archivo' ,{position:'top-right',autoClose:1000})
    }
    setLoading(false)
  };

  const generarSQL = async(data:any) =>{
    let insertkey = `INSERT INTO ${table} `;
    let keys = ''
    let values = '';
    let sqlInsert = '';
    await data.map((value:any)=>{
       Object.keys(data[0]).map((key,index)=>{
        const columns = Object.keys(data[0]).length
        let valor = value[key].toString();
        // valor = valor.replace(',','.')
        valor = valor.replace("'", '').replace(",",".");
        const val = Number(valor)
        if(columns > index + 1 ){
          keys += `${key},`
          if(!isNaN(val)){
            values += `${valor},`
          }else{
            values += `'${valor}',`
          }
        }else{
          keys += `${key}`
          if(!isNaN(val)){
            values += `${valor}`
          }else{
            values += `'${valor}'`
          }
        }
      })
      sqlInsert += `${insertkey} (${keys}) VALUES (${values}); \n`
      insertkey = `INSERT INTO ${table} `;
      keys = ''
      values = '';
    })

    setSql(sqlInsert);
  }

  const copySQL = async() => {
    const resolveAfter3Sec = navigator.clipboard.writeText(sql ? sql : '');
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
    <section className="animate__animated animate__fadeIn w-full md:h-full h-screen flex flex-col gap-2 p-2 text-slate-200  ">
      <div className='w-full flex flex-col h-1/2'>
        <h1 className="text-2xl font-bold">Lector de Archivos</h1>
        <form onSubmit={handleFileChange} className="w-full mt-10 md:h-full  flex flex-col gap-5">
          <label htmlFor="" className='text-sm ' >Nombre de la Tabla</label>
          <input type="text" className='w-96 p-1 rounded-sm bg-slate-700 border' onChange={(e)=>setTable(e.target.value)} value={table}/>
          <label htmlFor="fileInput text-sm">Seleccione un archivo</label>
          <input
            id="fileInput"
            type="file"
            onChange={(e)=>setExcel(e?.target?.files?.[0])}
          />
          <div>
            {/* <input type="submit" value={'generar'} className='p-2 bg-green-500 text-white'/> */}
            <ButtonAnimation type='submit' icon={IconExcel} loading={loading} text='Leer archivo' />
          </div>
        </form>
      </div>
      {dataExcel ?  
        <>
          <div className='w-full flex flex-row gap-5 mt-10'>
            <ButtonAnimation icon={IconTable} loading={false} text='Ver tabla' type='button' onClick={()=>setPantalla(1)}/>
            <ButtonAnimation icon={IconDev} loading={false} text='Ver Scrips' type='button' onClick={()=>setPantalla(2)}/>
            <ButtonAnimation icon={IconTracks} loading={false} text='Borrar Scrips' type='button' onClick={()=>setSql('')}/>
            <ButtonAnimation icon={IconCopy} loading={false} text='Copiar Scrips' type='button' onClick={()=>copySQL()}/>
          </div>
          {pantalla === 1 ?  
            <div className='w-auto h-96 max-w-[100%] overflow-auto relative  p-2'>
              {/* <h2>{table}</h2> */}
              <table className=' overflow-auto  '>
                <thead className=''>
                  <tr>
                    {dataExcel ? Object?.keys(dataExcel[0])?.map((title:any,index:any)=>(
                      <td key={index} className='p-2 text-xs bg-white/20 sticky top-0 backdrop-blur-sm text-center'>
                        {/* {title} */}
                        <td>
                          <select name="" id="" className=' bg-slate-800 p-1 mt-1 rounded-xl' >
                            <option value="" className='text-slate-200'>String</option>
                            <option value="" className='text-slate-200'>Number</option>
                          </select>
                        </td>
                      </td>
                    )): null}
                  </tr>
                </thead>
                <tbody>
                    {dataExcel ? dataExcel?.map((value:any,index:number)=>(
                        <tr key={index}>
                        { Object?.keys(dataExcel[0]).map((title:any,key:any)=>(
                            <td key={key} className='text-xs border border-slate-400 p-2'>{value[title]}</td>
                        )) }
                        </tr>
                    )): null
                    } 
                </tbody>
              </table>
            </div>
          : 
            <div className='w-full h-96'>
              <textarea name="" id="" className='w-full h-full p-2 bg-slate-700' value={sql ? sql : ''} style={{
                whiteSpace: 'pre-wrap',  // Utiliza el tamaño de fuente del entorno del navegador
              }}>

              </textarea>
            </div>
          }
        </>
      : null }
    </section>
  );
};

export default FileReaderComponent;
