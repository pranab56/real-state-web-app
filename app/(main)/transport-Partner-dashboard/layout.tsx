import { DashboardLayoutClient } from '@/components/DashboardLayoutClient';
import { TransportSidebar } from '@/components/transport-Partner-dashboard/TransportSidebar';
import { TransportTopbar } from '@/components/transport-Partner-dashboard/TransportTopbar';
import { SidebarProvider } from '@/hooks/use-sidebar';

export default function TransportPartnerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardLayoutClient sidebar={<TransportSidebar />} topbar={<TransportTopbar />}>
        {children}
      </DashboardLayoutClient>
    </SidebarProvider>
  );
}
