import { Table, Button } from "flowbite-react";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import PropTypes from "prop-types";

function GenericTable({ data, columns, onEdit, onDelete }) {
    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <Table
                        aria-label="Data Table"
                        hoverable
                        theme={{
                            root: {
                                base: "min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600",
                                shadow: "absolute left-0 top-0 -z-10 h-full w-full bg-white drop-shadow-md dark:bg-gray-800",
                                wrapper: "overflow-hidden shadow",
                            },
                            head: {
                                base: "bg-gray-100 dark:bg-gray-700",
                                cell: {
                                    base: "p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400",
                                },
                            },
                            body: {
                                base: "bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700",
                                cell: {
                                    base: "p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white",
                                },
                            },
                        }}
                    >
                        <Table.Head>
                            {columns.map((column) => (
                                <Table.HeadCell key={column.key} scope="col">
                                    {column.label}
                                </Table.HeadCell>
                            ))}
                            <Table.HeadCell scope="col">
                                Acciones
                            </Table.HeadCell>
                        </Table.Head>

                        <Table.Body>
                            {data.map((item) => (
                                <Table.Row key={item.id}>
                                    {columns.map((column) => (
                                        <Table.Cell key={column.key}>
                                            {typeof column.render === "function"
                                                ? column.render(item)
                                                : item[column.key]}
                                        </Table.Cell>
                                    ))}

                                    {/* Acciones */}
                                    <Table.Cell className="p-4 space-x-2 whitespace-nowrap">
                                        {/* Remove extra whitespace here */}
                                        <Button
                                            color="blue"
                                            size="xs"
                                            className="inline-flex items-center"
                                            onClick={() => onEdit(item)}
                                            aria-label={`Edit ${item.id}`}
                                        >
                                            <HiOutlinePencilAlt className="h-5 w-5" />
                                        </Button>

                                        <Button
                                            color="failure"
                                            size="xs"
                                            className="inline-flex items-center"
                                            onClick={() => onDelete(item)}
                                            aria-label={`Delete ${item.id}`}
                                        >
                                            <HiOutlineTrash className="h-5 w-5" />
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </div>
    );
}

GenericTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default GenericTable;
