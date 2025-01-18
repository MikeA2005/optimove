// Importaciones necesarias para el componente y sus dependencias
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { HiHome } from "react-icons/hi";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PageHeader from "@/Components/PageHeader";
import GenericTable from "@/Components/GenericTable";
import Pagination from "@/Components/Pagination";
import EmployeeDrawer from "./Partials/EmployeeDrawer";
import DeleteModal from "@/Components/DeleteModal";

// Componente Index para la página de empleados
function Index({ auth }) {
    // Estado y propiedades iniciales
    const { employees, users } = usePage().props; // Datos de empleados y usuarios
    const [isAddOpen, setIsAddOpen] = useState(false); // Controla la visibilidad del drawer de añadir
    const [isEditOpen, setIsEditOpen] = useState(false); // Controla la visibilidad del drawer de editar
    const [isDeleteOpen, setIsDeleteOpen] = useState(false); // Controla la visibilidad del modal de eliminar
    const [selectedEmployee, setSelectedEmployee] = useState(null); // Empleado seleccionado para editar o eliminar

    // Función para manejar eventos
    const handleEdit = (employee) => {
        setSelectedEmployee(employee); // Establece el empleado
        setIsEditOpen(true); // Abre el drawer de editar
    };

    const handleDelete = (employee) => {
        setSelectedEmployee(employee); // Establece el empleado
        setIsDeleteOpen(true); // Abre el modal de eliminar
    };

    // Tipos de contrato, para renderizar
    const contractTypeLabels = {
        IND: "Independiente",
        DEP: "Dependiente",
        OBL: "Obra Labor",
    };

    // Columnas para la tabla de empleados
    const columns = [
        {
            key: "full_name",
            label: "Nombre Completo",
            render: (employee) =>
                employee.last_name + " " + employee.first_name,
        },
        {
            key: "document",
            label: "Documento",
            render: (employee) =>
                employee.document_type + " " + employee.document_number,
        },
        {
            key: "contract_type",
            label: "Tipo de Contrato",
            render: (attendance) =>
                contractTypeLabels[attendance.contract_type] || "N/A",
        },
        {
            key: "user",
            label: "Usuario",
            render: (employee) => employee?.user?.name,
        },
    ];

    // Función para manejar el cambio en la búsqueda, realiza una petición para filtrar los empleados
    const handleSearchChange = (newSearchTerm) => {
        router.get(
            route("employees.index"),
            { last_name: newSearchTerm },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    // Renderiza la página de empleados
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Empleados" />

            <PageHeader
                title="Todos los Empleados"
                breadcrumbs={[
                    { label: "Inicio", url: route("dashboard"), icon: HiHome },
                    { label: "Empleados" },
                ]}
                onAddClick={() => setIsAddOpen(true)}
                searchPlaceholder="Buscar empleados"
                addButtonText="Agregar empleado"
                onSearch={handleSearchChange}
                initialSearchTerm=""
            />

            <GenericTable
                data={employees.data}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <Pagination links={employees.links} meta={employees.meta} />

            {/* Drawer para agregar o editar empleado */}
            <EmployeeDrawer
                isOpen={isAddOpen || isEditOpen}
                onClose={() => {
                    setIsAddOpen(false);
                    setIsEditOpen(false);
                }}
                employee={isEditOpen ? selectedEmployee : null}
                users={users}
            />

            {/* Modal para eliminar empleado */}
            <DeleteModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                data={selectedEmployee}
                routeName="employees"
            />
        </AuthenticatedLayout>
    );
}

export default Index;
