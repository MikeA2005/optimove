// Importaciones necesarias para el componente y sus dependencias
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { HiHome } from "react-icons/hi";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PageHeader from "@/Components/PageHeader";
import GenericTable from "@/Components/GenericTable";
import Pagination from "@/Components/Pagination";
import AttendanceDrawer from "./Partials/AttendanceDrawer";
import DeleteModal from "@/Components/DeleteModal";
import dayjs from "dayjs";

// Componente Index para la página de asistencias
export default function Index({ auth }) {
    // Estado y propiedades iniciales
    const { attendances, employees, clients, shiftTypes } = usePage().props; // Datos de asistencias, empleados y clientes
    const [isAddOpen, setIsAddOpen] = useState(false); // Controla la visibilidad del drawer de añadir
    const [isEditOpen, setIsEditOpen] = useState(false); // Controla la visibilidad del drawer de editar
    const [isDeleteOpen, setIsDeleteOpen] = useState(false); // Controla la visibilidad del modal de eliminar
    const [selectedAttendance, setSelectedAttendance] = useState(null); // Asistencia seleccionada para editar o eliminar
    const formatter = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 2,
    }); // Formateador de moneda

    // Funciones para manejar eventos
    const handleEdit = (attendance) => {
        setSelectedAttendance(attendance); // Establece la asistencia seleccionada
        setIsEditOpen(true); // Abre el drawer de editar
    };

    const handleDelete = (attendance) => {
        setSelectedAttendance(attendance); // Establece la asistencia seleccionada
        setIsDeleteOpen(true); // Abre el modal de eliminar
    };

    // Configuración de las columnas para la tabla de asistencias
    const columns = [
        // Renderiza la fecha en formato dd-mm-yy
        {
            key: "date",
            label: "Fecha",
            render: (attendance) =>
                dayjs(attendance.date, "YYYY-MM-DD").format("DD MMMM YYYY"),
        },
        // Columna de empleado mostrando nombre completo
        {
            key: "employee_id",
            label: "Empleado",
            render: (attendance) =>
                `${attendance.employee.first_name} ${attendance.employee.last_name}`,
        },
        // Columna de cliente mostrando el nombre de la empresa
        {
            key: "client_id",
            label: "Cliente",
            render: (attendance) => attendance.client.company_name,
        },
        // Columna de ciudad
        {
            key: "city_id",
            label: "Ciudad",
            render: (attendance) => attendance.city.city_name,
        },
    ];

    // Función para manejar cambios en la búsqueda
    const handleSearchChange = (newSearchTerm) => {
        router.get(
            route("attendances.index"),
            { date: newSearchTerm },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    // Renderizado del componente
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Attendances" />

            <PageHeader
                title="Attendances"
                breadcrumbs={[
                    { label: "Inicio", url: route("dashboard"), icon: HiHome },
                    { label: "Attendances" },
                ]}
                searchPlaceholder="Buscar asistencias"
                onAddClick={() => setIsAddOpen(true)}
                addButtonText="Agregar asistencia"
                onSearch={handleSearchChange}
                initialSearchTerm=""
            />

            <GenericTable
                data={attendances.data}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <Pagination links={attendances.links} meta={attendances.meta} />

            {/* Drawer para añadir o editar asistencia */}
            <AttendanceDrawer
                isOpen={isAddOpen || isEditOpen}
                onClose={() => {
                    setIsAddOpen(false);
                    setIsEditOpen(false);
                }}
                attendance={isEditOpen ? selectedAttendance : null}
                clients={clients}
                employees={employees}
                shiftTypes={shiftTypes}
            />

            {/* Modal para eliminar asistencia */}
            <DeleteModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                data={selectedAttendance}
                routeName="attendances"
            />
        </AuthenticatedLayout>
    );
}
