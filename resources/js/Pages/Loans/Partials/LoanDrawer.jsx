// Importaciones necesarias para el componente
import { HiOutlinePencilAlt, HiOutlinePlus } from "react-icons/hi";
import InputError from "@/Components/Default/InputError";
import { useForm } from "@inertiajs/react";
import { Button, Drawer } from "flowbite-react";
import React, { useEffect } from "react";
import CustomDatepicker from "@/Components/CustomDatepicker";

// Componente Drawer para agregar o editar préstamos
export default function LoanDrawer({
    isOpen,
    onClose,
    loan = null,
    employees,
}) {
    const isEditing = loan !== null; // Determina si se está editando un préstamo

    // useForm de Inertia.js para manejar el formulario
    const { data, setData, post, put, processing, errors, reset } = useForm({
        date: "",
        employee_id: "",
        amount: "",
        installments: "",
        installment_value: "",
        pending_amount: "",
    });

    // Efecto para cargar los datos del préstamo en el formulario si se está editando
    useEffect(() => {
        if (loan && isEditing) {
            setData({
                date: loan.date || "",
                employee_id: loan.employee.id || "",
                amount: loan.amount || "",
                installments: loan.installments || "",
                installment_value: loan.installment_value || "",
                pending_amount: loan.pending_amount || "",
            });
        }
    }, [loan]);

    // Efecto para calcular el valor de la cuota y el monto pendiente por pagar
    useEffect(() => {
        if (data.amount && data.installments) {
            const value = parseFloat(data.amount) / parseInt(data.installments);
            setData({
                ...data,
                installment_value: value,
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
            ? route("loans.update", loan.id)
            : route("loans.store");

        method(routeName, {
            onSuccess: () => {
                reset();
                onClose();
            },
            onError: (error) => {
                console.error("Error handling employee: ", error);
            },
        });
    };

    // Renderiza el Drawer con el formulario para agregar o editar préstamos
    return (
        <Drawer open={isOpen} onClose={onClose} position="right">
            <Drawer.Header
                title={isEditing ? "Editar préstamo" : "Agregar préstamo"}
                titleIcon={isEditing ? HiOutlinePencilAlt : HiOutlinePlus}
            />
            <Drawer.Items>
                <form onSubmit={handleSubmit}>
                    {/* Formulario y campos para el préstamo */}
                    <div className="space-y-2">
                        {/* Fecha de préstamo */}
                        <div>
                            <label htmlFor="date" className="label">
                                Fecha de préstamo
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
                                <option value="" disabled>
                                    Selecciona un empleado
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

                        {/* Monto */}
                        <div>
                            <label htmlFor="amount" className="label">
                                Monto de préstamo
                            </label>
                            <input
                                type="number"
                                id="amount"
                                value={data.amount}
                                onChange={(e) =>
                                    setData("amount", e.target.value)
                                }
                                className="input"
                            />
                            <InputError message={errors.amount} />
                        </div>

                        {/* Número de cuotas */}
                        <div>
                            <label htmlFor="installments" className="label">
                                Cuotas
                            </label>
                            <input
                                type="number"
                                id="installments"
                                value={data.installments}
                                onChange={(e) =>
                                    setData("installments", e.target.value)
                                }
                                className="input"
                            />
                            <InputError message={errors.installments} />
                        </div>
                        
                        {/* Valor de la cuota */}
                        <div>
                            <label htmlFor="installment_value" className="label">
                                Valor de la cuota
                            </label>
                            <input
                                type="number"
                                id="installment_value"
                                value={data.installment_value}
                                onChange={(e) =>
                                    setData("installment_value", e.target.value)
                                }
                                disabled
                                className="input"
                            />
                            <InputError message={errors.installment_value}/>
                        </div>

                        {/* Monto pendiente */}
                        <div>
                            <label htmlFor="pending_amount" className="label">
                                Monto pendiente por pagar
                            </label>
                            <input
                                type="number"
                                id="pending_amount"
                                value={data.pending_amount}
                                onChange={(e) =>
                                    setData("pending_amount", e.target.value)
                                }
                                disabled
                                className="input"
                            />
                            <InputError message={errors.pending_amount}/>
                        </div>
                    </div>

                    {/* Botón para agregar o editar préstamo */}
                    <Button
                        type="submit"
                        disabled={processing}
                        color="blue"
                        className="mt-4 w-full text-base font-medium"
                    >
                        {isEditing ? "Editar préstamo" : "Agregar préstamo"}
                    </Button>
                </form>
            </Drawer.Items>
        </Drawer>
    );
}
