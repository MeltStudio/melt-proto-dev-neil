"use client";

import React from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { Form } from "@/src/components/form";

function TaskCreationPage() {
  return (
    <DefaultPageLayout>
      <Form />
    </DefaultPageLayout>
  );
}

export default TaskCreationPage;