"use client";
import React from "react";
import { Button } from "primereact/button";
import { useState } from "react";
import {Link} from "react-router-dom"
import { Dialog } from "primereact/dialog";
import CreateMaintenance from "./CreateMaintenance";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
const IconAdd :React.FC= () => {
     const [visible, setVisible] = useState<boolean>(false);
   
     return (
       <>
      
         <Button
           icon="pi pi-plus"
           className=" md:text-sm text-xl focus:shadow-none font-bold bg-white px-3 py-1 rounded-lg shadow-sm w-10 h-10" // Ensure alignment
           onClick={() => setVisible(true)}
         />
  

         <Dialog
           header="New Maintenance"
           visible={visible}
        
           onHide={() => setVisible(false)}
       className="lg:w-1/2"
         >
           <CreateMaintenance onClose={() => setVisible(false)} />
         </Dialog>
       </>
     );
   };
   

export default IconAdd;



