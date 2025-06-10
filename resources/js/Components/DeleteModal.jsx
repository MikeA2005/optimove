import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useForm, Link } from "@inertiajs/react";
import Modal from "./Default/Modal";

export default function DeleteModal({
    isOpen,
    onClose,
    data,
    routeName,
    text = "¿Estás seguro que deseas eliminar este registro?",
}) {
    const { delete: destroy, processing } = useForm();

    const handleDeleteSubmit = () => {
        destroy(route(`${routeName}.destroy`, data), {
            preserveScroll: true,
            onSuccess: () => onClose(),
        });
    };

    return (
        <Modal show={isOpen} onClose={onClose}>
            <HiOutlineExclamationCircle className="w-10 h-10 my-4 mx-auto text-red-600" />

            <h3 className="mb-4 text-center text-lg text-gray-500 dark:text-gray-400">
                {text}
            </h3>

            <div className="inline-flex items-center justify-center w-full space-x-2 mb-4">
                <button
                    onClick={handleDeleteSubmit}
                    disabled={processing}
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2.5 text-center mr-2 dark:focus:ring-red-900"
                >
                    Sí, estoy seguro
                </button>
                <button
                    onClick={onClose}
                    className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 border border-gray-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2.5 text-center dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                    No, cancelar
                </button>
            </div>
        </Modal>
    );
}
