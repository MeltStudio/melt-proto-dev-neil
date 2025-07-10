import React from 'react';
import { IconButton } from "@/ui/components/IconButton";
import { FeatherChevronFirst } from "@subframe/core";
import { FeatherChevronLeft } from "@subframe/core";
import { FeatherChevronRight } from "@subframe/core";
import { FeatherChevronLast } from "@subframe/core";
import { Button } from '../ui';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-end gap-2">
			<IconButton icon={<FeatherChevronFirst />} onClick={() => onPageChange(1)} />
			<IconButton icon={<FeatherChevronLeft />} onClick={() => onPageChange(Math.max(currentPage - 1, 1))} />
			{Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
				<Button
					key={pageNum}
					variant={pageNum === currentPage ? 'brand-secondary' : 'neutral-tertiary'}
					onClick={() => onPageChange(pageNum)}
				>
					{pageNum}
				</Button>
			))}
			<IconButton icon={<FeatherChevronRight />} onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))} />
			<IconButton icon={<FeatherChevronLast />} onClick={() => onPageChange(totalPages)} />
		</div>
  );
}
