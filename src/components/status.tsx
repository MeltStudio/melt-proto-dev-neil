import React from 'react';
import { Status } from '../utils/enums';
import { Badge } from '../ui';

interface Props {
    status: Status;
}

export function StatusBadge({ status }: Props) {
    const variant = status === Status.READY_TO_START ? 'brand' : status === Status.IN_PRGRESS ? 'warning' : 'success';
    
    return <Badge variant={variant}>{status}</Badge>;
}
