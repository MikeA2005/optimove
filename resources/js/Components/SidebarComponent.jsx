import { Link } from '@inertiajs/react'
import { Sidebar } from 'flowbite-react'
import { useEffect, useState } from 'react';
import { HiChartPie, HiUsers, HiCollection, HiCalculator, HiBriefcase } from 'react-icons/hi';

function SidebarComponent({ isOpen }) {        
    const [isRrrhOpen, setIsRrrhOpen] = useState(false); // Establece el estado de la sección de RRHH
    const [isOperationsOpen, setIsOperationsOpen] = useState(false); // Establece el estado de la sección de Operaciones

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

    // Verifica si la ruta actual pertenece a la sección de RRHH u Operaciones y establece el estado de las secciones para mostrarlas abiertas
    useEffect(() => {
        const currentRoute = route().current();
        setIsRrrhOpen(rrhhRoutes.includes(currentRoute));
        setIsOperationsOpen(operationsRoutes.includes(currentRoute));
    }, [route().current()]);

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
                    <Sidebar.Item as={Link} icon={HiChartPie} href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                    </Sidebar.Item>
                            
                    <Sidebar.Collapse icon={HiCollection} label="RRHH" open={isRrrhOpen} aria-label='Recursos Humanos'>
                        <Sidebar.Item as={Link} href={route('employees.index')} active={route().current('employees.index')}>
                            Employees
                        </Sidebar.Item>
                        <Sidebar.Item as={Link} href={route('attendances.index')} active={route().current('attendances.index')}>
                            Attendances
                        </Sidebar.Item>
                        <Sidebar.Item as={Link} href={route('disabilities.index')} active={route().current('disabilities.index')}>
                            Disabilities
                        </Sidebar.Item>
                        <Sidebar.Item as={Link} href={route('overtimes.index')} active={route().current('overtimes.index')}>
                            Overtimes
                        </Sidebar.Item>
                        <Sidebar.Item as={Link} href={route('loans.index')} active={route().current('loans.index')}>
                            Loans
                        </Sidebar.Item>
                        <Sidebar.Item as={Link} href={route('vacations.index')} active={route().current('vacations.index')}>
                            Vacations
                        </Sidebar.Item>
                    </Sidebar.Collapse>

                    <Sidebar.Item as={Link} icon={ HiCalculator } href={route('payroll-headers.index')}>
                        Payrolls
                    </Sidebar.Item>

                    <Sidebar.Collapse icon={ HiBriefcase } label="Operations" open={isOperationsOpen} aria-label='Operaciones'>
                        <Sidebar.Item as={Link} href={route('clients.index')} active={route().current('clients.index')}>
                            Clients
                        </Sidebar.Item>
                        <Sidebar.Item as={Link} href={route('cities.index')} active={route().current('cities.index')}>
                            Cities
                        </Sidebar.Item>
                    </Sidebar.Collapse>

                    <Sidebar.Item as={Link} icon={HiUsers} href="">
                        Users
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
  )
}

export default SidebarComponent