// Importaciones necesarias para el componente
import { HiOutlinePencilAlt, HiOutlinePlus } from "react-icons/hi";
import InputError from "@/Components/Default/InputError";
import { useForm } from "@inertiajs/react";
import { Button, Drawer } from "flowbite-react";
import React, { useEffect } from "react";

// Componente Drawer para agregar o editar detalles de nómina
function PayrollDetailDrawer({
    isOpen,
    onClose,
    payrollDetail = null,
    employees,
}) {
    const isEditing = payrollDetail !== null; // Determina si se está editando un detalle de nómina
    
    // useForm de Inertia.js para manejar el formulario
    const { data, setData, post, put, processing, errors, reset } = useForm({
        employee_id: "",
        other_earnings: "",
        other_deductions: "",
    });

    // Efecto para cargar los datos del detalle de nómina en el formulario si se está editando
    useEffect(() => {
        if (payrollDetail && isEditing) {
            setData({
                employee_id: payrollDetail.employee.id || "",
                other_earnings: payrollDetail.other_earnings || "",
                other_deductions: payrollDetail.other_deductions || "",
            });
        }
    }, [payrollDetail]);

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        const method = isEditing ? put : post;
        const routeName = isEditing
            ? route("payroll-details.update", payrollDetail.id)
            : route("payroll-details.store");

        method(routeName, {
            onSuccess: () => {
                reset();
                onClose();
            },
            onError: (error) => {
                console.log("Error handling payroll detail", error);
            }
        });
    };
    
    // Renderiza el Drawer con el formulario para agregar o editar detalles de nómina
    return (
        <Drawer open={isOpen} onClose={onClose} position="right">
            <Drawer.Header
                title={isEditing ? "Editar Detalle de Nómina" : "Agregar Detalle de Nómina"}
                titleIcon={isEditing ? HiOutlinePencilAlt : HiOutlinePlus}
            />
            <Drawer.Items>
                <form onSubmit={handleSubmit}>
                    {/* Formulario y campos del detalle de nómina */}
                    <div className="space-y-2">
                        {/* Empleado */}
                        <div>
                            <label htmlFor="employee_id" className="label">
                                Empleado
                            </label>
                            <select
                                id="employee_id"
                                value={data.employee_id}
                                onChange={(e) => setData("employee_id", e.target.value)}
                                className="input"
                            >
                                <option value="">Selecciona un empleado</option>
                                {employees.data.map((employee) => (
                                    <option key={employee.id} value={employee.id}>
                                        { employee.last_name + " " + employee.first_name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.employee_id} />
                        </div>

                        {/* Otros devengados */}
                        <div>
                            <label htmlFor="other_earnings" className="label">
                                Otros Devengados
                            </label>
                            <input
                                id="other_earnings"
                                type="number"
                                value={data.other_earnings}
                                onChange={(e) => setData("other_earnings", e.target.value)}
                                className="input"
                            />
                            <InputError message={errors.other_earnings} />
                        </div>

                        {/* Otros deducidos */}
                        <div>
                            <label htmlFor="other_deductions" className="label">
                                Otros Deducidos
                            </label>
                            <input
                                id="other_deductions"
                                type="number"
                                value={data.other_deductions}
                                onChange={(e) => setData("other_deductions", e.target.value)}
                                className="input"
                            />
                            <InputError message={errors.other_deductions} />
                        </div>
                    </div>

                    {/* Botón para enviar el formulario */}
                    <Button
                        type="submit"
                        disabled={processing}
                        color="blue"
                        className="mt-4"
                    >
                        {isEditing ? "Editar detalle de nómina" : "Agregar detalle de nómina"}
                    </Button>
                </form>
            </Drawer.Items>
        </Drawer>
    );
}

export default PayrollDetailDrawer;
