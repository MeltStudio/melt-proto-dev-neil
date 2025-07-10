"use client";

import React from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { Form } from "@/src/components/form";
import { useTaskContext } from "@/src/providers/fake-api-provider";
function TaskCreationPage() {
  const { createTask } = useTaskContext()

  return <Form onSubmit={createTask} />
}

export default TaskCreationPage;