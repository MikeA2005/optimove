// Importaciones necesarias para el componente y sus dependencias
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { HiHome } from "react-icons/hi";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PageHeader from "@/Components/PageHeader";
import GenericTable from "@/Components/GenericTable";
import Pagination from "@/Components/Pagination";
import ClientDrawer from "./Partials/ClientDrawer";
import DeleteModal from "@/Components/DeleteModal";

// Componente Index para la página de clientes
export default function Index({ auth }) {
    // Estado y propiedades iniciales
    const { clients, cities } = usePage().props; // Datos de clientes y ciudades
    const [isAddOpen, setIsAddOpen] = useState(false); // Controla la visibilidad del drawer de añadir
    const [isEditOpen, setIsEditOpen] = useState(false); // Controla la visibilidad del drawer de editar
    const [isDeleteOpen, setIsDeleteOpen] = useState(false); // Controla la visibilidad del modal de eliminar
    const [selectedClient, setSelectedClient] = useState(null); // Cliente seleccionado para editar o eliminar

    // Función para manejar eventos
    const handleEdit = (client) => {
        setSelectedClient(client); // Establece el cliente
        setIsEditOpen(true); // Abre el drawer de editar
    };

    const handleDelete = (client) => {
        setSelectedClient(client); // Establece el cliente
        setIsDeleteOpen(true); // Abre el modal de eliminar
    };

    // Columnas para la tabla de clientes
    const columns = [
        { key: "company_name", label: "Nombre de la Empresa" },
        { key: "nit", label: "NIT de la Empresa" },
        // Renderiza las ciudades de los clientes separadas por coma
        {
            key: "ciudades",
            label: "Ciudades",
            render: (client) => {
                const cityNames = client.cities.map((city) => city.city_name);
                return cityNames.length > 1
                    ? cityNames.join(", ")
                    : cityNames[0] || "";
            },
        },
    ];

    // Función para manejar el cambio en la búsqueda, realiza una petición para filtrar los clientes
    const handleSearchChange = (newSearchTerm) => {
        router.get(
            route("clients.index"),
            { company_name: newSearchTerm },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    // Renderizado del componente
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Clients" />

            <PageHeader
                title="Todos los Clientes"
                breadcrumbs={[
                    { label: "Inicio", url: route("dashboard"), icon: HiHome },
                    { label: "Clientes" },
                ]}
                searchPlaceholder="Buscar Clientes"
                onAddClick={() => setIsAddOpen(true)}
                addButtonText="Agregar Cliente"
                onSearch={handleSearchChange}
                initialSearchTerm=""
            />

            <GenericTable
                data={clients.data}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <Pagination links={clients.links} meta={clients.meta} />

            {/* Drawer para agregar o editar cliente */}
            <ClientDrawer
                isOpen={isAddOpen || isEditOpen}
                onClose={() => {
                    setIsAddOpen(false);
                    setIsEditOpen(false);
                }}
                client={isEditOpen ? selectedClient : null}
                cities={cities}
            />

            {/* Modal para eliminar cliente */}
            <DeleteModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                data={selectedClient}
                routeName="clients"
            />
        </AuthenticatedLayout>
    );
}
