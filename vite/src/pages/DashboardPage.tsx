import DashboardSidebar from "@/components/DashboardSidebar/DashboardSidebar";
import { Outlet } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div className="flex">
      <DashboardSidebar />
      <Outlet />
    </div>
  );
}
