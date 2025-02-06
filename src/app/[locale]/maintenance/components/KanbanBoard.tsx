"use client";
import React, { useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import 'primeicons/primeicons.css';
import SearchFilterAdd from "./SearchFilterAdd";
import DeleteMaintenance from "./DeleteMaintenance";

interface MaintenanceTask {
  id: number;
  title: string;
  date: string;
  priority: string;
  CustomerName: string;
}

const initialTasks: { [key: string]: MaintenanceTask[] } = {
  pending: [
    { id: 1, title: "Fix Server Issue", priority: "medium", CustomerName: "Ali", date: "04-Feb-25" },
    { id: 2, title: "Update Database Schema", priority: "high", CustomerName: "Hassan", date: "06-Feb-25" },
    { id: 3, title: "Bug Fix: User Authentication", priority: "low", CustomerName: "Mark", date: "08-Feb-25" },
    { id: 4, title: "Optimize API Performance", priority: "medium", CustomerName: "Jad", date: "10-Feb-25" },
  ],
  inProgress: [],
  completed: [],
};

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const toast = useRef<Toast>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    // If the task is dropped outside of any droppable area, return early
    if (!destination) {
      return;
    }

    // If the task is dropped in the same position, return early
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // Move the task from one column to another
    const startColumn = source.droppableId;
    const endColumn = destination.droppableId;
    const movedTask = tasks[startColumn][source.index];

    const newStartTasks = Array.from(tasks[startColumn]);
    newStartTasks.splice(source.index, 1); // Remove the task from the start column

    const newEndTasks = Array.from(tasks[endColumn]);
    newEndTasks.splice(destination.index, 0, movedTask); // Add the task to the end column

    setTasks({
      ...tasks,
      [startColumn]: newStartTasks,
      [endColumn]: newEndTasks,
    });
  };

  return (
    <>
      <div>
        <div className="mt-10">
          <Toast ref={toast} position="top-right" />
          <SearchFilterAdd />
        </div>
        <ConfirmDialog /> {/* ✅ Only One Global Dialog */}

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-4 p-6">
            {Object.entries(tasks).map(([columnId, columnTasks]) => (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="w-1/3 bg-gray-200 p-4 rounded-lg min-h-20"
                  >
                    <h2 className="text-lg font-bold mb-3 capitalize">{columnId}</h2>
                    {columnTasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Card className="mb-3 p-3 bg-white shadow-md rounded-md">
                              <div className="flex items-center gap-2">
                                <h1 className="font-bold">Title:</h1> <span>{task.title}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <h1 className="font-bold">Priority:</h1> <span>{task.priority}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <h1 className="font-bold">CustomerName:</h1> <span>{task.CustomerName}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <h1 className="font-bold">Date:</h1> <span>{task.date}</span>
                              </div>
                              <div className="flex items-center gap-2 justify-end">
                                <Button
                                  icon="pi pi-eye cursor-pointer"
                                  label=""
                                  className="text-xl"
                                  style={{ fontSize: '1.5rem' }}
                                />
                                <Button
                                  icon="pi pi-pen-to-square cursor-pointer"
                                  label=""
                                  className="text-xl"
                                />
                                <DeleteMaintenance id={task.id} />
                              </div>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </>
  );
};

export default KanbanBoard;


