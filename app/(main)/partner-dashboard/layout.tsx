import { DashboardLayoutClient } from '@/components/DashboardLayoutClient';
import { Sidebar } from '@/components/partner-dashboard/Sidebar';
import { Topbar } from '@/components/partner-dashboard/Topbar';
import { SidebarProvider } from '@/hooks/use-sidebar';

export default function PartnerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardLayoutClient sidebar={<Sidebar />} topbar={<Topbar />}>
        {children}
      </DashboardLayoutClient>
    </SidebarProvider>
  );
}
