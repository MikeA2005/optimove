// Importaciones necesarias para el componente
import { HiOutlinePencilAlt, HiOutlinePlus } from "react-icons/hi";
import InputError from "@/Components/Default/InputError";
import { useForm } from "@inertiajs/react";
import { Button, Drawer } from "flowbite-react";
import React, { useEffect } from "react";
import CustomDatepicker from "@/Components/CustomDatepicker";

// Componente Drawer para agregar o editar horas extras
export default function OvertimeDrawer({
    isOpen,
    onClose,
    overtime = null,
    employees,
    overtimeTypes,
}) {
    const isEditing = overtime !== null; // Determina si se está editando horas extras

    // useForm de Inertia.js para manejar el formulario
    const { data, setData, post, put, processing, errors, reset } = useForm({
        date: "",
        employee_id: "",
        overtime_type_id: "",
        hours: "",
    });

    // Efecto para cargar los datos de las horas extras en el formulario si se está editando
    useEffect(() => {
        if (overtime && isEditing) {
            setData({
                date: overtime.date || "",
                employee_id: overtime.employee.id || "",
                overtime_type_id: overtime.overtime_type.id || "",
                hours: overtime.hours || "",
            });
        }
    }, [overtime]);

    // Efecto para calcular el valor de la cuota y el monto pendiente por pagar
    useEffect(() => {
        if (data.amount && data.installments) {
            const value = parseFloat(data.amount) / parseInt(data.installments);
            setData({
                ...data,
                installment_value: value.toFixed(2),
                pending_amount: data.amount,
            });
        } else {
            setData({
                ...data,
                installment_value: "",
                pending_amount: "",
            });
        }
    }, [data.amount, data.installments]);

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        const method = isEditing ? put : post;
        const routeName = isEditing
            ? route("overtimes.update", overtime.id)
            : route("overtimes.store");

        method(routeName, {
            onSuccess: () => {
                onClose();
                reset();
            },
            onError: (error) => {
                console.log("Error handling overtime", error);
            },
        });
    };

    // Renderiza el drawer de horas extras
    return (
        <Drawer open={isOpen} onClose={onClose} position="right">
            <Drawer.Header
                title={isEditing ? "Editar hora extra" : "Agregar hora extra"}
                titleIcon={isEditing ? HiOutlinePencilAlt : HiOutlinePlus}
            />
            <Drawer.Items>
                <form onSubmit={handleSubmit}>
                    {/* Formulario y campos para la hora extra */}
                    <div className="space-y-2">
                        {/* Fecha de Hora Extra */}
                        <div>
                            <label htmlFor="date" className="label">
                                Fecha de Hora Extra
                            </label>
                            <CustomDatepicker
                                id="date"
                                value={data.date}
                                onChange={(date) =>
                                    setData("date", date)
                                }
                            />
                            <InputError message={errors.date} />
                        </div>

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
                                    Seleccionar empleado...
                                </option>
                                {employees.data.map((employee) => (
                                    <option
                                        key={employee.id}
                                        value={employee.id}
                                    >
                                        {employee.first_name}{" "}
                                        {employee.last_name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.employee_id} />
                        </div>

                        {/* Tipo de Hora Extra */}
                        <div>
                            <label htmlFor="overtime_type_id" className="label">
                                Tipo de Hora Extra
                            </label>
                            <select
                                id="overtime_type_id"
                                value={data.overtime_type_id}
                                onChange={(e) =>
                                    setData("overtime_type_id", e.target.value)
                                }
                                className="input"
                            >
                                <option value="">Seleccionar tipo...</option>
                                {overtimeTypes.data.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.type_name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.overtime_type_id} />
                        </div>

                        {/* Horas */}
                        <div>
                            <label htmlFor="hours" className="label">
                                Horas
                            </label>
                            <input
                                id="hours"
                                value={data.hours}
                                onChange={(e) =>
                                    setData("hours", e.target.value)
                                }
                                className="input"
                            />
                            <InputError message={errors.hours} />
                        </div>
                    </div>

                    {/* Botón para agregar o editar hora extra */}
                    <Button
                        type="submit"
                        disabled={processing}
                        color="blue"
                        className="mt-4 w-full text-base font-medium"
                    >
                        {isEditing ? "Editar hora extra" : "Agregar hora extra"}
                    </Button>
                </form>
            </Drawer.Items>
        </Drawer>
    );
}
