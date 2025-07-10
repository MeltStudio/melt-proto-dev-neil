import { FeatherFile, FeatherPlus } from '@subframe/core';
import React from 'react';
import { IconWithBackground, Button } from '../ui';
import Link from 'next/link';

export default function EmptyState() {
    return (
        <div className="flex w-full flex-col items-center gap-4 px-6 py-6">
            <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col items-start gap-2">
                    <IconWithBackground size="large" icon={<FeatherFile />} />
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span className="text-heading-3 font-heading-3 text-default-font">
                        No tasks yet
                    </span>
                    <span className="text-body font-body text-subtext-color">
                        Start by creating a new task to get organized.
                    </span>
                </div>
            </div>

            <Link href='/new'>
                <Button
                    icon={<FeatherPlus />}
                >
                    New task
                </Button>
            </Link>
        </div>
    );
}
