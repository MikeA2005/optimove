// Importaciones necesarias para el componente
import { HiOutlinePencilAlt, HiOutlinePlus } from "react-icons/hi";
import InputError from "@/Components/Default/InputError";
import { useForm } from "@inertiajs/react";
import { Button, Drawer, Datepicker } from "flowbite-react";
import React, { useEffect, useState } from "react";
import CustomDatepicker from "@/Components/CustomDatepicker";

// Componente AttendanceDrawer para gestionar la asistencia de empleados
function AttendanceDrawer({
    isOpen, // Indica si el Drawer está abierto
    onClose, // Función para manejar el cierre del Drawer
    attendance = null, // Datos de la asistencia, null si no se está editando
    employees, // Lista de empleados para seleccionar
    clients, // Lista de clientes para seleccionar
    shiftTypes, // Lista de tipos de turno para seleccionar
}) {
    const isEditing = attendance !== null; // Determina si se está editando una asistencia existente
    const [selectedClient, setSelectedClient] = useState(null); // Estado para el cliente seleccionado
    const [selectedDate, setSelectedDate] = useState(new Date()); // Estado para la fecha seleccionada
    
    // useForm de Inertia.js para manejar el formulario
    const { data, setData, errors, post, put, processing, reset } = useForm({
        date: "",
        employee_id: "",
        client_id: "",
        city_id: "",
    });

    // Efecto para cargar los datos de la asistencia en el formulario si se está editando
    useEffect(() => {
        if (attendance && isEditing) {
            setData({
                date: attendance.date || "",
                employee_id: attendance.employee.id || "",
                client_id: attendance.client.id || "",
                city_id: attendance.city.id || "",
            });

            setSelectedClient(
                clients.data.find((c) => c.id === attendance.client.id)
            );
        }
    }, [attendance, clients]);

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        const method = isEditing ? put : post;
        const routeName = isEditing
            ? route("attendances.update", attendance.id)
            : route("attendances.store");

        method(routeName, {
            onSuccess: () => {
                onClose();
                reset();
            },
            onError: (error) => {
                console.error("Error handling attendance: ", error);
            },
        });
    };

    // Maneja el cambio del cliente seleccionado, para cargar las ciudades asociadas
    const handleClientChange = (e) => {
        const client = clients.data.find(
            (c) => c.id === parseInt(e.target.value, 10)
        );
        setSelectedClient(client);
        setData({
            ...data,
            city_id: "",
            client_id: e.target.value,
        });
    };

    // Renderiza el Drawer con el formulario de asistencia
    return (
        <Drawer open={isOpen} onClose={onClose} position="right">
            <Drawer.Header
                title={isEditing ? "Editar asistencia" : "Agregar asistencia"}
                titleIcon={isEditing ? HiOutlinePencilAlt : HiOutlinePlus}
            />
            <Drawer.Items>
                <form onSubmit={handleSubmit}>
                    {/* Formulario y campos para la asistencia  */}
                    <div className="space-y-2">
                        {/* Fecha de la asistencia */}
                        <div>
                            <label htmlFor="date" className="label">
                                Fecha
                            </label>
                            <CustomDatepicker
                                value={data.date}
                                onChange={(date) => setData("date", date)}
                                disabled={isEditing}
                                id="date"
                            />
                            <InputError message={errors.date} />
                        </div>

                        {/* Empleado de la asistencia */}
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
                                    Selecciona el usuario...
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

                        {/* Operación de la asistencia */}
                        <div>
                            <label htmlFor="client_id" className="label">
                                Operación
                            </label>
                            <select
                                id="client_id"
                                value={data.client_id}
                                onChange={handleClientChange}
                                className="input"
                            >
                                <option value="" disabled>
                                    Selecciona el cliente...
                                </option>
                                {clients.data.map((client) => (
                                    <option key={client.id} value={client.id}>
                                        {client.company_name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.client_id} />
                        </div>

                        {/* Ciudad de la operación */}
                        <div>
                            <label htmlFor="city_id" className="label">
                                Ciudad de la Operación
                            </label>
                            <select
                                id="city_id"
                                value={data.city_id}
                                onChange={(e) =>
                                    setData("city_id", e.target.value)
                                }
                                disabled={!selectedClient}
                                className="input"
                            >
                                <option value="" disabled>
                                    Selecciona la ciudad...
                                </option>
                                {selectedClient?.cities.map((city) => (
                                    <option key={city.id} value={city.id}>
                                        {city.city_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Botón para guardar o actualizar la asistencia */}
                    <Button
                        type="submit"
                        disabled={processing}
                        color="blue"
                        className="mt-4 w-full text-base font-medium"
                    >
                        {isEditing
                            ? "Actualizar asistencia"
                            : "Guardar asistencia"}
                    </Button>
                </form>
            </Drawer.Items>
        </Drawer>
    );
}

export default AttendanceDrawer;
