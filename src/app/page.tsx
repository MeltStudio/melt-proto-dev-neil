"use client";

import React, { useState } from "react";
import { Button } from "@/ui/components/Button";
import { FeatherPlus } from "@subframe/core";
import * as SubframeCore from "@subframe/core";
import { Table } from "@/ui/components/Table";
import { FeatherArrowUp, FeatherArrowDown } from "@subframe/core";
import Link from "next/link";
import Skeleton from "../components/skeleton";
import { useTaskContext } from "../providers/fake-api-provider";
import { useQuery } from "@tanstack/react-query";
import { Task } from "../components/task";
import { EmptyState } from "../components/empty-state";
import { Filters } from "../components/filters";
import { TaskFilters, TaskSort } from "../utils/types";
import { Pagination } from "../components/pagination";

const default_values = {
  search: '',
  status: undefined,
  date: undefined
};

const PAGE_SIZE = 10;
const columnTitles = [
  {
    label: 'Title',
    val: 'title'
  },
  {
    label: 'Description',
    val: 'description'
  },
  {
    label: 'Status',
    val: 'status'
  },
  {
    label: 'Due Date',
    val: 'dueDate'
  },
];

function Home() {
  const { getTasks, paginateTasks } = useTaskContext();
  const { isPending, data, refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<TaskSort | undefined>(undefined);
  const [filters, setFilters] = useState<TaskFilters>(default_values);
  const hasFilters = Object.values(filters).some(v => v);

  const { data: pagedData, total } = paginateTasks(filters, page, PAGE_SIZE, sort);
  const totalPages = Math.ceil(total / PAGE_SIZE) || 1;

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

        <Filters filters={filters} changeFilters={setFilters} hasFilters={hasFilters} resetFilters={resetFilters} />

        <SubframeCore.ContextMenu.Root>
          <SubframeCore.ContextMenu.Trigger asChild={true}>
            <>
              <Table
                header={
                  <Table.HeaderRow>
                    {columnTitles.map(({label, val}) => (
                      <Table.HeaderCell key={label}
                        onClick={() => {
                          setSort((prev) => ({ key: val, direction: prev?.direction === 'asc' ? 'desc' : 'asc'}));
                        }}
                        icon={
                          sort?.key === val ? (sort.direction === 'asc' ? <FeatherArrowUp /> : <FeatherArrowDown />) : null
                        }>
                        {label}
                      </Table.HeaderCell>
                    ))}
                  </Table.HeaderRow>
                }
              >
                {isPending ? (
                  <Skeleton />
                ) : pagedData?.map((task) =>
                  <Task key={task.id} task={task} refetch={refetch} />
                )}
              </Table>
              {!data?.length && <EmptyState />}
            </>
          </SubframeCore.ContextMenu.Trigger>
        </SubframeCore.ContextMenu.Root>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </>
  );
}

export default Home;