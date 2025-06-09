import SidebarComponent from "@/Components/SidebarComponent";
import NavbarComponent from "@/Components/NavbarComponent";
import { useState } from "react";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

export default function Authenticated({ user, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <NavbarComponent
                appName={appName}
                user={user}
                onMenuToggle={toggleSidebar}
                sidebarOpen={sidebarOpen}
            />

            <SidebarComponent isOpen={sidebarOpen} user={user} />

            <div
                className={`pt-2 md:ml-64 mt-14 ${
                    sidebarOpen ? "md:ml-0" : ""
                }`}
            >
                {children}
            </div>
        </>
    );
}
