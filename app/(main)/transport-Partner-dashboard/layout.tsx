import { TransportSidebar } from '@/components/transport-Partner-dashboard/TransportSidebar';
import { TransportTopbar } from '@/components/transport-Partner-dashboard/TransportTopbar';

export default function TransportPartnerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <TransportSidebar />
      <div className="pl-[280px] flex flex-col min-h-screen">
        <TransportTopbar />
        <main className="flex-1 p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
