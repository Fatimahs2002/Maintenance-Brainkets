"use client";
import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import ViewMore from "./ViewMaintenance"; // Importing the correct ViewMore component

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Assets from "./Assets";


const IconAssets: React.FC = () => {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <>
           <Button icon="pi pi-list-check" className="md:w-8 md:h-8 lg:w-10 lg:h-10 cursor-pointer focus:shadow-none md:text-sx lg:text-lg text-white bg-gray-500 hover:bg-600 rounded-lg w-10 h-10 flex items-center justify-center" 
           onClick={() => setVisible(true)}
           />

            <Dialog
                header="Task Content"
                visible={visible}
                onHide={() => setVisible(false)}
                className="lg:w-1/2"
                
            >
               <Assets />
            </Dialog>
        </>
    );
};

export default IconAssets;