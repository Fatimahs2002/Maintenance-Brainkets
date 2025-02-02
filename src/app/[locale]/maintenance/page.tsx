"use client";
import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './Sidebarstyle.css';  
        
export default function Maintenance(){
    const [visibleRight, setVisibleRight] = useState<boolean>(false);
    return(
        <main>
            <button className="bg-red-500" onClick={() => setVisibleRight(true)} >Request</button>
            <Sidebar className="bg-white w-2/5 custom-sidebar" visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
                <h2 className="font-bold font-mono text-3xl mt-6 ml-3 text-gray-500">Request Content</h2>
                <h4 className="ml-5 mt-4 font-mono">
                    Title: fix door
                </h4>
                <h4 className="ml-5 mt-3 font-mono">
                    Description: Fix the door in first floor
                </h4>
                <h4 className="ml-5 mt-3 font-mono">
                    Priority: High
                </h4>
                <h4 className="ml-5 mt-3 font-mono">
                    State: In Progress
                </h4>
                <h4 className="ml-5 mt-3 font-mono">
                    Date Added: February 1, 2025
                </h4>
                <h4 className="ml-5 mt-3 font-mono">
                    Date Completed: February 2, 2025
                </h4>
                <h4 className="ml-5 mt-3 font-mono">
                    Added by: Ali Al Hajj Ali
                </h4>
                <h4 className="ml-5 mt-3 font-mono">
                    Assigned to: Tia Zekhia
                </h4>
                <h4 className="ml-5 mt-3 font-mono">
                    Cost: 20 ~ 30$
                </h4>
            </Sidebar>
        </main>
    );
}