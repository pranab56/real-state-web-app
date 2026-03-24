import { HotelSidebar } from '@/components/hotels-partner-dashboard/HotelSidebar';
import { HotelTopbar } from '@/components/hotels-partner-dashboard/HotelTopbar';

export default function HotelPartnerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <HotelSidebar />
      <div className="pl-[280px] flex flex-col min-h-screen">
        <HotelTopbar />
        <main className="flex-1 p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
