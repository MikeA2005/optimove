// Importaciones necesarias para el componente
import { HiOutlinePencilAlt, HiOutlinePlus } from "react-icons/hi";
import InputError from "@/Components/Default/InputError";
import { useForm } from "@inertiajs/react";
import { Button, Drawer } from "flowbite-react";
import React, { useEffect } from "react";
import CustomDatepicker from "@/Components/CustomDatepicker";

// Componente EmployeeDrawer para gestionar los empleados
export default function EmployeeDrawer({
    isOpen,
    onClose,
    employee = null,
    users,
}) {
    const isEditing = employee !== null; // Determina si está editando un empleado existente

    // useForm de Inertia.js para manejar el formulario
    const { data, setData, post, put, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        document_type: "",
        document_number: "",
        birth_date: "",
        hire_date: "",
        base_salary: "",
        contract_type: "",
        user_id: "",
    });

    // Efecto para cargar los datos del empleado en el formulario si se está editando
    useEffect(() => {
        if (employee && isEditing) {
            setData({
                first_name: employee.first_name || "",
                last_name: employee.last_name || "",
                document_type: employee.document_type || "",
                document_number: employee.document_number || "",
                birth_date: employee.birth_date || "",
                hire_date: employee.hire_date || "",
                base_salary: employee.base_salary || "",
                contract_type: employee.contract_type || "",
                user_id: employee.user?.id || "",
            });
        }
    }, [employee]);

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        const method = isEditing ? put : post;
        const routeName = isEditing
            ? route("employees.update", employee.id)
            : route("employees.store");

        method(routeName, {
            onSuccess: () => {
                onClose();
                reset();
            },
            onError: (error) => {
                console.log("Error handling employee: ", error);
            },
        });
    };

    // Renderiza el Drawer con el formulario de empleado
    return (
        <Drawer open={isOpen} onClose={onClose} position="right">
            <Drawer.Header
                title={isEditing ? "Editar empleado" : "Agregar empleado"}
                titleIcon={isEditing ? HiOutlinePencilAlt : HiOutlinePlus}
            />
            <Drawer.Items>
                <form onSubmit={handleSubmit}>
                    {/* Formulario y campos para el empleado */}
                    <div className="space-y-2">
                        {/* Nombres del Empleado */}
                        <div>
                            <label htmlFor="first_name" className="label">
                                Nombres
                            </label>
                            <input
                                type="text"
                                id="first_name"
                                value={data.first_name}
                                onChange={(e) =>
                                    setData("first_name", e.target.value)
                                }
                                className="input"
                                autoComplete="given-name"
                            />
                            <InputError message={errors.first_name} />
                        </div>

                        {/* Apellidos del Empleado */}
                        <div>
                            <label htmlFor="last_name" className="label">
                                Apellidos
                            </label>
                            <input
                                type="text"
                                id="last_name"
                                value={data.last_name}
                                onChange={(e) =>
                                    setData("last_name", e.target.value)
                                }
                                className="input"
                                autoComplete="family-name"
                            />
                            <InputError message={errors.last_name} />
                        </div>

                        {/* Tipo de Documento */}
                        <div>
                            <label htmlFor="document_type" className="label">
                                Tipo de Documento
                            </label>
                            <select
                                id="document_type"
                                value={data.document_type}
                                onChange={(e) =>
                                    setData("document_type", e.target.value)
                                }
                                className="input"
                            >
                                <option value="" disabled>
                                    Selecciona el tipo de documento...
                                </option>
                                <option value="CC">Cédula de Ciudadanía</option>
                                <option value="CE">
                                    Cédula de Extranjería
                                </option>
                                <option value="PA">Pasaporte</option>
                            </select>
                            <InputError message={errors.document_type} />
                        </div>

                        {/* Número de Documento */}
                        <div>
                            <label htmlFor="document_number" className="label">
                                Número de Documento
                            </label>
                            <input
                                type="number"
                                id="document_number"
                                value={data.document_number}
                                onChange={(e) =>
                                    setData("document_number", e.target.value)
                                }
                                className="input"
                                autoComplete="document-number"
                            />
                            <InputError message={errors.document_number} />
                        </div>

                        {/* Fecha de Nacimiento */}
                        <div>
                            <label htmlFor="birth_date" className="label">
                                Fecha de Nacimiento
                            </label>
                            <CustomDatepicker
                                id="birth_date"
                                value={data.birth_date}
                                onChange={(birth_date) =>
                                    setData("birth_date", birth_date)
                                }
                            />
                            <InputError message={errors.birth_date} />
                        </div>

                        {/* Fecha de Contratación */}
                        <div>
                            <label htmlFor="hire_date" className="label">
                                Fecha de Contratación
                            </label>
                            <CustomDatepicker
                                id="hire_date"
                                value={data.hire_date}
                                onChange={(hire_date) =>
                                    setData("hire_date", hire_date)
                                }
                            />
                            <InputError message={errors.hire_date} />
                        </div>

                        {/* Salario Base */}
                        <div>
                            <label htmlFor="base_salary" className="label">
                                Salario Base
                            </label>
                            <input
                                type="number"
                                id="base_salary"
                                value={data.base_salary}
                                onChange={(e) =>
                                    setData("base_salary", e.target.value)
                                }
                                className="input"
                            />
                            <InputError message={errors.base_salary} />
                        </div>

                        {/* Tipo de Contrato */}
                        <div>
                            <label htmlFor="contract_type" className="label">
                                Tipo de Contrato
                            </label>
                            <select
                                id="contract_type"
                                value={data.contract_type}
                                onChange={(e) =>
                                    setData("contract_type", e.target.value)
                                }
                                className="input"
                            >
                                <option value="" disabled>
                                    Selecciona el tipo de contrato...
                                </option>
                                <option value="TIN">Termino Indefinido</option>
                                <option value="TFI">Termino Fijo</option>
                                <option value="PS">Prestación de Servicios</option>
                                <option value="OBL">Obra Labor</option>
                            </select>
                            <InputError message={errors.contract_type} />
                        </div>

                        {/* Usuario Asociado */}
                        <div>
                            <label htmlFor="user_id" className="label">
                                Usuario Asociado
                            </label>
                            <select
                                id="user_id"
                                value={data.user_id}
                                onChange={(e) =>
                                    setData("user_id", e.target.value)
                                }
                                className="input"
                            >
                                <option value="" disabled>
                                    Selecciona el usuario asociado...
                                </option>
                                {users.data.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.user_id} />
                        </div>
                    </div>

                    {/* Botón para guardar o actualizar el empleado */}
                    <Button
                        type="submit"
                        disabled={processing}
                        color="blue"
                        className="mt-4 w-full text-base font-medium"
                    >
                        {isEditing ? "Actualizar empleado" : "Agregar empleado"}
                    </Button>
                </form>
            </Drawer.Items>
        </Drawer>
    );
}
