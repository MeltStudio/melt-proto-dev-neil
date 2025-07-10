"use client";

import React from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { Form } from "@/src/components/form";
import { createTask } from "@/src/models/mutations/create-task";
function TaskCreationPage() {
  return (
    <DefaultPageLayout>
      <Form onSubmit={createTask} />
    </DefaultPageLayout>
  );
}

export default TaskCreationPage;