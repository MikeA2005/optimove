// Importaciones necesarias para el componente
import { HiOutlinePencilAlt, HiOutlinePlus } from "react-icons/hi";
import InputError from "@/Components/Default/InputError";
import { useForm } from "@inertiajs/react";
import { Button, Drawer } from "flowbite-react";
import React, { useEffect } from "react";

// Componente UserDrawe para gestionar usuarios
export default function UserDrawer({ isOpen, onClose, user = null }) {
    const isEditing = user !== null; // Indica si se está editando

    // useForm de Inertia para manejar el formulario
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
    });

    // useEffect para establecer los datos del usuario
    useEffect(() => {
        if (user && isEditing) {
            setData({
                name: user.name,
                email: user.email,
            });
        }
    }, [user]);

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        const method = isEditing ? put : post;
        const routeName = isEditing
            ? route("users.update", user.id)
            : route("users.store");

        method(routeName, {
            onSuccess: () => {
                onClose();
                reset();
            },
            onError: (error) => {
                console.log("Error handling user: ", error);
            },
        });
    };

    // Renderiza el Drawer con el formulario de usuario
    return (
        <Drawer open={isOpen} onClose={onClose} position="right">
            <Drawer.Header
                title={isEditing ? "Editar Usuario" : "Añadir Usuario"}
                titleIcon={isEditing ? HiOutlinePencilAlt : HiOutlinePlus}
            />
            <Drawer.Items>
                <form onSubmit={handleSubmit}>
                    {/* Formulario y campos para el usuario */}
                    <div className="space-y-2">
                        <div>
                            <label htmlFor="name" className="label">
                                Nombre de Usuario
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="input"
                                autoComplete="given-name"
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div>
                            <label htmlFor="email" className="label">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="input"
                                autoComplete="email"
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div>
                            <label htmlFor="password" className="label">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="input"
                                autoComplete="new-password"
                            />
                            <InputError message={errors.password} />
                        </div>

                        {/* Botón para guardar o actualizar el usuario */}
                        <Button
                            type="submit"
                            disabled={processing}
                            color="blue"
                            className="mt-4 w-full text-base font-medium"
                        >
                            {isEditing
                                ? "Actualizar usuario"
                                : "Agregar usuario"}
                        </Button>
                    </div>
                </form>
            </Drawer.Items>
        </Drawer>
    );
}
