import React from 'react';
import { Table } from '../ui';


function LoadingCell() {
    return (
        <Table.Cell>
            <div className="flex h-4 w-24 flex-none items-start rounded-md bg-neutral-200 @keyframes pulse animate-pulse" />
        </Table.Cell>
    );
}


export default function Skeleton() {
    return [1, 2, 3, 4, 5].map(i => (
        <Table.Row key={i}>
            <LoadingCell />
            <LoadingCell />
            <LoadingCell />
            <LoadingCell />
            <LoadingCell />
        </Table.Row>
    ));
}
