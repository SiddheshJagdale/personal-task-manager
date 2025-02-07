"use client";

import React from "react";
import AddTaskModal from "@/components/Modals/AddTaskModal";
import AddProjectModal from "./AddProjectModal";
import EditProjectModal from "./EditProjectModal";
import EditTaskModal from "./EditTaskModal";
import EditUserModal from "./EditUserModal";

const ClientOnlyModal = () => {
  return (
    <>
      <AddTaskModal />
      <EditProjectModal />
      <AddProjectModal />
      <EditTaskModal />
      <EditUserModal />
    </>
  );
};

export default ClientOnlyModal;
