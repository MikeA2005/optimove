// Importaciones necesarias para el componente y sus dependencias
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { HiHome } from "react-icons/hi";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PageHeader from "@/Components/PageHeader";
import GenericTable from "@/Components/GenericTable";
import Pagination from "@/Components/Pagination";
import CityDrawer from "./Partials/CityDrawer";
import DeleteModal from "@/Components/DeleteModal";

// Componente Index para la página de ciudades
export default function Index({ auth }) {
    // Estado y propiedades iniciales
    const { cities } = usePage().props; // Datos de ciudades
    const [isAddOpen, setIsAddOpen] = useState(false); // Controla la visibilidad del drawer de añadir
    const [isEditOpen, setIsEditOpen] = useState(false); // Controla la visibilidad del drawer de editar
    const [isDeleteOpen, setIsDeleteOpen] = useState(false); // Controla la visibilidad del modal de eliminar
    const [selectedCity, setSelectedCity] = useState(null); // Ciudad seleccionada para editar o eliminar

    // Función para manejar eventos
    const handleEdit = (city) => {
        setSelectedCity(city); // Establece la ciudad
        setIsEditOpen(true); // Abre el drawer de editar
    };

    const handleDelete = (city) => {
        setSelectedCity(city); // Establece la ciudad
        setIsDeleteOpen(true); // Abre el modal de eliminar
    };

    // Columnas para la tabla de ciudades
    const columns = [{ key: "city_name", label: "Nombre de la Ciudad" }];

    // Función para manejar el cambio en la búsqueda, realiza una petición para filtrar las ciudades
    const handleSearchChange = (newSearchTerm) => {
        router.get(
            route("cities.index"),
            { city_name: newSearchTerm },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    // Renderizado del componente
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Cities" />

            <PageHeader
                title="Todas las Ciudades"
                breadcrumbs={[
                    { label: "Inicio", url: route("dashboard"), icon: HiHome },
                    { label: "Ciudades" },
                ]}
                searchPlaceholder="Buscar Ciudad"
                onAddClick={() => setIsAddOpen(true)}
                addButtonText="Agregar Ciudad"
                onSearch={handleSearchChange}
                initialSearchTerm=""
            />

            <GenericTable
                data={cities.data}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <Pagination links={cities.links} meta={cities.meta} />

            {/* Drawer para agregar ciudad */}
            <CityDrawer
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
            />

            {/* Drawer para editar ciudad */}
            <CityDrawer
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                city={selectedCity}
            />
            
            {/* Modal para eliminar ciudad */}
            <DeleteModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                data={selectedCity}
                routeName="cities"
            />
        </AuthenticatedLayout>
    );
}
