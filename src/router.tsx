import { createHashRouter } from "react-router-dom";
import PanelLayout from "./panel/view/PanelLayout";
import GenerateSqlLayout from "./GenerateSql/views/GenerateSqlLayout";
import TablasSqlLayout from "./TablasSQL/views/TablasSqlLayout";
import PlantillasSqlLayout from "./PlantilllasSQL/views/PlantillasSqlLayout";
import FormateadorSqlLayout from "./Formateador/views/FormateadorSqlLayout";

export const router = createHashRouter([
    {
        path:'/',
        element:<PanelLayout/>,
        children:[
            {
                path:'/',
                element:<FormateadorSqlLayout/>
            },
            {
                path:'/generadorsql',
                element:<GenerateSqlLayout/>
            },
            {
                path:'/configuracion-tablas',
                element:<TablasSqlLayout/>
            },
            {
                path:'/plantillas',
                element:<PlantillasSqlLayout/>
            }
        ]
    },
    {
        path: '*',
        element: <><h1>No se encuentra ninguna ruta </h1></>
      }
]);