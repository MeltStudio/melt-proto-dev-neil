"use client";

import React, { useState } from "react";
import { Button } from "@/ui/components/Button";
import { FeatherPlus } from "@subframe/core";
import * as SubframeCore from "@subframe/core";
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
import { EmptyState } from "../components/empty-state";
import { Filters } from "../components/filters";
import { TaskFilters } from "../utils/types";

const default_values = {
    search: '',
    status: undefined,
    date: undefined
};

function Home() {
  const { getTasks, filterTasks } = useTaskContext();
  const { isPending, data, refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });
  const [filters, setFilters] = useState<TaskFilters>(default_values);
  const hasFilters = Object.values(filters).some(v => v);

  const parsedData = filterTasks(filters)


  const resetFilters = () => {
    setFilters(default_values);
  };

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

        <Filters filters={filters} changeFilters={setFilters} hasFilters={hasFilters} resetFilters={resetFilters}  />

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
                ) : parsedData?.map((task) =>
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