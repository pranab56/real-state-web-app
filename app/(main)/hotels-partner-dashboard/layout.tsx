import { DashboardLayoutClient } from '@/components/DashboardLayoutClient';
import { HotelSidebar } from '@/components/hotels-partner-dashboard/HotelSidebar';
import { HotelTopbar } from '@/components/hotels-partner-dashboard/HotelTopbar';
import { SidebarProvider } from '@/hooks/use-sidebar';

export default function HotelPartnerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardLayoutClient sidebar={<HotelSidebar />} topbar={<HotelTopbar />}>
        {children}
      </DashboardLayoutClient>
    </SidebarProvider>
  );
}
