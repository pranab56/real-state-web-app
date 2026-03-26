import { redirect } from 'next/navigation';

export default function ManageTransportPage() {
  redirect('/transport-Partner-dashboard/manage-vehicles/list');
}

export const dynamic = 'force-dynamic';