import { Sidebar } from '@/components/partner-dashboard/Sidebar';
import { Topbar } from '@/components/partner-dashboard/Topbar';

export default function PartnerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <Sidebar />
      <div className="pl-[280px] flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
