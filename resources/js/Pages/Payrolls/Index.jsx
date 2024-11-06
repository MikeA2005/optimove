// Importaciones necesarias para el componente y sus dependencias
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { HiHome } from "react-icons/hi";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PageHeader from "@/Components/PageHeader";
import GenericTable from "@/Components/GenericTable";
import Pagination from "@/Components/Pagination";
import PayrollDrawer from "./Partials/PayrollDrawer";
import DeleteModal from "@/Components/DeleteModal";

// Componente Index para la página de nóminas
function Index({ auth }) {
    // Estado y propiedades iniciales
    const { payrolls, employees } = usePage().props; // Datos de nóminas
    const [isAddOpen, setIsAddOpen] = useState(false); // Controla la visibilidad del drawer de añadir
    const [isEditOpen, setIsEditOpen] = useState(false); // Controla la visibilidad del drawer de editar
    const [isDeleteOpen, setIsDeleteOpen] = useState(false); // Controla la visibilidad del modal de eliminar
    const [selectedPayroll, setSelectedPayroll] = useState(null); // Nómina seleccionada para editar o eliminar

    // Función para manejar eventos
    const handleEdit = (payroll) => {
        setSelectedPayroll(payroll); // Establece la nómina
        setIsEditOpen(true); // Abre el drawer de editar
    };

    const handleDelete = (payroll) => {
        setSelectedPayroll(payroll); // Establece la nómina
        setIsDeleteOpen(true); // Abre el modal de eliminar
    };

    // Columnas para la tabla de nóminas
    const columns = [
        {
            key: "full_name",
            label: "Nombre del Empleado",
            render: (payroll) =>
                payroll.employee.last_name + " " + payroll.employee.first_name,
        },
        {
            key: "start_date",
            label: "Fecha de Inicio",
            render: (payroll) => payroll.start_date,
        },
        {
            key: "end_date",
            label: "Fecha de Fin",
            render: (payroll) => payroll.end_date,
        },
        {
            key: "worked_days",
            label: "Días Trabajados",
            render: (payroll) => payroll.worked_days,
        },
        {
            key: "earned_salary",
            label: "Salario Devengado",
            render: (payroll) => payroll.earned_salary,
        },
        {
            key: "transport_allowance",
            label: "Auxilio de Transporte",
            render: (payroll) => payroll.transport_allowance,
        },
        {
            key: "disability_value",
            label: "Valor de Incapacidad",
            render: (payroll) => payroll.disability_value,
        },
        {
            key: "overtime_value",
            label: "Valor de Horas Extras",
            render: (payroll) => payroll.overtime_value,
        },
        {
            key: "others_earnings",
            label: "Otros Ingresos",
            render: (payroll) => payroll.others_earnings,
        },
        {
            key: "total_earnings",
            label: "Total Devengado",
            render: (payroll) => payroll.total_earnings,
        },
        {
            key: "health_contribution",
            label: "Aporte a Salud",
            render: (payroll) => payroll.health_contribution,
        },
        {
            key: "pension_contribution",
            label: "Aporte a Pensión",
            render: (payroll) => payroll.pension_contribution,
        },
        {
            key: "loan_payments",
            label: "Pagos de Préstamos",
            render: (payroll) => payroll.loan_payments,
        },
        {
            key: "funeral_plan",
            label: "Plan Exequial",
            render: (payroll) => payroll.funeral_plan,
        },
        {
            key: "responsabilities",
            label: "Responsabilidades",
            render: (payroll) => payroll.responsabilities,
        },
        {
            key: "payroll_deductions",
            label: "Libranzas",
            render: (payroll) => payroll.payroll_deductions,
        },
        {
            key: "others_deductions",
            label: "Otras Deducciones",
            render: (payroll) => payroll.others_deductions,
        },
        {
            key: "total_deductions",
            label: "Total Deducciones",
            render: (payroll) => payroll.total_deductions,
        },
        {
            key: "net_pay",
            label: "Salario Neto",
            render: (payroll) => payroll.net_pay,
        },
    ];

    // Función para manejar el cambio en la búsqueda, realiza una petición para filtrar las nóminas
    const handleSearchChange = (newSearchTerm) => {
        router.get(
            route("payrolls.index"),
            { employee_id: newSearchTerm },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    // Renderiza la página de nóminas
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Nóminas" />

            <PageHeader
                title="Todas las Nóminas"
                breadcrumbs={[
                    { label: "Inicio", url: route("dashboard"), icon: HiHome },
                    { label: "Nóminas" },
                ]}
                onAddClick={() => setIsAddOpen(true)}
                searchPlaceholder="Buscar nóminas"
                addButtonText="Agregar nómina"
                onSearch={handleSearchChange}
                initialSearchTerm=""
            />

            <GenericTable
                columns={columns}
                data={payrolls.data}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <Pagination links={payrolls.links} meta={payrolls.meta} />

            {/* Drawer para agregar nomina */}
            <PayrollDrawer
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                employees={employees}
            />

            {/* Drawer para editar nomina */}
            <PayrollDrawer
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                employees={employees}
                payroll={selectedPayroll}
            />

            {/* Modal para eliminar nomina */}
            <DeleteModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                data={selectedPayroll}
                routeName="payrolls"
            />
        </AuthenticatedLayout>
    );
}

export default Index;
