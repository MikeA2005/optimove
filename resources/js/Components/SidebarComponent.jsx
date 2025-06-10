import { Link } from '@inertiajs/react'
import { Sidebar } from 'flowbite-react'
import { useEffect, useState } from 'react';
import { HiChartPie, HiUsers, HiCollection, HiCalculator, HiBriefcase } from 'react-icons/hi';

function SidebarComponent({ isOpen, user }) {        
    const [isRrrhOpen, setIsRrrhOpen] = useState(false); // Estado para sección RRHH
    const [isOperationsOpen, setIsOperationsOpen] = useState(false); // Estado para sección Operaciones

    // Rutas de RRHH
    const rrhhRoutes = [
        'employees.index',
        'attendances.index',
        'disabilities.index',
        'overtimes.index',
        'loans.index',
        'vacations.index',
    ];

    // Rutas de Operaciones
    const operationsRoutes = [
        'clients.index',
        'cities.index',
    ];

    // Abre/cierra secciones según la ruta actual
    useEffect(() => {
        const currentRoute = route().current();
        setIsRrrhOpen(rrhhRoutes.includes(currentRoute));
        setIsOperationsOpen(operationsRoutes.includes(currentRoute));
    }, [route().current()]);

    // Helpers para roles
    const isAdmin = user.role === 'admin';
    const isRrhh = user.role === 'rrhh';
    const isOperaciones = user.role === 'operaciones';

    return (
        <Sidebar 
            theme={{
                root: {
                    base: `fixed top-0 left-0 z-20 w-64 h-screen pt-14 transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`,
                },
                items: {
                    base: "overflow-y-auto pt-2",
                },
                itemGroup: {
                    base: "space-y-2 font-medium",
                },
            }}
            aria-label='Sidebar'
        >
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    {/* Dashboard: Solo admin y rrhh */}
                    {(isAdmin || isRrhh) && (
                        <Sidebar.Item as={Link} icon={HiChartPie} href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </Sidebar.Item>
                    )}
                    
                    {/* RRHH: admin, rrhh y operaciones (con permisos distintos) */}
                    <Sidebar.Collapse icon={HiCollection} label="RRHH" open={isRrrhOpen} aria-label='Recursos Humanos'>
                        {(isAdmin || isRrhh || isOperaciones) && (
                            <>
                                <Sidebar.Item as={Link} href={route('employees.index')} active={route().current('employees.index')}>
                                    Empleados
                                </Sidebar.Item>
                                <Sidebar.Item as={Link} href={route('attendances.index')} active={route().current('attendances.index')}>
                                    Asistencias
                                </Sidebar.Item>
                                <Sidebar.Item as={Link} href={route('disabilities.index')} active={route().current('disabilities.index')}>
                                    Incapacidades
                                </Sidebar.Item>
                                <Sidebar.Item as={Link} href={route('overtimes.index')} active={route().current('overtimes.index')}>
                                    Horas extra
                                </Sidebar.Item>
                            </>
                        )}
                        {/* Prestamos: solo admin y rrhh */}
                        {(isAdmin || isRrhh) && (
                            <Sidebar.Item as={Link} href={route('loans.index')} active={route().current('loans.index')}>
                                Prestamos
                            </Sidebar.Item>
                        )}
                    </Sidebar.Collapse>
                    
                    {/* Nómina: solo admin y rrhh */}
                    {(isAdmin || isRrhh) && (
                        <Sidebar.Item as={Link} icon={HiCalculator} href={route('payroll-headers.index')} active={route().current('payroll-headers.index')}>
                            Nómina
                        </Sidebar.Item>
                    )}

                    {/* Operaciones y Usuarios: solo admin */}
                    {isAdmin && (
                        <>
                            <Sidebar.Collapse icon={HiBriefcase} label="Operaciones" open={isOperationsOpen} aria-label='Operaciones'>
                                <Sidebar.Item as={Link} href={route('clients.index')} active={route().current('clients.index')}>
                                    Operaciones
                                </Sidebar.Item>
                                <Sidebar.Item as={Link} href={route('cities.index')} active={route().current('cities.index')}>
                                    Ciudades
                                </Sidebar.Item>
                            </Sidebar.Collapse>

                            <Sidebar.Item as={Link} href={route('users.index')} active={route().current('users.index')} icon={HiUsers}>
                                Usuarios
                            </Sidebar.Item>
                        </>
                    )}
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default SidebarComponent