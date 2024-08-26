// Importaciones necesarias para el componente
import { HiOutlinePencilAlt, HiOutlinePlus } from "react-icons/hi";
import InputError from "@/Components/Default/InputError";
import { useForm } from "@inertiajs/react";
import { Button, Drawer } from "flowbite-react";
import React, { useEffect } from "react";

// Componente CityDrawer para gestionar las ciudad de las operaciones
function CityDrawer({ isOpen, onClose, city = null }) {
    const isEditing = city !== null; // Determina si está editando una ciudad existente

    // useForm de Inertia.js para manejar el formulario
    const { data, setData, errors, post, put, processing, reset } = useForm({
        city_name: "",
    });

    // Efecto para cargar los datos de la asistencia en el formulario si se está editando
    useEffect(() => {
        if (city && isEditing) {
            setData({
                city_name: city.city_name || "",
            });
        }
    }, [city]);

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        const method = isEditing ? put : post;
        const routeName = isEditing
            ? route("cities.update", city.id)
            : route("cities.store");

        method(routeName, {
            onSuccess: () => {
                onClose();
                reset();
            },
            onError: (error) => {
                console.log("Error handling city: ", error);
            },
        });
    };

    // Renderiza el Drawer con el formulario de asistencia
    return (
        <Drawer open={isOpen} onClose={onClose} position="right">
            <Drawer.Header
                title={isEditing ? "Editar ciudad" : "Agregar ciudad"}
                titleIcon={isEditing ? HiOutlinePencilAlt : HiOutlinePlus}
            />
            <Drawer.Items>
                <form onSubmit={handleSubmit}>
                    {/* Formulario y campos para la ciudad  */}
                    <div className="space-y-2">
                        {/* Nombre de la Ciudad */}
                        <div>
                            <label htmlFor="city_name" className="label">
                                Nombre de la Ciudad
                            </label>
                            <input
                                type="text"
                                id="city_name"
                                value={data.city_name}
                                onChange={(e) =>
                                    setData("city_name", e.target.value)
                                }
                                className="input"
                            />
                            <InputError message={errors.city_name} />
                        </div>
                    </div>

                    {/* Botón para guardar o actualizar la ciudad */}
                    <Button
                        type="submit"
                        disabled={processing}
                        color="blue"
                        className="mt-4 w-full text-base font-medium"
                    >
                        {isEditing ? "Actualizar ciudad" : "Guardar ciudad"}
                    </Button>
                </form>
            </Drawer.Items>
        </Drawer>
    );
}

export default CityDrawer;
