import DashboardSidebar from "@/components/DashboardSidebar/DashboardSidebar";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

export default function DashboardPageLayout() {
  return (
    <div className="flex">
      <DashboardSidebar />
      <Outlet />
      <Toaster />
    </div>
  );
}
