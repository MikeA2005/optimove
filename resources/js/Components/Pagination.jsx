import { Link } from "@inertiajs/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import clsx from 'clsx';

export default function Pagination({ links, meta}) {
  return (
    <div 
      className="items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="flex items-center mb-4 sm:mb-0">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Mostrando 
          <span className="font-semibold text-gray-900 dark:text-white"> {meta.from} - {meta.to} </span> de 
          <span className="font-semibold text-gray-900 dark:text-white"> {meta.total} </span>
        </span>
      </div>

      <div className="flex items-center space-x-3">
        {/* Previous Link */}
        <Link 
          href={links.prev || "#"}  // Fallback to "#" if no previous link
          className={clsx(
            "inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center rounded-lg focus:ring-4 focus:ring-blue-300",
            links.prev 
              ? "text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"  // Active styles
              : "text-gray-500 bg-gray-200 cursor-default dark:text-gray-400 dark:bg-gray-700"  // Disabled styles
          )}
          preserveScroll
          disabled={!links.prev}  // Disable if no previous link
        >
          <HiChevronLeft className="w-5 h-5 mr-1 -ml-1" />
          Anterior
        </Link>

        {/* Next Link */}
        <Link
          href={links.next || "#"} // Fallback to "#" if no next link
          className={clsx(
            "inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center rounded-lg focus:ring-4 focus:ring-blue-300",
            links.next 
              ? "text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" // Active styles
              : "text-gray-500 bg-gray-200 cursor-default dark:text-gray-400 dark:bg-gray-700" // Disabled styles
          )}
          preserveScroll
          disabled={!links.next}  // Disable if no next link
        >
          Siguiente
          <HiChevronRight className="w-5 h-5 ml-1 -mr-1" />
        </Link>
      </div>
    </div>
  );
}