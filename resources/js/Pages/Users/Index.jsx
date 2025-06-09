// Importaciones necesarias para el componente y sus dependencias
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { HiHome } from "react-icons/hi";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PageHeader from "@/Components/PageHeader";
import GenericTable from "@/Components/GenericTable";
import Pagination from "@/Components/Pagination";
import UserDrawer from "./Partials/UserDrawer";
import DeleteModal from "@/Components/DeleteModal";

// Componente Index para la página de usuarios
function Index({ auth }) {
    // Estado y propiedades iniciales
    const { users } = usePage().props; // Datos de usuarios
    const [isAddOpen, setIsAddOpen] = useState(false); // Controla la visibilidad del drawer de añadir
    const [isEditOpen, setIsEditOpen] = useState(false); // Controla la visibilidad del drawer de editar
    const [isDeleteOpen, setIsDeleteOpen] = useState(false); // Controla la visibilidad del modal de eliminar
    const [selectedUser, setSelectedUser] = useState(null); // Usuario seleccionado para editar o eliminar
  
    // Función para manejar eventos
    const handleEdit = (user) => {
        setSelectedUser(user); // Establece el usuario
        setIsEditOpen(true); // Abre el drawer de editar
    };  

    const handleDelete = (user) => {
        setSelectedUser(user); // Establece el usuario
        setIsDeleteOpen(true); // Abre el modal de eliminar
    };

    console.log(users);
    
    // Columnas para la tabla de usuarios
    const columns = [
        {
            key: "name",
            label: "Nombre",
        },
        {
            key: "email",
            label: "Correo Electrónico",
        },
        {
            key: "role",
            label: "Rol",
        }
    ];

    // Función para manejar el cambio en la búsqueda
    const handleSearchChange = (newSearchTerm) => {
        router.get(
            route("users.index"),
            { email: newSearchTerm },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    // Renderiza la vista
    return (
      <AuthenticatedLayout user={auth.user}>
        <Head title="Usuarios" />

        <PageHeader 
          title="Todos los Usuarios"
          breadcrumbs={[
            { label: "Inicio", route: route("dashboard"), icon: HiHome },
            { label: "Usuarios" },
          ]}
          searchPlaceholder="Buscar usuarios por correo electrónico"
          onAddClick={() => setIsAddOpen(true)}
          addButtonText="Agregar usuario"
          onSearch={handleSearchChange}
          initialSearchTerm=""
        />

        <GenericTable
          data={users.data}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <Pagination links={users.links} meta={users.meta} />

        {/* Drawer para agregar o editar usuario */}
        <UserDrawer
          isOpen={isAddOpen || isEditOpen}
          onClose={() => {
            setIsAddOpen(false);
            setIsEditOpen(false);
          }}
          user={isEditOpen ? selectedUser : null}
        />

        {/* Modal para eliminar usuario */}
        <DeleteModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          data={selectedUser}
          routeName={"users"}
        />
      </AuthenticatedLayout>
    
    );
}

export default Index;
