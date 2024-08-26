import React, { useState, useRef } from "react";
import InputError from "./Default/InputError";

const SearchBar = ({ placeholder = "Search", onSearchChange, initialSearchTerm = "" , onError}) => {
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [searchError, setSearchError] = useState(null);
    const debounceTimeout = useRef(null);

    const handleChange = (e) => {
        const newTerm = e.target.value;
        setSearchTerm(newTerm);
        setSearchError(null);

        // Debounce the search
        clearTimeout(debounceTimeout.current);
        debounceTimeout.current = setTimeout(() => {
            try {
                onSearchChange(newTerm);
            } catch (error) {
                setSearchError(error.message || "An error occurred during the search.");
                if (onError) {
                    onError(error);
                }
            }
        }, 300);
    };

    return (
        <div className="relative mt-1 lg:w-64 xl:w-96">
            <input
                type="text"
                name="search"
                value={searchTerm}
                placeholder={placeholder}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleChange}
                aria-label="Search"
                role="searchbox"
            />
            <InputError message={searchError} className="mt-2" />
        </div>
    );
};

export default SearchBar;
