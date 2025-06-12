import React from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  className = '',
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const maxVisiblePages = 5;
  const halfVisiblePages = Math.floor(maxVisiblePages / 2);

  let visiblePages = pages;
  if (totalPages > maxVisiblePages) {
    const start = Math.max(
      Math.min(
        currentPage - halfVisiblePages,
        totalPages - maxVisiblePages + 1
      ),
      1
    );
    visiblePages = pages.slice(start - 1, start - 1 + maxVisiblePages);
  }

  return (
    <nav
      className={`flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 ${className}`}
    >
      <div className="-mt-px flex w-0 flex-1">
        {showFirstLast && (
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronDoubleLeftIcon className="mr-3 h-5 w-5" aria-hidden="true" />
            Première
          </button>
        )}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeftIcon className="mr-3 h-5 w-5" aria-hidden="true" />
          Précédent
        </button>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
              currentPage === page
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Suivant
          <ChevronRightIcon className="ml-3 h-5 w-5" aria-hidden="true" />
        </button>
        {showFirstLast && (
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Dernière
            <ChevronDoubleRightIcon className="ml-3 h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>
    </nav>
  );
} 