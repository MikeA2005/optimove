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

// Componente Index para la página de cabeceras de nóminas
function Index({ auth }) {
    // Estado y propiedades iniciales
    const { payrollHeaders } = usePage().props; // Datos de encabezados
    const [isAddOpen, setIsAddOpen] = useState(false); // Controla la visibilidad del drawer de añadir
    const [isEditOpen, setIsEditOpen ] = useState(false); // Controla la visibilidad del drawer de editar
    const [isDeleteOpen, setIsDeleteOpen ] = useState(false); // Controla la visibilidad del modal de eliminar
    const [selectedPayrollHeader, setSelectedPayrollHeader ] = useState(null); // Encabezado seleccionado para editar o eliminar

    // Función para manejar eventos
    const handleEdit = (payrollHeader) => {
        setSelectedPayrollHeader(payrollHeader); // Establece el encabezado
        setIsEditOpen(true); // Abre el drawer de editar
    };

    const handleDelete = (payrollHeader) => {
        setSelectedPayrollHeader(payrollHeader); // Establece el encabezado
        setIsDeleteOpen(true); // Abre el modal de eliminar
    };

    // Tipos de contrato, para renderizar
    const payrollTypeLabels = {
        IND: "Independiente",
        DEP: "Dependiente",
        OBL: "Obra Labor",
    };

    // Columnas para la tabla de encabezados
    const columns = [
        {
            key: "name",
            label: "Nombre",
            render: (payrollHeader) => 
                <Link href={route('payroll-headers.show', payrollHeader.id)}> 
                    { payrollHeader.name } 
                </Link>
        },
        {
            key: "start_date",
            label: "Fecha de Inicio",
            render: (payrollHeader) => payrollHeader.start_date,
        },
        {
            key: "end_date",
            label: "Fecha de Fin",
            render: (payrollHeader) => payrollHeader.end_date,
        },
        {
            key: "payroll_type",
            label: "Tipo de Nómina",
            render: (payrollHeader) => 
                payrollTypeLabels[payrollHeader.payroll_type] || "N/A",
        },
        {
            key: "settlement_base",
            label: "Base de Liquidación",
            render: (payrollHeader) => payrollHeader.settlement_base,
        },
    ];

    // Función para manejar el cambio en la búsqueda, realiza una petición para filtrar los encabezados
    const handleSearchChange = (newSearchTerm) => {
        router.get(
            route("payroll-headers.index"),
            { payrollHeader_id: newSearchTerm },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    // Renderiza la página de encabezados de nómina
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Encabezados de Nómina" />

            <PageHeader
                title="Todos los Encabezados de Nómina"
                breadcrumbs={[
                    { label: "Inicio", url: route("dashboard"), icon: HiHome },
                    { label: "Encabezados de Nómina" },
                ]}
                onAddClick={() => setIsAddOpen(true)}
                searchPlaceholder="Buscar encabezados de nómina"
                addButtonText="Agregar encabezado"
                onSearch={handleSearchChange}
                initialSearchTerm=""
            />

            <GenericTable
                columns={columns}
                data={payrollHeaders.data}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <Pagination
                links={payrollHeaders.links}
                meta={payrollHeaders.meta}
            />

            {/* Drawer para añadir o editar encabezados de nómina */}
            <PayrollHeaderDrawer
                isOpen={isAddOpen || isEditOpen}
                onClose={() => {
                    setIsAddOpen(false);
                    setIsEditOpen(false);
                }}
                PayrollHeader={isEditOpen ? selectedPayrollHeader : null}
            />

            {/* Modal para eliminar los encabezados de nominas */}
            <DeleteModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                data={selectedPayrollHeader}
                routeName="payroll-headers"
            />
        </AuthenticatedLayout>
    );
}

export default Index;
