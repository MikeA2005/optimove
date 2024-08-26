// Importaciones necesarias para el componente y sus dependencias
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { HiHome } from "react-icons/hi";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PageHeader from "@/Components/PageHeader";
import GenericTable from "@/Components/GenericTable";
import Pagination from "@/Components/Pagination";
import DisabilityDrawer from "./Partials/DisabilityDrawer";
import DeleteModal from "@/Components/DeleteModal";
import dayjs from "dayjs";

// Componente Index para la página de incapacidades
export default function Index({ auth }) {
    // Estado y propiedades iniciales
    const { disabilities, employees } = usePage().props; // Datos de incapacidades y empleados
    const [isAddOpen, setIsAddOpen] = useState(false); // Controla la visibilidad del drawer de añadir
    const [isEditOpen, setIsEditOpen] = useState(false); // Controla la visibilidad del drawer de editar
    const [isDeleteOpen, setIsDeleteOpen] = useState(false); // Controla la visibilidad del modal de eliminar
    const [selectedDisability, setSelectedDisability] = useState(null); // Incapacidad seleccionada para editar o eliminar
    const formatter = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 2 }); // Formateador de moneda

    // Función para manejar eventos
    const handleEdit = (disability) => {
        setSelectedDisability(disability); // Establece la incapacidad
        setIsEditOpen(true); // Abre el drawer de editar
    };

    const handleDelete = (disability) => {
        setSelectedDisability(disability); // Establece la incapacidad
        setIsDeleteOpen(true); // Abre el modal de eliminar
    };

    // Columnas para la tabla de incapacidades
    const columns = [
        // Renderiza el nombre completo del empleado
        {
            key: "employee",
            label: "Empleado",
            render: (disability) =>
                `${disability.employee.first_name} ${disability.employee.last_name}`,
        },
        // Renderiza la fecha de inicio de la incapacidad
        {
            key: "start_date",
            label: "Fecha de Inicio",
            render: (disability) =>
                dayjs(disability.start_date, "YYYY-MM-DD").format(
                    "DD MMMM YYYY"
                ),
        },
        // Renderiza la fecha de fin de la incapacidad
        {
            key: "end_date",
            label: "Fecha de Fin",
            render: (disability) =>
                dayjs(disability.end_date, "YYYY-MM-DD").format("DD MMMM YYYY"),
        },
        { key: "type", label: "Tipo de Incapacidad" },
        // Renderiza el valor diario de la incapacidad (decimal a pesos colombianos)
        {
            key: "daily_value",
            label: "Valor Diario",
            render: (disability) => formatter.format(disability.daily_value),
        },
    ];

    // Función para manejar el cambio en la búsqueda, realiza una petición para filtrar las incapacidades
    const handleSearchChange = (newSearchTerm) => {
        router.get(
            route("disabilities.index"),
            { employee_id: newSearchTerm },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    // Renderizado del componente
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Disabilities" />

            <PageHeader
                title="Disabilities"
                breadcrumbs={[
                    { label: "Inicio", url: route("dashboard"), icon: HiHome },
                    { label: "Disabilities" },
                ]}
                onAddClick={() => setIsAddOpen(true)}
                searchPlaceholder="Buscar Incapacidad"
                addButtonText="Agregar Incapacidad"
                onSearch={handleSearchChange}
                initialSearchTerm=""
            />

            <GenericTable
                data={disabilities.data}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <Pagination links={disabilities.links} meta={disabilities.meta} />

            {/* Drawer para agregar incapacidad */}
            <DisabilityDrawer
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                employees={employees}
            />

            {/* Drawer para editar incapacidad */}
            <DisabilityDrawer
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                disability={selectedDisability}
                employees={employees}
            />

            {/* Modal para eliminar incapacidad */}
            <DeleteModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                data={selectedDisability}
                routeName="disabilities"
            />
        </AuthenticatedLayout>
    );
}
