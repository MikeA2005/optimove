// Importaciones necesarias para el componente
import { HiOutlinePencilAlt, HiOutlinePlus } from "react-icons/hi";
import InputError from "@/Components/Default/InputError";
import { useForm } from "@inertiajs/react";
import { Button, Drawer } from "flowbite-react";
import React, { useEffect } from "react";
import CustomDatepicker from "@/Components/CustomDatepicker";

// Componente Drawer para agregar o editar encabezados de nómina
export default function PayrollHeaderDrawer({
    isOpen,
    onClose,
    payrollHeader = null,
}) {
    const isEditing = payrollHeader !== null; // Determina si se está editando encabezados de nómina

    // useForm de Inertia.js para manejar el formulario
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: "",
        start_date: "",
        end_date: "",
    });

    // Efecto para cargar los datos de los encabezados de nómina en el formulario si se está editando
    useEffect(() => {
        if (payrollHeader && isEditing) {
            setData({
                name: payrollHeader.name || "",
                start_date: payrollHeader.start_date || "",
                end_date: payrollHeader.end_date || "",
            });
        }
    }, [payrollHeader]);

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        const method = isEditing ? put : post;
        const routeName = isEditing
            ? route("payroll-headers.update", payrollHeader.id)
            : route("payroll-headers.store");

        method(routeName, {
            onSuccess: () => {
                onClose();
                reset();
            },
            onError: (error) => {
                console.log("Error handling payroll headers", error);
            },
        });
    };

    // Renderiza el drawer de encabezados de nómina
    return (
        <Drawer open={isOpen} onClose={onClose} position="right">
            <Drawer.Header
                title={
                    isEditing
                        ? "Editar encabezado de nómina"
                        : "Agregar encabezado de nómina"
                }
                titleIcon={isEditing ? HiOutlinePencilAlt : HiOutlinePlus}
            />

            <Drawer.Items>
                <form onSubmit={handleSubmit}>
                    {/* Formulario y campos para el encabezado de nómina */}
                    <div className="space-y-2">
                        {/* Nombre de la nómina */}
                        <div>
                            <label htmlFor="name" className="label">
                                Nombre de la nómina
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className="input"
                                autoComplete="off"
                            />
                            <InputError message={errors.name} />
                        </div>

                        {/* Fecha de Inicio */}
                        <div>
                            <label htmlFor="start_date" className="label">
                                Fecha de inicio
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
                                Fecha de fin
                            </label>
                            <CustomDatepicker
                                id="end_date"
                                value={data.end_date}
                                onChange={(date) => setData("end_date", date)}
                            />
                            <InputError message={errors.end_date} />
                        </div>

                        {/* Botón para agregar o editar encabezado de nómina */}
                        <Button
                            type="submit"
                            disabled={processing}
                            color="blue"
                            className="mt-4 w-full text-base font-medium"
                        >
                            {isEditing
                                ? "Editar encabezado de nómina"
                                : "Agregar encabezado de nómina"}
                        </Button>
                    </div>
                </form>
            </Drawer.Items>
        </Drawer>
    );
}
