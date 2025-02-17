import React from "react";

interface view{
    title: String;
    description: String;
    priority: String;
    state: String;
    date_added: String;
    date_completed: String;
    assigned_by: String;
    assigned_to: String;
    customer: String;
    email: String;
    phone: String;
}

const ViewMore : React.FC<view> = ({ title,description,priority,state,date_added,date_completed,
    assigned_by,assigned_to,customer,email,phone }) => {
    return (
      <div>
        <h2 className="font-bold font-mono text-3xl mt-6 ml-3 text-gray-500">Task Content</h2>
            <h4 className="ml-5 mt-4 font-mono">
                Title: {title}
            </h4>
            <h4 className="ml-5 mt-3 font-mono">
                Description: {description}
            </h4>
            <h4 className="ml-5 mt-3 font-mono">
                Priority: {priority}
            </h4>
            <h4 className="ml-5 mt-3 font-mono">
                State: {state}
            </h4>
            <h4 className="ml-5 mt-3 font-mono">
                Date Added: {date_added}
            </h4>
            <h4 className="ml-5 mt-3 font-mono">
                Date Completed: {date_completed}
            </h4>
            <h4 className="ml-5 mt-3 font-mono">
                Assigned by: {assigned_by}
            </h4>
            <h4 className="ml-5 mt-3 font-mono">
                Assigned to: {assigned_to}
            </h4>
            <h4 className="ml-5 mt-3 font-mono">
                Customer: {customer}
            </h4>
            <h4 className="ml-5 mt-3 font-mono">
                Email: {email}
            </h4>
            <h4 className="ml-5 mt-3 font-mono">
                Phone: {phone}
            </h4>
      </div>
    );
  };
  
  export default ViewMore;