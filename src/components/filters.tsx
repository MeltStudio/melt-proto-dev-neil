"use client";

import React, { useState } from "react";
import { Button } from "@/ui/components/Button";
import { TextField } from "@/ui/components/TextField";
import { FeatherSearch } from "@subframe/core";
import { Select } from "@/ui/components/Select";
import { FeatherCheckCircle } from "@subframe/core";
import { Calendar } from "@/ui/components/Calendar";
import * as SubframeCore from "@subframe/core";
import { FeatherCalendar } from "@subframe/core";
import { TaskFilters } from "../utils/types";
import { Status } from "../utils/enums";

interface Props {
    filters: TaskFilters,
    changeFilters: React.Dispatch<React.SetStateAction<TaskFilters>>;
    hasFilters: boolean;
    resetFilters: VoidFunction;
}

export function Filters({ filters, changeFilters, hasFilters, resetFilters }: Props) {
    return (
        <div className="flex w-full items-center gap-4">
            <span className="text-body-bold font-body-bold text-default-font">
                Filter by
            </span>
            <div className="flex grow shrink-0 basis-0 items-center gap-2">
                <TextField icon={<FeatherSearch />}>
                    <TextField.Input
                        placeholder="Search tasks"
                        value={filters.search}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeFilters(prev => ({ ...prev, search: event.target.value }))}
                    />
                </TextField>
                <Select
                    placeholder="Select an status"
                    icon={<FeatherCheckCircle />}
                    value={filters.status || ''}
                    onValueChange={(value) => {
                        changeFilters(prev => ({
                            ...prev,
                            status: value as TaskFilters['status']
                        }));
                    }}
                >
                    <Select.Item value={Status.READY_TO_START}>Ready to start</Select.Item>
                    <Select.Item value={Status.IN_PRGRESS}>In progress</Select.Item>
                    <Select.Item value={Status.COMPLETED}>Completed</Select.Item>
                </Select>
                <SubframeCore.Popover.Root>
                    <SubframeCore.Popover.Trigger asChild={true}>
                        <Button
                            variant="neutral-secondary"
                            icon={<FeatherCalendar />}
                        >
                            {filters.date?.toDateString() || 'Select a date'}
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
                                    selected={filters.date}
                                    onSelect={(date) => {
                                        changeFilters(prev => ({
                                            ...prev,
                                            date
                                        }));
                                    }}
                                />
                            </div>
                        </SubframeCore.Popover.Content>
                    </SubframeCore.Popover.Portal>
                </SubframeCore.Popover.Root>
                {hasFilters && <Button
                    variant="brand-tertiary"
                    onClick={resetFilters}
                >
                    Clear filters
                </Button>}
            </div>
        </div>
    );
}
