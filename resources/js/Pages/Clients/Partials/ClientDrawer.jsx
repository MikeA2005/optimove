// Importaciones necesarias para el componente
import { HiOutlinePencilAlt, HiOutlinePlus } from "react-icons/hi";
import InputError from "@/Components/Default/InputError";
import { useForm } from "@inertiajs/react";
import { Button, Drawer } from "flowbite-react";
import React, { useEffect } from "react";

// Componente ClientDrawer para gestionar los clientes u operaciones
function ClientDrawer({ isOpen, onClose, client = null, cities }) {
    const isEditing = client !== null; // Determina si está editando un cliente existente

    // useForm de Inertia.js para manejar el formulario
    const { data, setData, errors, post, put, processing, reset } = useForm({
        company_name: "",
        nit: "",
        cities: [],
    });

    // Efecto para cargar los datos del cliente en el formulario si se está editando
    useEffect(() => {
        if (client && isEditing) {
            setData({
                company_name: client.company_name || "",
                nit: client.nit || "",
                cities: client.cities.map((city) => city.id) || [],
            });
        }
    }, [client]);

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        const method = isEditing ? put : post;
        const routeName = isEditing
            ? route("clients.update", client.id)
            : route("clients.store");

        method(routeName, {
            onSuccess: () => {
                onClose();
                reset();
            },
            onError: (error) => {
                console.log("Error handling client: ", error);
            },
        });
    };

    // Maneja el cambio de ciudades seleccionadas en el formulario
    const handleCityChange = (event) => {
        const selectedValues = Array.from(event.target.selectedOptions).map(
            (opt) => opt.value
        );
        setData("cities", selectedValues);
    };

    // Renderiza el Drawer con el formulario de cliente
    return (
        <Drawer open={isOpen} onClose={onClose} position="right">
            <Drawer.Header
                title={isEditing ? "Editar cliente" : "Agregar cliente"}
                titleIcon={isEditing ? HiOutlinePencilAlt : HiOutlinePlus}
            />
            <Drawer.Items>
                <form onSubmit={handleSubmit}>
                    {/* Formulario y campos para el cliente */}
                    <div className="space-y-2">
                        {/* Nombre de la Empresa */}
                        <div>
                            <label htmlFor="company_name" className="label">
                                Nombre de la Empresa
                            </label>
                            <input
                                type="text"
                                id="company_name"
                                value={data.company_name}
                                onChange={(e) =>
                                    setData("company_name", e.target.value)
                                }
                                className="input"
                            />
                            <InputError message={errors.company_name} />
                        </div>

                        {/* NIT de la Empresa */}
                        <div>
                            <label htmlFor="nit" className="label">
                                NIT de la Empresa
                            </label>
                            <input
                                type="text"
                                id="nit"
                                value={data.nit}
                                onChange={(e) => setData("nit", e.target.value)}
                                className="input"
                            />
                            <InputError message={errors.nit} />
                        </div>

                        {/* Ciudades */}
                        <div>
                            <label htmlFor="cities" className="label">
                                Ciudades
                            </label>
                            <select
                                id="cities"
                                value={data.cities}
                                onChange={handleCityChange}
                                multiple
                                className="input"
                            >
                                <option value="" disabled>
                                    Selecciona una o más ciudades...
                                </option>
                                {cities.map((city) => (
                                    <option key={city.id} value={city.id}>
                                        {city.city_name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.cities} />
                        </div>

                        {/* Botón para guardar o actualizar el cliente */}
                        <Button
                            type="submit"
                            disabled={processing}
                            color="blue"
                            className="mt-4 w-full text-base font-medium"
                        >
                            {isEditing
                                ? "Actualizar cliente"
                                : "Guardar cliente"}
                        </Button>
                    </div>
                </form>
            </Drawer.Items>
        </Drawer>
    );
}

export default ClientDrawer;
