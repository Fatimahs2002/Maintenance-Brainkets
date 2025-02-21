"use client";
import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './Sidebarstyle.css';  
import KanbanBoard from "./components/KanbanBoard";
const Page: React.FC = () => {
    
  return (
    <main>
        <KanbanBoard />
    </main>
  );
};

export default Page;