// Importaciones necesarias para el componente y sus dependencias
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { HiHome } from "react-icons/hi";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PageHeader from "@/Components/PageHeader";
import GenericTable from "@/Components/GenericTable";
import Pagination from "@/Components/Pagination";
import OvertimeDrawer from "./Partials/OvertimeDrawer";
import DeleteModal from "@/Components/DeleteModal";
import dayjs from "dayjs";

// Componente Index para la página de horas extras
function Index({ auth }) {
    // Estado y propiedades iniciales
    const { overtimes, employees, overtimeTypes } = usePage().props; // Datos de horas extras, empleados y tipos de horas extras
    const [isAddOpen, setIsAddOpen] = useState(false); // Controla la visibilidad del drawer de añadir
    const [isEditOpen, setIsEditOpen] = useState(false); // Controla la visibilidad del drawer de editar
    const [isDeleteOpen, setIsDeleteOpen] = useState(false); // Controla la visibilidad del modal de eliminar
    const [selectedOvertime, setSelectedOvertime] = useState(null); // Hora extra seleccionada para editar o eliminar

    // Función para manejar eventos
    const handleEdit = (overtime) => {
        setSelectedOvertime(overtime); // Establece la hora extra
        setIsEditOpen(true); // Abre el drawer de editar
    };

    const handleDelete = (overtime) => {
        setSelectedOvertime(overtime); // Establece la hora extra
        setIsDeleteOpen(true); // Abre el modal de eliminar
    };

    // Columnas para la tabla de horas extras
    const columns = [
        // Renderiza la fecha en formato dd-mm-yy
        {
            key: "date",
            label: "Fecha",
            render: (overtime) => dayjs(overtime.date, "YYYY-MM-DD").format("DD MMMM YYYY")
        },
        // Renderiza el nombre completo del empleado
        {
            key: "employee",
            label: "Empleado",
            render: (overtime) =>
                overtime.employee.first_name +
                " " +
                overtime.employee.last_name,
        },
        // Renderiza el nombre del tipo de hora extra
        {
            key: "overtime_type",
            label: "Tipo de Hora Extra",
            render: (overtime) => overtime.overtime_type.type_name,
        },
        // Renderiza las horas en formato de texto
        {
            key: "hours",
            label: "Horas",
            render: (overtime) => overtime.hours + " horas",
        },
    ];

    // Función para manejar el cambio de búsqueda, realiza una petición para filtrar las horas extras
    const handleSearchChange = (newSearchTerm) => {
        router.get(
            route("overtimes.index"),
            { employee_id: newSearchTerm },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    // Renderiza la página de horas extras
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Horas Extras" />

            <PageHeader
                title="Todas las Horas Extras"
                breadcrumbs={[
                    { label: "Inicio", url: route("dashboard"), icon: HiHome },
                    { label: "Horas extras" },
                ]}
                onAddClick={() => setIsAddOpen(true)}
                searchPlaceholder="Buscar horas extras"
                addButtonText="Agregar horas extras"
                onSearch={handleSearchChange}
                initialSearchTerm=""
                exportUrl={route("overtimes.export")}
            />

            <GenericTable
                data={overtimes.data}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
                canEdit={auth.user.role === "rrhh" || auth.user.role === "admin"}
                canDelete={auth.user.role === "rrhh" || auth.user.role === "admin"}
            />

            <Pagination links={overtimes.links} meta={overtimes.meta} />

            {/* Drawer para agregar o editar horas extras */}
            <OvertimeDrawer
                isOpen={isAddOpen || isEditOpen}
                onClose={() => {
                    setIsAddOpen(false);
                    setIsEditOpen(false);
                }}
                overtime={isEditOpen ? selectedOvertime : null}
                employees={employees}
                overtimeTypes={overtimeTypes}
            />

            {/* Modal para eliminar horas extras */}
            <DeleteModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                data={selectedOvertime}
                routeName="overtimes"
            />
        </AuthenticatedLayout>
    );
}

export default Index;