import React from "react";
import { Button } from "primereact/button";
import { useState } from "react";

import { Dialog } from "primereact/dialog";
import CreateMaintenance from "./CreateMaintenance";
const IconAdd = () => {
     const [visible, setVisible] = useState<boolean>(false);
   
     return (
       <>
         <Button
           icon="pi pi-plus"
           className="text-xl focus:shadow-none font-bold bg-white px-3 py-1 rounded-lg shadow-sm w-10 h-10" // Ensure alignment
           onClick={() => setVisible(true)}
         />
        
   
         <Dialog
           header=""
           visible={visible}
           style={{ width: "50vw" }}
           onHide={() => setVisible(false)}
         >
           <CreateMaintenance onClose={() => setVisible(false)} />
         </Dialog>
       </>
     );
   };
   

export default IconAdd;
