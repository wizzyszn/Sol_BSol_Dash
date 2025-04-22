import { Outlet} from "react-router-dom";
import Sidenav from "@/components/General/Sidenav";

export function DashboardLayout() {

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar*/}
      <Sidenav />
      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
