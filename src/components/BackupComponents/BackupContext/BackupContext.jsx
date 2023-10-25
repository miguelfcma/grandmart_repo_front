//Se importa el contexto de Backup, el contexto consta de Provider (proporciona los datos que se comparten con los componentes hijos) y Consumer (se utiliza en los componentes que desean acceder a los datos de Provider) 

import { createContext } from "react";
export const BackupContext = createContext();

