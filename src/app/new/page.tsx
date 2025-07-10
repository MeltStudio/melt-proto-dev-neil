"use client";

import React from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { TextField } from "@/ui/components/TextField";
import { TextArea } from "@/ui/components/TextArea";
import { Select } from "@/ui/components/Select";
import { Calendar } from "@/ui/components/Calendar";
import * as SubframeCore from "@subframe/core";
import { Button } from "@/ui/components/Button";
import { FeatherCalendar } from "@subframe/core";

function TaskCreationPage() {
  return (
    <DefaultPageLayout>
      <div className="container max-w-none flex h-full w-full flex-col items-center gap-4 bg-default-background py-12">
        <div className="flex w-full max-w-[448px] flex-col items-start gap-8">
          <div className="flex w-full flex-col items-start gap-6">
            <div className="flex w-full flex-col items-start">
              <span className="text-heading-1 font-heading-3 text-default-font">
                Create New Task
              </span>
              <span className="text-body font-body text-subtext-color">
                Add details for your new task
              </span>
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-6">
            <TextField
              className="h-auto w-full flex-none"
              label="Title"
              helpText=""
            >
              <TextField.Input
                placeholder="Enter task title"
                value=""
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
              />
            </TextField>
            <TextArea
              className="h-auto w-full flex-none"
              label="Description"
              helpText=""
            >
              <TextArea.Input
                placeholder="Enter task description"
                value=""
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {}}
              />
            </TextArea>
            <Select
              label="Status"
              placeholder="Select status"
              helpText=""
              value={undefined}
              onValueChange={(value: string) => {}}
            >
              <Select.Item value="ready-to-start">ready-to-start</Select.Item>
              <Select.Item value="in-progress">in-progress</Select.Item>
              <Select.Item value="completed">completed</Select.Item>
            </Select>
            <div className="flex w-full flex-col items-start gap-1">
              <span className="text-body-bold font-body-bold text-default-font">
                Due Date
              </span>
              <SubframeCore.Popover.Root>
                <SubframeCore.Popover.Trigger asChild={true}>
                  <Button
                    className="h-8 w-full flex-none"
                    variant="neutral-secondary"
                    icon={<FeatherCalendar />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Select due date
                  </Button>
                </SubframeCore.Popover.Trigger>
                <SubframeCore.Popover.Portal>
                  <SubframeCore.Popover.Content
                    side="bottom"
                    align="start"
                    sideOffset={4}
                    asChild={true}
                  >
                    <div className="flex flex-col items-start gap-1 rounded-md border border-solid border-neutral-border bg-default-background px-3 py-3 shadow-lg">
                      <Calendar
                        mode={"single"}
                        selected={new Date()}
                        onSelect={(date: Date | undefined) => {}}
                      />
                    </div>
                  </SubframeCore.Popover.Content>
                </SubframeCore.Popover.Portal>
              </SubframeCore.Popover.Root>
            </div>
          </div>
          <div className="flex w-full items-start gap-2">
            <Button
              className="h-8 grow shrink-0 basis-0"
              variant="neutral-secondary"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              Cancel
            </Button>
            <Button
              className="h-8 grow shrink-0 basis-0"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              Create Task
            </Button>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default TaskCreationPage;