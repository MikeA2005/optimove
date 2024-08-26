// Importaciones necesarias para el componente y sus dependencias
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { HiHome } from "react-icons/hi";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PageHeader from "@/Components/PageHeader";
import GenericTable from "@/Components/GenericTable";
import Pagination from "@/Components/Pagination";
import PayrollHeaderDrawer from "./Partials/PayrollHeaderDrawer";
import DeleteModal from "@/Components/DeleteModal";
import dayjs from "dayjs";

function Index({ auth }) {
    // Estado y propiedades iniciales
    const { payrollHeaders } = usePage().props; // Datos de horas extras, empleados y tipos de horas extras
    const [isAddOpen, setIsAddOpen] = useState(false); // Controla la visibilidad del drawer de añadir
    const [isEditOpen, setIsEditOpen] = useState(false); // Controla la visibilidad del drawer de editar
    const [isDeleteOpen, setIsDeleteOpen] = useState(false); // Controla la visibilidad del modal de eliminar
    const [selectedPayrollHeader, setSelectedPayrollHeader] = useState(null); // Hora extra seleccionada para editar o eliminar
    const formatter = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 2 }); // Formateador de moneda

    // Función para manejar eventos
    const handleEdit = (payrollHeader) => {
        setSelectedPayrollHeader(payrollHeader); // Establece la hora extra
        setIsEditOpen(true); // Abre el drawer de editar
    };

    const handleDelete = (payrollHeader) => {
        setSelectedPayrollHeader(payrollHeader); // Establece la hora extra
        setIsDeleteOpen(true); // Abre el modal de eliminar
    };

    // Columnas para la tabla de horas extras
    const columns = [
        // Renderiza el id del encabezado de nómina
        {
            key: "name",
            label: "Nombre",
            render: (payrollHeader) => (
                <Link href="" className="underline">
                    {payrollHeader.name}
                </Link>
            )
        },
        // Renderiza la fecha en formato dd-mm-yy
        {
            key: "start_date",
            label: "Fecha de Inicio",
            render: (payrollHeader) => dayjs(payrollHeader.start_date, "YYYY-MM-DD").format("DD MMMM YYYY")
        },
        // Renderiza la fecha en formato dd-mm-yy
        {
            key: "end_date",
            label: "Fecha de Fin",
            render: (payrollHeader) => dayjs(payrollHeader.end_date, "YYYY-MM-DD").format("DD MMMM YYYY")
        },
        // Rederiza la base de liquidación a pesos colombianos
        {
            key: "settlement_base",
            label: "Base de Liquidación",
            render: (payrollHeader) => formatter.format(payrollHeader.settlement_base)
        }
    ];

    // Función para manejar el cambio de búsqueda, realiza una petición para filtrar las horas extras
    const handleSearchChange = (newSearchTerm) => {
        router.get(
            route("payroll-headers.index"),
            { start_date: newSearchTerm },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    // Renderiza la página de Encabezados de Nómina
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Encabezados de Nómina" />

            <PageHeader
                title="Encabezados de Nómina"
                breadcrumbs={[
                    { label: "Inicio", route: route("dashboard"), icon: HiHome },
                    { label: "Encabezados de Nómina" },
                ]}
                onAddClick={() => setIsAddOpen(true)}
                searchPlaceholder="Buscar por fecha de inicio"
                addButtonText="Agregar Encabezado"
                onSearchChange={handleSearchChange}
                initialSearchTerm=""
            />

            <GenericTable
                data={payrollHeaders.data}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <Pagination links={payrollHeaders.links} meta={payrollHeaders.meta} />
                
            {/* Drawer para agregar Encabezados de Nómina */}
            <PayrollHeaderDrawer
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
            />

            {/* Drawer para editar Encabezados de Nómina */}
            <PayrollHeaderDrawer
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                payrollHeader={selectedPayrollHeader}
            />

            {/* Modal para eliminar Encabezados de Nómina */}
            <DeleteModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                data={selectedPayrollHeader}
                routeName="payroll-headers.destroy"
            />
        </AuthenticatedLayout>
    );
}

export default Index;
