// Importaciones necesarias para el componente
import { HiOutlinePencilAlt, HiOutlinePlus } from "react-icons/hi";
import InputError from "@/Components/Default/InputError";
import { useForm } from "@inertiajs/react";
import { Button, Drawer } from "flowbite-react";
import React, { useEffect } from "react";

// Componente Drawer para la creación y edición de detalles de nómina
export default function PayrollDetailDrawer({
    isOpen, 
    onClose, 
    PayrollDetail = null,
    payrollHeader,
    employees,
}) {
    const isEditing = PayrollDetail !== null; // Verifica si se está editando

    // useForm para manejar el formulario
    const { data, setData, post, put, processing, errors, reset } = useForm({
        employee_id: "",
        others_earnings: "",
        responsabilities: "",
        funeral_plan: "",
        others_deductions: "",
        payroll_header_id: payrollHeader ? payrollHeader.id : null,
    });

    // useEffect para establecer los datos iniciales
    useEffect(() => {
        if (PayrollDetail && isEditing) {
            setData({
                employee_id: PayrollDetail.employee.id || "",
                others_earnings: PayrollDetail.others_earnings || "",
                responsabilities: PayrollDetail.responsabilities || "",
                funeral_plan: PayrollDetail.funeral_plan || "",
                others_deductions: PayrollDetail.others_deductions || "",
                payroll_header_id: PayrollDetail.payroll_header_id || "",
            });
        }
    }, [PayrollDetail]);

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        const method = isEditing ? put : post;
        const routeName = isEditing
            ? route("payroll-details.update", PayrollDetail.id)
            : route("payroll-details.store");

        method(routeName, {
            onSuccess: () => {
                onClose();
                reset();
            },
            onError: (error) => {
                console.log("Error handling payroll detail: ", error);
            },
            data,
        });
    };

    // Renderiza el Drawer con el formulario de detalle de nómina
    return (
        <Drawer open={isOpen} onClose={onClose} position="right">
            <Drawer.Header
                title={
                    isEditing
                        ? "Editar Detalle de Nómina"
                        : "Agregar Detalle de Nómina"
                }
                titleIcon={isEditing ? HiOutlinePencilAlt : HiOutlinePlus}
            />
            <Drawer.Items>
                <form onSubmit={handleSubmit}>
                    {/* Formulario y campos para la nómina */}
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
                                    Seleccionar empleado...
                                </option>
                                {employees.data.map((employee) => (
                                    <option
                                        key={employee.id}
                                        value={employee.id}
                                    >
                                        {employee.last_name}{" "}
                                        {employee.first_name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.employee_id} />
                        </div>

                        {/* Otros Devengados */}
                        <div>
                            <label htmlFor="others_earnings" className="label">
                                Otros Devengados
                            </label>
                            <input
                                id="others_earnings"
                                type="number"
                                value={data.others_earnings}
                                onChange={(e) =>
                                    setData("others_earnings", e.target.value)
                                }
                                className="input"
                            />
                            <InputError message={errors.others_earnings} />
                        </div>

                        {/* Responsabilidades  */}
                        <div>
                            <label htmlFor="responsabilities" className="label">
                                Responsabilidades
                            </label>
                            <input
                                id="responsabilities"
                                type="number"
                                value={data.responsabilities}
                                onChange={(e) =>
                                    setData("responsabilities", e.target.value)
                                }
                                className="input"
                            />
                            <InputError message={errors.responsabilities} />
                        </div>

                        {/* Plan Exequial  */}
                        <div>
                            <label htmlFor="funeral_plan" className="label">
                                Plan Exequial
                            </label>
                            <input
                                id="funeral_plan"
                                type="number"
                                value={data.funeral_plan}
                                onChange={(e) =>
                                    setData("funeral_plan", e.target.value)
                                }
                                className="input"
                            />
                            <InputError message={errors.funeral_plan} />
                        </div>

                        {/* Otras Deducciones */}
                        <div>
                            <label
                                htmlFor="others_deductions"
                                className="label"
                            >
                                Otras Deducciones
                            </label>
                            <input
                                id="others_deductions"
                                type="number"
                                value={data.others_deductions}
                                onChange={(e) =>
                                    setData("others_deductions", e.target.value)
                                }
                                className="input"
                            />
                            <InputError message={errors.others_deductions} />
                        </div>
                    </div>

                    {/* Botón para agregar o editar nómina */}
                    <Button
                        type="submit"
                        disabled={processing}
                        color="blue"
                        className="mt-4 w-full text-base font-medium"
                    >
                        {isEditing
                            ? "Editar Detalle de Nómina"
                            : "Agregar Detalle de Nómina"}
                    </Button>
                </form>
            </Drawer.Items>
        </Drawer>
    );
};