interface TaskData {
    title: string;
    description: string;
    priority: string;
    state: string;
    dateAdded: string;
    dateCompleted: string;
    assignedBy: string;
    assignedTo: string;
    customer: string;
    email: string;
    phone: string;
}

interface ViewMoreProps {
    onClose: () => void;
    taskData: TaskData;
}
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
const ViewMore: React.FC<ViewMoreProps> = ({ onClose }) => {
    
    return (
        <div>
       
            <h4 className="ml-5 mt-4 font-mono">Title: {taskData.title}</h4>
            <h4 className="ml-5 mt-3 font-mono">Description: {taskData.description}</h4>
            <h4 className="ml-5 mt-3 font-mono">Priority: {taskData.priority}</h4>
            <h4 className="ml-5 mt-3 font-mono">State: {taskData.state}</h4>
            <h4 className="ml-5 mt-3 font-mono">Date Added: {taskData.dateAdded}</h4>
            <h4 className="ml-5 mt-3 font-mono">Date Completed: {taskData.dateCompleted}</h4>
            <h4 className="ml-5 mt-3 font-mono">Assigned by: {taskData.assignedBy}</h4>
            <h4 className="ml-5 mt-3 font-mono">Assigned to: {taskData.assignedTo}</h4>
            <h4 className="ml-5 mt-3 font-mono">Customer: {taskData.customer}</h4>
            <h4 className="ml-5 mt-3 font-mono">Email: {taskData.email}</h4>
            <h4 className="ml-5 mt-3 font-mono">Phone: {taskData.phone}</h4>
            <button
                onClick={onClose}
                className="mt-5 ml-5 bg-gray-500 text-white p-2 rounded"
            >
                Close
            </button>
        </div>
    );
};

export default ViewMore;