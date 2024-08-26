import React, { useState, useEffect, useRef } from "react";
import { Datepicker } from "flowbite-react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/es"; // Import Spanish locale for dayjs

dayjs.extend(customParseFormat); // Extend dayjs with custom parsing plugin
dayjs.locale("es");

function CustomDatepicker({
    id,
    label,
    value,
    onChange,
    disabled = false,
    error = null,
    className = "",
    ...props
}) {
    const [selectedDate, setSelectedDate] = useState(dayjs()); // Initialize with dayjs
    const [displayedDate, setDisplayedDate] = useState("");

    useEffect(() => {
        if (value) {
            const parsedDate = dayjs(value, "YYYY-MM-DD", true); // Parse with format and strict mode
            if (parsedDate.isValid()) {
                setSelectedDate(parsedDate);
                setDisplayedDate(parsedDate.format("D MMMM YYYY")); // Format for display
            } else {
                // Handle invalid dates gracefully
                setSelectedDate(dayjs());
                setDisplayedDate("");
            }
        } else {
            setSelectedDate(dayjs());
            setDisplayedDate("");
        }
    }, [value]);

    const handleDateChange = (id) => {
        // Format for display
        setDisplayedDate(dayjs(id).format("D MMMM YYYY"));

        // Format for server (ISO)
        const formattedDate = dayjs(id).format("YYYY-MM-DD");
        setSelectedDate(dayjs(id));
        onChange(formattedDate);
    };

    return (
        <Datepicker
            id={id}
            value={displayedDate || "Seleccione una fecha"}
            disabled={disabled}
            className={`w-full ${className}`}
            onSelectedDateChanged={handleDateChange}
            showClearButton={false}
            theme={{
                root: {
                    base: "relative",
                },
                popup: {
                    root: {
                        base: "absolute top-10 z-50 block pt-2",
                        inner: "inline-block rounded-lg bg-white p-4 shadow-lg dark:bg-gray-700",
                    },
                    header: {
                        title: "px-2 py-3 text-center font-semibold text-gray-900 dark:text-white",
                        selectors: {
                            button: {
                                base: "rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
                            },
                        },
                    },
                    view: {
                        base: "p-1",
                    },
                    footer: {
                        base: "mt-2 flex space-x-2",
                        button: {
                            base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-blue-300",
                            today: "bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700",
                            clear: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
                        },
                    },
                },
                views: {
                    days: {
                        header: {
                            title: "h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400",
                        },
                        items: {
                            item: {
                                base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                                selected:
                                    "bg-blue-700 text-white hover:bg-blue-600",
                                disabled: "text-gray-500",
                            },
                        },
                    },
                    months: {
                        items: {
                            base: "grid w-64 grid-cols-4",
                            item: {
                                base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                                selected:
                                    "bg-blue-700 text-white hover:bg-blue-600",
                                disabled: "text-gray-500",
                            },
                        },
                    },
                    years: {
                        items: {
                            base: "grid w-64 grid-cols-4",
                            item: {
                                base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                                selected:
                                    "bg-blue-700 text-white hover:bg-blue-600",
                                disabled: "text-gray-500",
                            },
                        },
                    },
                    decades: {
                        items: {
                            base: "grid w-64 grid-cols-4",
                            item: {
                                base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                                selected:
                                    "bg-blue-700 text-white hover:bg-blue-600",
                                disabled: "text-gray-500",
                            },
                        },
                    },
                },
            }}
            language="es"
            labelTodayButton="Hoy"
            {...props}
        />
    );
}

export default CustomDatepicker;
