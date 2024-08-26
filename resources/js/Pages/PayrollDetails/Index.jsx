// Importaciones necesarias para el componente y sus dependencias
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { HiHome } from "react-icons/hi";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PageHeader from "@/Components/PageHeader";
import GenericTable from "@/Components/GenericTable";
import Pagination from "@/Components/Pagination";
import PayrollDetailDrawer from "./Partials/PayrollDetailDrawer";
import DeleteModal from "@/Components/DeleteModal";

// Componente Index para la página de detalles de nómina
function Index({ auth }) {
    // Estado y propiedades iniciales
    const { payrollDetails, employees } = usePage().props; // Datos de detalles de nómina y empleados
    const [isAddOpen, setIsAddOpen] = useState(false); // Controla la visibilidad del drawer de añadir
    const [isEditOpen, setIsEditOpen] = useState(false); // Controla la visibilidad del drawer de editar
    const [isDeleteOpen, setIsDeleteOpen] = useState(false); // Controla la visibilidad del modal de eliminar
    const [selectedPayrollDetail, setSelectedPayrollDetail] = useState(null); // Detalle de nómina seleccionado para editar o eliminar
    const formatter = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 2,
    }); // Formateador de moneda

    // Función para manejar eventos
    const handleEdit = (payrollDetail) => {
        setSelectedPayrollDetail(payrollDetail); // Establece el detalle de nómina
        setIsEditOpen(true); // Abre el drawer de editar
    };

    const handleDelete = (payrollDetail) => {
        setSelectedPayrollDetail(payrollDetail); // Establece el detalle de nómina
        setIsDeleteOpen(true); // Abre el modal de eliminar
    };

    // Columnas para la tabla de detalles de nómina
    const columns = [
        {
            key: "employee",
            label: "Empleado",
            render: (payrollDetail) =>
                payrollDetail.employee.first_name + " " + payrollDetail.employee.last_name,
        },
        {
            key: "worked_days",
            label: "Días Trabajados",
            render: (payrollDetail) => payrollDetail.worked_days,
        },
        {
            key: "earned_salary",
            label: "Salario Devengado",
            render: (payrollDetail) => formatter.format(payrollDetail.earned_salary),
        },
        {
            key: "transport_allowance",
            label: "Auxilio de Transporte",
            render: (payrollDetail) =>
                formatter.format(payrollDetail.transport_allowance),
        },
        {
            key: "total_earnings",
            label: "Total Devengado",
            render: (payrollDetail) => formatter.format(payrollDetail.total_earnings),
        },
        {
            key: "total_deductions",
            label: "Total Deducciones",
            render: (payrollDetail) => formatter.format(payrollDetail.total_deductions),
        },
        {
            key: "net_pay",
            label: "Pago Neto",
            render: (payrollDetail) => formatter.format(payrollDetail.net_pay),
        },
    ];

    // Función para manejar el cambio de búsqueda
    const handleSearchChange = (newSearchTerm) => {
        router.get(
            route("payroll-details.index"),
            { employee_id: newSearchTerm },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    // Renderiza la página de detalles de nómina
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Detalles de Nómina" />

            <PageHeader
                title="Detalles de Nómina"
                breadcrumbs={[
                    { label: "Inicio", url: route("dashboard"), icon: HiHome },
                    {
                        label: "Encabezado de Nómina",
                        url: route("payroll-headers.index"),
                    },
                    { label: "Detalles de Nómina" },
                ]}
                onAddClick={() => setIsAddOpen(true)}
                searchPlaceholder="Buscar por empleado"
                addButtonText="Agregar Detalle"
                onSearch={handleSearchChange}
                initialSearchTerm=""
            />

            <GenericTable
                data={payrollDetails.data}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <Pagination links={payrollDetails.links} meta={payrollDetails.meta} />

            {/* Drawer para agregar detalles de nómina */}
            <PayrollDetailDrawer
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                employees={employees}
            />

            {/* Drawer para editar detalles de nómina */}
            <PayrollDetailDrawer
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                payrollDetail={selectedPayrollDetail}
                employees={employees}
            />

            {/* Modal para eliminar detalles de nómina */}
            <DeleteModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                data={selectedPayrollDetail}
                routeName="payroll-details"
            />
        </AuthenticatedLayout>
    );
}

export default Index;
