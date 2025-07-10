"use client";

import React from "react";
import { Form } from "@/src/components/form";
import { useParams } from "next/navigation";
import { useTaskContext } from "@/src/providers/fake-api-provider";
import { useQuery } from "@tanstack/react-query";


function TaskCreationPage() {
  const { id } = useParams()
  const { getTask, editTask } = useTaskContext()
  const { data } = useQuery({
    queryKey: ['task'],
    queryFn: async () => await getTask(id as string),
  });
  
  return (
    <>
      <Form action="edit" onSubmit={editTask} default_values={data} />
    </>
  );
}

export default TaskCreationPage;