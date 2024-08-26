// Importaciones necesarias para el componente
import { HiOutlinePencilAlt, HiOutlinePlus } from "react-icons/hi";
import InputError from "@/Components/Default/InputError";
import { useForm } from "@inertiajs/react";
import { Button, Drawer } from "flowbite-react";
import React, { useEffect } from "react";
import CustomDatepicker from "@/Components/CustomDatepicker";

// Componente DisabilityDrawer para gestionar las incapacidades
function DisabilityDrawer({ isOpen, onClose, disability = null, employees }) {
    const isEditing = disability !== null; // Determina si está editando una incapacidad existente

    // useForm de Inertia.js para manejar el formulario
    const { data, setData, errors, post, put, processing, reset } = useForm({
        employee_id: "",
        start_date: "",
        end_date: "",
        type: "",
        description: "",
        daily_value: "",
    });

    // Efecto para cargar los datos de la incapacidad en el formulario si se está editando
    useEffect(() => {
        if (disability && isEditing) {
            setData({
                employee_id: disability.employee.id || "",
                start_date: disability.start_date || "",
                end_date: disability.end_date || "",
                type: disability.type || "",
                description: disability.description || "",
                daily_value: disability.daily_value || "",
            });
        }
    }, [disability]);

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        const method = isEditing ? put : post;
        const routeName = isEditing
            ? route("disabilities.update", disability.id)
            : route("disabilities.store");

        method(routeName, {
            onSuccess: () => {
                onClose();
                reset();
            },
            onError: (error) => {
                console.log("Error handling disability: ", error);
            },
        });
    };

    // Renderiza el Drawer con el formulario de incapacidad
    return (
        <Drawer open={isOpen} onClose={onClose} position="right">
            <Drawer.Header
                title={isEditing ? "Editar incapacidad" : "Agregar incapacidad"}
                titleIcon={isEditing ? HiOutlinePencilAlt : HiOutlinePlus}
            />
            <Drawer.Items>
                <form onSubmit={handleSubmit}>
                    {/* Formulario y campos para el cliente */}
                    <div className="space-y-2">
                        {/* Empleado */}
                        <div>
                            <label htmlFor="employee_id" className="label">
                                Empleado
                            </label>
                            <select
                                id="employee_id"
                                value={data.employee_id}
                                onChange={(e) =>
                                    setData("employee_id", e.target.value)
                                }
                                className="input"
                            >
                                <option value="">
                                    Seleccione el empleado...
                                </option>
                                {employees.data.map((employee) => (
                                    <option
                                        key={employee.id}
                                        value={employee.id}
                                    >
                                        {employee.first_name +
                                            " " +
                                            employee.last_name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.employee_id} />
                        </div>

                        {/* Fecha de Inicio */}
                        <div>
                            <label htmlFor="start_date" className="label">
                                Fecha de Inicio
                            </label>
                            <CustomDatepicker
                                id="start_date"
                                value={data.start_date}
                                onChange={(start_date) =>
                                    setData("start_date", start_date)
                                }
                            />
                            <InputError message={errors.start_date} />
                        </div>

                        {/* Fecha de Fin */}
                        <div>
                            <label htmlFor="end_date" className="label">
                                Fecha de Fin
                            </label>
                            <CustomDatepicker
                                id="end_date"
                                value={data.end_date}
                                onChange={(end_date) =>
                                    setData("end_date", end_date)
                                }
                            />
                            <InputError message={errors.end_date} />
                        </div>

                        {/* Tipo de Incapacidad */}
                        <div>
                            <label htmlFor="type" className="label">
                                Tipo de Incapacidad
                            </label>
                            <input
                                type="text"
                                id="type"
                                value={data.type}
                                onChange={(e) =>
                                    setData("type", e.target.value)
                                }
                                className="input"
                            />
                            <InputError message={errors.type} />
                        </div>

                        {/* Descripción */}
                        <div>
                            <label htmlFor="description" className="label">
                                Descripción
                            </label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className="input"
                            />
                            <InputError message={errors.description} />
                        </div>

                        {/* Valor Diario */}
                        <div>
                            <label htmlFor="daily_value" className="label">
                                Valor Diario
                            </label>
                            <input
                                type="text"
                                id="daily_value"
                                value={data.daily_value}
                                onChange={(e) =>
                                    setData("daily_value", e.target.value)
                                }
                                className="input"
                            />
                            <InputError message={errors.daily_value} />
                        </div>

                        {/* Botón para guardar o actualizar el incapacidad */}
                        <Button
                            type="submit"
                            disabled={processing}
                            color="blue"
                            className="mt-4 w-full text-base font-medium"
                        >
                            {isEditing
                                ? "Actualizar incapacidad"
                                : "Guardar incapacidad"}
                        </Button>
                    </div>
                </form>
            </Drawer.Items>
        </Drawer>
    );
}

export default DisabilityDrawer;
