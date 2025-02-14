
"use client";
import React from "react";
import { Button } from "primereact/button";
import { useState } from "react";

import { Dialog } from "primereact/dialog";
import UpdateMaintenance from "./UpdateMaintenance";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
const IconEdit = () => {
    //for update
    const [visible, setVisible] = useState<boolean>(false);
   
     return (
       <>
          <Button
           icon="pi pi-pen-to-square cursor-pointer"
          className="lg:text-xl focus:shadow-none md:text-sm"
      onClick={()=>{
      setVisible(true)
     }
      }
     />

<Dialog  className="" header="" visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
               <UpdateMaintenance onClose={() => setVisible(false)}/>
            </Dialog>
   
     
       </>
     );
   };
   

export default IconEdit;


