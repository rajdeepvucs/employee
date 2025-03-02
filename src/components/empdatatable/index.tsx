import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { format } from 'date-fns';  
import axios from 'axios';
import { baseURL } from "../../../config";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
  name: string; //Added name
  email: string;
  phoneNumber?: string;
  role: "Developer" | "Designer" | "Manager";
  joiningDate?: Date;
}

const EmpDataTable: React.FC = () => {
  const [rowData, setRowData] = useState<RowData[]>([ 
   
  ]);
 useEffect(()=>{
  const fetchData=async()=>{
    //Api call for data fetching
    const response=await axios.get(`${baseURL}/api/emp/getEmp`)
    //store in state variable
    setRowData(response.data)
    //store in local storage
    localStorage.setItem("empdata",JSON.stringify(response.data))

  }
  fetchData()
 },[])
  const [columnDefs] = useState<ColDef[]>([
    { headerName: 'Name', field: 'name', sortable: true, filter: true }, 
    { headerName: 'Email', field: 'email', sortable: true, filter: true }, 
    { headerName: 'Phone Number', field: 'phoneNumber', sortable: true, filter: true },
    { headerName: 'Role', field: 'role', sortable: true, filter: true },
     {
        headerName: 'Joining Date',
        field: 'joiningDate',
        sortable: true,
        filter: true,
        valueFormatter: (params) => {
          if (params.value) {
            return format(new Date(params.value), 'dd-MM-yyyy'); 
          }
          return '';
        },
      },
  ]);

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width:"80%"}}>

      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
      />
    </div>
  );
};

export default EmpDataTable;