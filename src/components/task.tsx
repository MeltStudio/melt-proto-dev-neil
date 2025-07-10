import React from "react";
import * as SubframeCore from "@subframe/core";
import { Table } from "@/ui/components/Table";
import { DropdownMenu } from "@/ui/components/DropdownMenu";
import { FeatherEdit2 } from "@subframe/core";
import { FeatherTrash } from "@subframe/core";
import { IconButton } from "@/ui/components/IconButton";
import { FeatherMoreHorizontal } from "@subframe/core";
import { StatusBadge } from "./status-badge";
import { Task as TskType } from "../utils/types";
import { useRouter } from "next/navigation";
import { useTaskContext } from "../providers/fake-api-provider";
import { useMutation } from "@tanstack/react-query";

interface Props {
    task: TskType;
    refetch: VoidFunction
}

export function Task({ task, refetch }: Props) {
    const { id, title, description, status, dueDate } = task;
    const { push } = useRouter();
    const { deleteTask } = useTaskContext();
    const mutation = useMutation({
        mutationFn: deleteTask,
        onSuccess: () => push('/'),
    });

    const handleDelete = async () => {
        await mutation.mutateAsync(id)
        refetch()
    }

    return (
        <Table.Row>
            <Table.Cell>
                <span className="whitespace-nowrap text-body-bold font-body-bold text-neutral-700">
                    {title}
                </span>
            </Table.Cell>
            <Table.Cell>
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    {description}
                </span>
            </Table.Cell>
            <Table.Cell>
                <StatusBadge status={status} />
            </Table.Cell>
            <Table.Cell>
                <div className="flex grow shrink-0 basis-0 items-center gap-2 self-stretch">
                    <span className="text-body font-body text-default-font">
                        {dueDate.toDateString()}
                    </span>
                </div>
            </Table.Cell>
            <Table.Cell>
                <div className="flex grow shrink-0 basis-0 items-center justify-end">
                    <SubframeCore.DropdownMenu.Root>
                        <SubframeCore.DropdownMenu.Trigger asChild={true}>
                            <IconButton
                                icon={<FeatherMoreHorizontal />}
                                onClick={(
                                    event: React.MouseEvent<HTMLButtonElement>
                                ) => { }}
                            />
                        </SubframeCore.DropdownMenu.Trigger>
                        <SubframeCore.DropdownMenu.Portal>
                            <SubframeCore.DropdownMenu.Content
                                side="bottom"
                                align="end"
                                sideOffset={8}
                                asChild={true}
                            >
                                <DropdownMenu>

                                    <DropdownMenu.DropdownItem onClick={() => push(`/edit/${id}`)} icon={<FeatherEdit2 />}>
                                        Edit
                                    </DropdownMenu.DropdownItem>
                                    <DropdownMenu.DropdownItem onClick={handleDelete} icon={<FeatherTrash />}>
                                        Delete
                                    </DropdownMenu.DropdownItem>
                                </DropdownMenu>
                            </SubframeCore.DropdownMenu.Content>
                        </SubframeCore.DropdownMenu.Portal>
                    </SubframeCore.DropdownMenu.Root>
                </div>
            </Table.Cell>
        </Table.Row>
    );
}
