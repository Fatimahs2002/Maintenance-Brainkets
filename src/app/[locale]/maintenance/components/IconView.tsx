"use client";
import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import ViewMore from "./ViewMaintenance"; // Importing the correct ViewMore component

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

// Sample task data
const taskData = {
    title: "Fix login issue",
    description: "Resolve the bug preventing users from logging in with valid credentials.",
    priority: "High",
    state: "In Progress",
    dateAdded: "2025-02-20",
    dateCompleted: "N/A",
    assignedBy: "John Doe",
    assignedTo: "Jane Smith",
    customer: "ACME Corp",
    email: "customer@acme.com",
    phone: "+1234567890",
};

const IconView: React.FC = () => {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <>
            <Button
                icon="pi pi-eye"
                className=" lg:w-10 lg:h-10 md:w-8 md:h-8 cursor-pointer focus:shadow-none md:text-sx lg:text-lg text-white bg-blue-500 hover:bg-blue-600 rounded-lg w-10 h-10 flex items-center justify-center"
                style={{ fontSize: "1.5rem" }}
                onClick={() => setVisible(true)}
            />

            <Dialog
                header="Task Content"
                visible={visible}
                onHide={() => setVisible(false)}
                className="lg:w-1/2"
            >
                <ViewMore onClose={() => setVisible(false)} taskData={taskData} />
            </Dialog>
        </>
    );
};

export default IconView;




