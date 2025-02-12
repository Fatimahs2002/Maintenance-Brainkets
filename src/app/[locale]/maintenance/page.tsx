"use client";
import React, { useState } from "react";
import KanbanBoard from "./components/KanbanBoard";
import CreateMaintenance from "./components/CreateMaintenance";
import UpdateMaintenance from "./components/UpdateMaintenance";

const Page: React.FC = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div>
      {!showCreate && !showEdit ? (
        <KanbanBoard setShowCreate={setShowCreate} setShowEdit={setShowEdit} />
      ) : null}

      {showCreate && <CreateMaintenance onClose={() => setShowCreate(false)} />}
      {showEdit && <UpdateMaintenance onClose={() => setShowEdit(false)} />}
    </div>
  );
};

export default Page;






