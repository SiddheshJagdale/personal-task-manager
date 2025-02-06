"use client";

import React from "react";
import AddTaskModal from "@/components/Modals/AddTaskModal";
import AddProjectModal from "./AddProjectModal";
import EditProjectModal from "./EditProjectModal";
import EditTaskModal from "./EditTaskModal";

const ClientOnlyModal = () => {
  return (
    <>
      <AddTaskModal />
      <EditProjectModal />
      <AddProjectModal />
      <EditTaskModal />
    </>
  );
};

export default ClientOnlyModal;
