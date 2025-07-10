"use client";

import React, { useState } from "react";
import { TextField } from "@/ui/components/TextField";
import { TextArea } from "@/ui/components/TextArea";
import { Select } from "@/ui/components/Select";
import { Calendar } from "@/ui/components/Calendar";
import * as SubframeCore from "@subframe/core";
import { Button } from "@/ui/components/Button";
import { FeatherCalendar } from "@subframe/core";
import { useRouter } from "next/navigation";
import { Status } from "../utils/enums";

interface FormData {
    title: string;
    description: string;
    status: Status,
    dueDate: Date | undefined;
}

interface Props {
    action?: 'create' | 'edit';
    onSubmit?: (formData: FormData) => Promise<void>;
    default_values?: FormData;
}

const DEFAULT_VALUES = {
    title: '',
    description: '',
    status: Status.READY_TO_START,
    dueDate: new Date()
};

const validateForm = (formData: FormData) => {
    return Object.entries(formData).filter(([_, val]) => !val).map(([key]) => `${key} is a required field.`);
};

export function Form({
    action = 'create',
    onSubmit,
    default_values = DEFAULT_VALUES
}: Props) {
    const [form, setForm] = useState(default_values);
    const [errors, setErrors] = useState<Array<string> | null>(null);
    const [loading, setLoading] = useState(false);
    const { back } = useRouter();

    const handleSubmit = async () => {
        const errors = validateForm(form);

        if (errors) return setErrors(errors);
        setLoading(true)

        try {
            await onSubmit?.(form);
        } catch (error: any) {
            setErrors([error.message])
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="container max-w-none flex h-full w-full flex-col items-center gap-4 bg-default-background py-12">
            <div className="flex w-full max-w-[448px] flex-col items-start gap-8">
                <div className="flex w-full flex-col items-start gap-6">
                    <div className="flex w-full flex-col items-start">
                        <span className="text-heading-1 font-heading-3 text-default-font">
                            {action === 'create' ? (
                                'Create New Task'
                            ) :
                                'Edit Task'
                            }
                        </span>
                        {action === 'create' && (
                            <span className="text-body font-body text-subtext-color">
                                Add details for your new task
                            </span>)}
                    </div>
                    <div className="flex flex-col gap-1">
                        {errors?.map((err) => (
                            <span key={err} className="text-caption-bold font-caption-bold text-error-500">
                                {err}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex w-full flex-col items-start gap-6">
                    <TextField
                        className="h-auto w-full flex-none"
                        label="Title"
                    >
                        <TextField.Input
                            placeholder="Enter task title"
                            value={form.title}
                            onChange={(event) => {
                                setForm(prev => ({
                                    ...prev,
                                    title: event.target.value
                                }));
                            }}
                        />
                    </TextField>
                    <TextArea
                        className="h-auto w-full flex-none"
                        label="Description"
                    >
                        <TextArea.Input
                            placeholder="Enter task description"
                            value={form.description}
                            onChange={(event) => {
                                setForm(prev => ({
                                    ...prev,
                                    description: event.target.value
                                }));
                            }}
                        />
                    </TextArea>
                    <Select
                        label="Status"
                        placeholder="Select status"
                        value={form.status}
                        onValueChange={(value) => {
                            setForm(prev => ({
                                ...prev,
                                status: value as Status
                            }));
                        }}
                    >
                        <Select.Item value={Status.READY_TO_START}>Ready to start</Select.Item>
                        <Select.Item value={Status.IN_PRGRESS}>In progress</Select.Item>
                        <Select.Item value={Status.COMPLETED}>Completed</Select.Item>
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
                                >
                                    {form.dueDate?.toDateString() || 'Select due date'}
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
                                            selected={form.dueDate}
                                            onSelect={(date) => {
                                                setForm(prev => ({
                                                    ...prev,
                                                    dueDate: date
                                                }));
                                            }}
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
                        onClick={back}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="h-8 grow shrink-0 basis-0 capitalize"
                        onClick={handleSubmit}
                        loading={loading}
                    >
                        {action} Task
                    </Button>
                </div>
            </div>
        </div>
    );
}