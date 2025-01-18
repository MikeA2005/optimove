// Importaciones necesarias para el componente
import { HiOutlinePencilAlt, HiOutlinePlus } from "react-icons/hi";
import InputError from "@/Components/Default/InputError";
import { useForm } from "@inertiajs/react";
import { Button, Drawer } from "flowbite-react";
import React, { useEffect } from "react";
import CustomDatepicker from "@/Components/CustomDatepicker";

// Componente Drawer para la creación y edición de cabeceras de nómina
export default function PayrollHeaderDrawer({
    isOpen,
    onClose,
    PayrollHeader = null,
}) {
    const isEditing = PayrollHeader !== null; // Verifica si se está editando

    // useForm para manejar el formulario
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: "",
        start_date: "",
        end_date: "",
        settlement_base: "0",
        payroll_type: "",
    });

    // useEffect para establecer los datos iniciales
    useEffect(() => {
        if (PayrollHeader && isEditing) {
            setData({
                name: PayrollHeader.name || "",
                start_date: PayrollHeader.start_date || "",
                end_date: PayrollHeader.end_date || "",
                settlement_base: PayrollHeader.settlement_base || "",
                payroll_type: PayrollHeader.payroll_type || "",
            });
        }
    }, [PayrollHeader]);

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        const method = isEditing ? put : post;
        const routeName = isEditing
            ? route("payroll-headers.update", PayrollHeader.id)
            : route("payroll-headers.store");

        method(routeName, {
            onSuccess: () => {
                onClose();
                reset();
            },
            onError: (error) => {
                console.log("Error handling payroll header: ", error);
            },
            data,
        });
    };

    // Renderiza el Drawer con el formulario de cabecera de nómina
    return (
        <Drawer open={isOpen} onClose={onClose} position="right">
            <Drawer.Header
                title={
                    isEditing
                        ? "Editar Cabecera de Nómina"
                        : "Agregar Cabecera de Nómina"
                }
                titleIcon={isEditing ? HiOutlinePencilAlt : HiOutlinePlus}
            />
            <Drawer.Items>
                <form onSubmit={handleSubmit}>
                    {/* Formulario y campos de cabecera de nómina */}
                    <div className="space-y-2">
                        {/* Nombre de la cabecera de nómina */}
                        <div>
                            <label htmlFor="name" className="label">
                                Nombre
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="input"
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div>
                            <label htmlFor="start_date" className="label">
                                Fecha de Inicio
                            </label>
                            <CustomDatepicker
                                id="start_date"
                                name="start_date"
                                value={data.start_date}
                                onChange={(date) => setData("start_date", date)}
                            />
                            <InputError message={errors.start_date} />
                        </div>
                        <div>
                            <label htmlFor="end_date" className="label">
                                Fecha de Fin
                            </label>
                            <CustomDatepicker
                                id="end_date"
                                name="end_date"
                                value={data.end_date}
                                onChange={(date) => setData("end_date", date)}
                            />
                            <InputError message={errors.end_date} />
                        </div>
                        <div>
                            <label htmlFor="payroll_type" className="label">
                                Tipo de Nómina
                            </label>
                            <select
                                id="payroll_type"
                                value={data.payroll_type}
                                onChange={(e) =>
                                    setData("payroll_type", e.target.value)
                                }
                                className="input"
                            >
                                <option value="" disabled>
                                    Selecciona el tipo de nómina...
                                </option>
                                <option value="DEP">Dependiente</option>
                                <option value="IND">Independiente</option>
                                <option value="OBL">Obra Labor</option>
                            </select>
                            <InputError message={errors.payroll_type} />
                        </div>
                    </div>


                    <Button
                        type="submit"
                        disabled={processing}
                        color="blue"
                        className="mt-4 w-full text-base font-medium"
                    >
                        {isEditing ? "Editar cabecera" : "Agregar cabecera"}
                    </Button>
                </form>
            </Drawer.Items>
        </Drawer>
    );
}
