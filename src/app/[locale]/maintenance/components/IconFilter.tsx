
// import React from "react";
// import { Button } from "primereact/button";
// import { useState } from "react";


// const IconFilter = () => {

   
//      return (
//        <>
//          <Button
// icon="pi pi-filter"
// className="text-xl focus:shadow-none font-bold bg-white px-3 py-1 rounded-lg shadow-sm w-10 h-10" // Ensure alignment

// />
//        </>
//      );
//    };
   

// export default IconFilter;
import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';

export default function IconFilter() {
    const menu = useRef<Menu>(null);
    
    const items: MenuItem[] = [
        { label: "Priority", icon: "pi pi-sort-alt", command: () => console.log("Filter by Priority") },
        { label: "Title", icon: "pi pi-align-left", command: () => console.log("Filter by Title") }
    ];

    return (
        <div >
            {/* Filter Button */}
            <Button 
                icon="pi pi-filter" 
                
                className="text-xl focus:shadow-none font-bold bg-white px-3 py-1 rounded-lg shadow-sm w-10 h-10"
                onClick={(event) => menu.current?.toggle(event)}
            />

            {/* Dropdown Filter Menu */}
            <Menu model={items} popup ref={menu} />
        </div>
    );
}


         