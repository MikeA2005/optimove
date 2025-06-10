import { HiPlusSm, HiDocumentDownload } from "react-icons/hi";
import { Link } from "@inertiajs/react";
import { Breadcrumb } from "flowbite-react";
import React, { useState } from "react";
import SearchBar from "./SearchBar";

function PageHeader({
    title,
    breadcrumbs,
    searchPlaceholder = "Buscar",
    onAddClick,
    addButtonText = "Agregar",
    exportUrl,
    onSearch = () => {},
    initialSearchTerm = "",
}) {
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

    return (
        <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="w-full mb-1">
                {/* Breadcrumb and title */}
                <div className="mb-4">
                    <Breadcrumb className="flex mb-5">
                        {breadcrumbs.map((crumb, index) => (
                            <Breadcrumb.Item
                                key={index}
                                href={crumb.url}
                                icon={crumb.icon}
                            >
                                {crumb.label}
                            </Breadcrumb.Item>
                        ))}
                    </Breadcrumb>
                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                        {title}
                    </h1>
                </div>
                
                {/* Search Bar and Action Buttons */}
                <div className="sm:flex">
                    {/* Search Bar (only on larger screens) */}
                    <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
                        <SearchBar
                            placeholder={searchPlaceholder}
                            onSearchChange={(term) => {
                                setSearchTerm(term);
                                onSearch(term);
                            }}
                            searchTerm={searchTerm}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
                        {onAddClick && (
                            <button
                                className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={onAddClick}
                            >
                                <HiPlusSm className="mr-2 h-5 w-5" />
                                {addButtonText}
                            </button>
                        )}

                        {exportUrl && (
                            <a
                                className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                                href={exportUrl}
                                rel="noopener noreferrer"
                            >
                                <HiDocumentDownload className="mr-2 h-5 w-5" />
                                Exportar
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PageHeader;
