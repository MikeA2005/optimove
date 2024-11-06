// Importaciones necesarias para el componente
import { HiOutlinePencilAlt, HiOutlinePlus } from "react-icons/hi";
import InputError from "@/Components/Default/InputError";
import { useForm } from "@inertiajs/react";
import { Button, Drawer } from "flowbite-react";
import React, { useEffect } from "react";
import CustomDatepicker from "@/Components/CustomDatepicker";

// Componente Drawer para la creación y edición de nóminas
export default function PayrollDrawer({
    isOpen,
    onClose,
    payroll = null,
    employees,
}) {
    const isEditing = payroll !== null; // Verifica si se está editando

    // useForm para manejar el formulario
    const { data, setData, post, put, processing, errors, reset } = useForm({
        employee_id: "",
        start_date: "",
        end_date: "",
        others_earnings: "",
        responsabilities: "",
        funeral_plan: "",
        others_deductions: "",
    });

    // useEffect para establecer los datos iniciales
    useEffect(() => {
        if (payroll && isEditing) {
            setData({
                employee_id: payroll.employee.id || "",
                start_date: payroll.start_date || "",
                end_date: payroll.end_date || "",
                others_earnings: payroll.others_earnings || "",
                responsabilities: payroll.responsabilities || "",
                funeral_plan: payroll.funeral_plan || "",
                others_deductions: payroll.others_deductions || "",
            });
        }
    }, [payroll]);

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        const method = isEditing ? put : post;
        const routeName = isEditing
            ? route("payrolls.update", payroll.id)
            : route("payrolls.store");

        method(routeName, {
            onSuccess: () => {
                onClose();
                reset();
            },
            onError: (error) => {
                console.log("Error handling payroll: ", error);
            },
        });
    };

    // Renderiza el Drawer con el formulario de nómina
    return (
        <Drawer open={isOpen} onClose={onClose} position="right">
            <Drawer.Header
                title={isEditing ? "Editar Nómina" : "Agregar Nómina"}
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

                        {/* Fecha de Inicio */}
                        <div>
                            <label htmlFor="start_date" className="label">
                                Fecha de Inicio
                            </label>
                            <CustomDatepicker
                                id="start_date"
                                value={data.start_date}
                                onChange={(date) => setData("start_date", date)}
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
                                onChange={(date) => setData("end_date", date)}
                            />
                            <InputError message={errors.end_date} />
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
                            <label htmlFor="others_deductions" className="label">
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
                        {isEditing ? "Editar nómina" : "Agregar nómina"}
                    </Button>
                </form>
            </Drawer.Items>
        </Drawer>
    );
}
