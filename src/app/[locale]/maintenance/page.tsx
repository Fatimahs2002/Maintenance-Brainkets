"use client";
import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './Sidebarstyle.css';  
import Asset from './components/asset';
import ViewMore from './components/viewtask'
        
export default function Maintenance(){
    const [visibleRight, setVisibleRight] = useState<boolean>(false);
    const [visibleLeft, setVisibleLeft] = useState<boolean>(false);
    return(
        <main>
            <button className="bg-red-500" onClick={() => setVisibleRight(true)} >Task</button>
            <button className="bg-blue-500" onClick={() => setVisibleLeft(true)} >Assets</button>
            <Sidebar className="bg-white w-2/5 custom-left-sidebar" visible={visibleLeft} position="left" onHide={()=>setVisibleLeft(false)}>
              <Asset/>
            </Sidebar>
            <Sidebar className="bg-white w-2/5 custom-sidebar" visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
                <ViewMore/>
            </Sidebar>
        </main>
    );
}