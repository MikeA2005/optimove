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

// Componente Index para la página de detalles de nóminas
function Index({ auth }) {
    // Estado y propiedades iniciales
    const { payrollDetails, payrollHeader, employees } = usePage().props; // Datos de detalles
    const [isAddOpen, setIsAddOpen] = useState(false); // Controla la visibilidad del drawer de añadir
    const [isEditOpen, setIsEditOpen] = useState(false); // Controla la visibilidad del drawer de editar
    const [isDeleteOpen, setIsDeleteOpen] = useState(false); // Controla la visibilidad del modal de eliminar
    const [selectedPayrollDetail, setSelectedPayrollDetail] = useState(null); // Detalle seleccionado para editar o eliminar

    // Función para manejar eventos
    const handleEdit = (payrollDetail) => {
        setSelectedPayrollDetail(payrollDetail); // Establece el detalle
        setIsEditOpen(true); // Abre el drawer de editar
    };

    const handleDelete = (payrollDetail) => {
        setSelectedPayrollDetail(payrollDetail); // Establece el detalle
        setIsDeleteOpen(true); // Abre el modal de eliminar
    };

    // Columnas para la tabla de detalles
    const columns = [
        {
            key: "full_name",
            label: "Nombre del Empleado",
            render: (payrollDetail) =>
                payrollDetail.employee.last_name +
                " " +
                payrollDetail.employee.first_name,
        },
        {
            key: "worked_days",
            label: "Días Trabajados",
            render: (payrollDetail) => payrollDetail.worked_days,
        },
        {
            key: "earned_salary",
            label: "Salario Devengado",
            render: (payrollDetail) => payrollDetail.earned_salary,
        },
        {
            key: "transport_allowance",
            label: "Auxilio de Transporte",
            render: (payrollDetail) => payrollDetail.transport_allowance,
        },
        {
            key: "disability_value",
            label: "Valor de Incapacidad",
            render: (payrollDetail) => payrollDetail.disability_value,
        },
        {
            key: "overtime_value",
            label: "Valor de Horas Extras",
            render: (payrollDetail) => payrollDetail.overtime_value,
        },
        {
            key: "others_earnings",
            label: "Otros Ingresos",
            render: (payrollDetail) => payrollDetail.others_earnings,
        },
        {
            key: "total_earnings",
            label: "Total Devengado",
            render: (payrollDetail) => payrollDetail.total_earnings,
        },
        {
            key: "health_contribution",
            label: "Aporte a Salud",
            render: (payrollDetail) => payrollDetail.health_contribution,
        },
        {
            key: "pension_contribution",
            label: "Aporte a Pensión",
            render: (payrollDetail) => payrollDetail.pension_contribution,
        },
        {
            key: "loan_payments",
            label: "Pagos de Préstamos",
            render: (payrollDetail) => payrollDetail.loan_payments,
        },
        {
            key: "funeral_plan",
            label: "Plan Exequial",
            render: (payrollDetail) => payrollDetail.funeral_plan,
        },
        {
            key: "responsabilities",
            label: "Responsabilidades",
            render: (payrollDetail) => payrollDetail.responsabilities,
        },
        {
            key: "payroll_deductions",
            label: "Libranzas",
            render: (payrollDetail) => payrollDetail.payroll_deductions,
        },
        {
            key: "others_deductions",
            label: "Otras Deducciones",
            render: (payrollDetail) => payrollDetail.others_deductions,
        },
        {
            key: "total_deductions",
            label: "Total Deducciones",
            render: (payrollDetail) => payrollDetail.total_deductions,
        },
        {
            key: "net_pay",
            label: "Salario Neto",
            render: (payrollDetail) => payrollDetail.net_pay,
        },
    ];

    // Función para manejar el cambio en la búsqueda, realiza una petición para filtrar los detalles
    const handleSearchChange = (newSearchTerm) => {
        router.get(
            route("payroll-details.index"),
            { payrollDetail_id: newSearchTerm },
            {
                preserveState: true,
                replace: true,
            }
        );
    };
    
    // Renderiza la página de detalles de nóminas
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Detalles de Nómina" />

            <PageHeader
                title={`Detalles de Nómina de ${payrollHeader.data.name}`}
                breadcrumbs={[
                    { label: "Inicio", url: route("dashboard"), icon: HiHome },
                    { label: "Encabezados de Nómina", url: route("payroll-headers.index") },
                    { label: "Detalles de Nómina" },
                ]}
                onAddClick={() => setIsAddOpen(true)}
                searchPlaceholder="Buscar detalles de nómina"
                addButtonText="Agregar detalle"
                onSearch={handleSearchChange}
                initialSearchTerm=""
            />

            <GenericTable
                columns={columns}
                data={payrollDetails.data}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* <Pagination
                links={payrollDetails.links}
                meta={payrollDetails.meta}
            /> */}

            {/* Drawer para agregar o editar un detalle de nómina */}
            <PayrollDetailDrawer
                isOpen={isAddOpen || isEditOpen}
                onClose={() => {
                    setIsAddOpen(false);
                    setIsEditOpen(false);
                }}
                PayrollDetail={isEditOpen ? selectedPayrollDetail : null}
                payrollHeader={payrollHeader.data}
                employees={employees}
            />

            {/* Modal para eliminar un detalle de nómina */}
            <DeleteModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onDelete={() => setIsDeleteOpen(false)}
                data={selectedPayrollDetail}
                routeName="payroll-details"
            />
        </AuthenticatedLayout>
    );
}

export default Index;
