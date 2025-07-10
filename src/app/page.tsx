"use client";

import React from "react";
import { Button } from "@/ui/components/Button";
import { FeatherPlus } from "@subframe/core";
import { TextField } from "@/ui/components/TextField";
import { FeatherSearch } from "@subframe/core";
import { Select } from "@/ui/components/Select";
import { FeatherCheckCircle } from "@subframe/core";
import { Calendar } from "@/ui/components/Calendar";
import * as SubframeCore from "@subframe/core";
import { FeatherCalendar } from "@subframe/core";
import { Table } from "@/ui/components/Table";
import { FeatherArrowUp } from "@subframe/core";
import { Badge } from "@/ui/components/Badge";
import { FeatherTrash } from "@subframe/core";
import { IconButton } from "@/ui/components/IconButton";
import { ContextMenu } from "@/ui/components/ContextMenu";
import { FeatherCheck } from "@subframe/core";
import { FeatherEyeOff } from "@subframe/core";
import { FeatherComponent } from "@subframe/core";
import { FeatherCopy } from "@subframe/core";
import { FeatherChevronFirst } from "@subframe/core";
import { FeatherChevronLeft } from "@subframe/core";
import { FeatherChevronRight } from "@subframe/core";
import { FeatherChevronLast } from "@subframe/core";
import Link from "next/link";
import Skeleton from "../components/skeleton";
import { useTaskContext } from "../providers/fake-api-provider";
import { useQuery } from "@tanstack/react-query";
import { Task } from "../components/task";
import EmptyState from "../components/empty-state";

function Home() {
  const { getTasks } = useTaskContext();
  const { isPending, data, refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  return (
    <>
      <div className="container max-w-none flex h-full w-full flex-col items-end gap-4 bg-default-background py-12">
        <div className="flex w-full items-center justify-between">
          <span className="text-heading-1 font-heading-1 text-default-font">
            Task Manager
          </span>
          <Link href='/new'>
            <Button
              icon={<FeatherPlus />}
            >
              Add task
            </Button>
          </Link>
        </div>
        <div className="flex w-full items-center gap-4">
          <span className="text-body-bold font-body-bold text-default-font">
            Filter by
          </span>
          <div className="flex grow shrink-0 basis-0 items-center gap-2">
            <TextField label="" helpText="" icon={<FeatherSearch />}>
              <TextField.Input
                placeholder="Search tasks"
                value=""
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => { }}
              />
            </TextField>
            <Select
              label=""
              placeholder="Status"
              helpText=""
              icon={<FeatherCheckCircle />}
              value={undefined}
              onValueChange={(value: string) => { }}
            >
              <Select.Item value="Ready to start">Ready to start</Select.Item>
              <Select.Item value="In Progress">In Progress</Select.Item>
              <Select.Item value="Completed">Completed</Select.Item>
            </Select>
            <SubframeCore.Popover.Root>
              <SubframeCore.Popover.Trigger asChild={true}>
                <Button
                  variant="brand-secondary"
                  icon={<FeatherCalendar />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
                >
                  July 7, 2024
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
                      onSelect={(date: Date | undefined) => { }}
                    />
                  </div>
                </SubframeCore.Popover.Content>
              </SubframeCore.Popover.Portal>
            </SubframeCore.Popover.Root>
          </div>
        </div>
        <SubframeCore.ContextMenu.Root>
          <SubframeCore.ContextMenu.Trigger asChild={true}>
            <>
              <Table
                header={
                  <Table.HeaderRow>
                    <Table.HeaderCell icon={<FeatherArrowUp />}>
                      Title
                    </Table.HeaderCell>
                    <Table.HeaderCell icon={<FeatherArrowUp />}>
                      Description
                    </Table.HeaderCell>
                    <Table.HeaderCell icon={<FeatherArrowUp />}>
                      Status
                    </Table.HeaderCell>
                    <Table.HeaderCell icon={<FeatherArrowUp />}>
                      Due Date
                    </Table.HeaderCell>
                  </Table.HeaderRow>
                }
              >
                {isPending ? (
                  <Skeleton />
                ) : data?.map((task) =>
                  <Task key={task.id} task={task} refetch={refetch} />
                )}
              </Table>
              {!data?.length && <EmptyState />}
            </>
          </SubframeCore.ContextMenu.Trigger>
          <SubframeCore.ContextMenu.Portal>
            <SubframeCore.ContextMenu.Content
              asChild={true}
            >
              <ContextMenu>
                <ContextMenu.ContextItem
                  icon={<FeatherCheck />}
                  rightSlot={<Badge variant="neutral">⌘C</Badge>}
                >
                  Enabled
                </ContextMenu.ContextItem>
                <ContextMenu.ContextItem
                  icon={<FeatherEyeOff />}
                  rightSlot={<Badge variant="neutral">⌘C</Badge>}
                >
                  Hide
                </ContextMenu.ContextItem>
                <ContextMenu.ContextItem
                  icon={null}
                  rightSlot={<Badge variant="neutral">⌘G</Badge>}
                >
                  Wrap with stack
                </ContextMenu.ContextItem>
                <ContextMenu.ContextDivider />
                <ContextMenu.ContextItem
                  icon={<FeatherComponent />}
                  rightSlot={<Badge variant="neutral">⌘C</Badge>}
                >
                  Create component
                </ContextMenu.ContextItem>
                <ContextMenu.ContextItem
                  icon={null}
                  rightSlot={<Badge variant="neutral">⌘C</Badge>}
                >
                  View code
                </ContextMenu.ContextItem>
                <ContextMenu.ContextItem
                  icon={<FeatherCopy />}
                  rightSlot={<Badge variant="neutral">⌘C</Badge>}
                >
                  Copy
                </ContextMenu.ContextItem>
                <ContextMenu.ContextItem
                  icon={<FeatherTrash />}
                  rightSlot={<Badge variant="neutral">⌘D</Badge>}
                >
                  Delete
                </ContextMenu.ContextItem>
              </ContextMenu>
            </SubframeCore.ContextMenu.Content>
          </SubframeCore.ContextMenu.Portal>
        </SubframeCore.ContextMenu.Root>
        <div className="flex items-center justify-end gap-2">
          <div className="flex grow shrink-0 basis-0 items-center justify-center gap-1">
            <div className="flex items-center justify-center gap-1">
              <IconButton
                icon={<FeatherChevronFirst />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
              />
              <IconButton
                icon={<FeatherChevronLeft />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
              />
            </div>
            <div className="flex items-center justify-center gap-1">
              <Button
                variant="neutral-tertiary"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
              >
                1
              </Button>
              <Button
                variant="neutral-tertiary"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
              >
                2
              </Button>
              <Button
                variant="brand-secondary"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
              >
                3
              </Button>
              <Button
                variant="neutral-tertiary"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
              >
                4
              </Button>
              <Button
                variant="neutral-tertiary"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
              >
                5
              </Button>
            </div>
            <div className="flex items-center justify-center gap-1">
              <IconButton
                icon={<FeatherChevronRight />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
              />
              <IconButton
                icon={<FeatherChevronLast />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;