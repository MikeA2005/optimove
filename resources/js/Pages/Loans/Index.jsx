// Importaciones necesarias para el componente y sus dependencias
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { HiHome } from "react-icons/hi";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PageHeader from "@/Components/PageHeader";
import GenericTable from "@/Components/GenericTable";
import Pagination from "@/Components/Pagination";
import LoanDrawer from "./Partials/LoanDrawer";
import DeleteModal from "@/Components/DeleteModal";
import dayjs from "dayjs";
import "dayjs/locale/es";

// Componente Index para la página de préstamos
function Index({ auth }) {
    // Estado y propiedades iniciales
    const { loans, employees } = usePage().props; // Datos de préstamos y empleados
    const [isAddOpen, setIsAddOpen] = useState(false); // Controla la visibilidad del drawer de añadir
    const [isEditOpen, setIsEditOpen] = useState(false); // Controla la visibilidad del drawer de editar
    const [isDeleteOpen, setIsDeleteOpen] = useState(false); // Controla la visibilidad del modal de eliminar
    const [selectedLoan, setSelectedLoan] = useState(null); // Préstamo seleccionado para editar o eliminar
    const formatter = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 2,
    }); // Formateador de moneda

    // Función para manejar eventos
    const handleEdit = (loan) => {
        setSelectedLoan(loan); // Establece el préstamo
        setIsEditOpen(true); // Abre el drawer de editar
    };

    const handleDelete = (loan) => {
        setSelectedLoan(loan); // Establece el préstamo
        setIsDeleteOpen(true); // Abre el modal de eliminar
    };

    // Columnas para la tabla de préstamos
    const columns = [
        // Renderiza la fecha en formato dd-mm-yy
        {
            key: "date",
            label: "Fecha",
            render: (loan) =>
                dayjs(loan.date, "YYYY-MM-DD").format("DD MMMM YYYY"),
        },
        {
            key: "employee",
            label: "Empleado",
            render: (loan) =>
                loan.employee.first_name + " " + loan.employee.last_name,
        },
        {
            key: "amount",
            label: "Monto del Préstamo",
            render: (loan) => formatter.format(loan.amount),
        },
        {
            key: "installments",
            label: "Cuotas",
            render: (loan) => loan.installments,
        },
        {
            key: "installment_value",
            label: "Valor de Cuota",
            render: (loan) => formatter.format(loan.installment_value),
        },
        {
            key: "pending_amount",
            label: "Monto Pendiente",
            render: (loan) => formatter.format(loan.pending_amount),
        },
        {
            key: "active",
            label: "Estado",
            render: (loan) => (loan.active ? "Activo" : "Inactivo"),
        }
    ];

    // Función para manejar el cambio de búsqueda, realiza una petición para filtrar los préstamos
    const handleSearchChange = (newSearchTerm) => {
        router.get(
            route("loans.index"),
            { employee_id: newSearchTerm },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    // Renderiza la página de préstamos
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Préstamos" />

            <PageHeader
                title="Todos los Préstamos"
                breadcrumbs={[
                    { label: "Inicio", url: route("dashboard"), icon: HiHome },
                    { label: "Préstamos" },
                ]}
                onAddClick={() => setIsAddOpen(true)}
                searchPlaceholder="Buscar préstamos"
                addButtonText="Agregar préstamo"
                onSearch={handleSearchChange}
                initialSearchTerm=""
            />

            <GenericTable
                data={loans.data}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <Pagination links={loans.links} meta={loans.meta} />

            {/* Drawer para añadir préstamos */}
            <LoanDrawer
                isOpen={isAddOpen || isEditOpen}
                onClose={() => {
                    setIsAddOpen(false);
                    setIsEditOpen(false);
                }}
                loan={isEditOpen ? selectedLoan : null}
                employees={employees}
            />

            {/* Modal para eliminar préstamos */}
            <DeleteModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                data={selectedLoan}
                routeName="loans"
            />
        </AuthenticatedLayout>
    );
}

export default Index;
