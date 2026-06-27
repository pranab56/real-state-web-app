'use client';

import { Combobox, ComboboxOption } from '@/components/ui/combobox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useUpdateStatusMutation } from '@/features/hotelPartner/confrimBooking/confrimBookingApi';
import { ApiError, Reservation } from '@/types';
import { baseURL } from '@/utils/BaseURL';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { format } from 'date-fns';
import { Bed, CalendarDays, Loader2, Mail, MapPin, Phone, Users } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=300&auto=format&fit=crop';

const getImg = (path?: string) => {
  if (!path) return FALLBACK_IMG;
  if (path.startsWith('http')) return path;
  return `${baseURL}${path}`;
};

const getInitials = (firstName?: string, lastName?: string) =>
  `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase() || '?';

const capitalize = (s?: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '—');

const getStatusStyle = (status?: string) => {
  switch (status) {
    case 'completed': return 'bg-[#F2F2F2] text-[#6C757D]';
    case 'confirmed': return 'bg-green-100 text-green-700';
    case 'cancelled': return 'bg-[#DC3545]/10 text-[#DC3545]';
    case 'pending': return 'bg-orange-100 text-orange-600';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-center justify-between gap-4 py-2.5 border-b border-[#F2F2F2] last:border-0">
    <span className="text-[13px] text-[#6C757D] font-medium">{label}</span>
    <span className="text-[13px] text-[#2C2E33] font-semibold text-right">{value}</span>
  </div>
);

interface BookingDetailsModalProps {
  booking: Reservation | null;
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
  /** Statuses the current viewer is allowed to move this booking to. Pass [] to hide the status editor. */
  allowedNextStatuses?: ComboboxOption[];
}

export function BookingDetailsModal({ booking, open, onOpenChangeAction, allowedNextStatuses = [] }: BookingDetailsModalProps) {
  const [nextStatus, setNextStatus] = useState('');
  const [updateStatus, { isLoading: isUpdating }] = useUpdateStatusMutation();

  // Reset the selected status whenever a different booking is shown (render-time state adjustment, not an effect).
  const [trackedBookingId, setTrackedBookingId] = useState(booking?._id);
  if (booking?._id !== trackedBookingId) {
    setTrackedBookingId(booking?._id);
    setNextStatus('');
  }

  if (!booking) return null;

  const property = booking.property ?? {};
  const customer = booking.customer ?? {};
  const pricing = booking.pricing ?? {};
  const address = [property.address?.street, property.address?.city, property.address?.country].filter(Boolean).join(', ');
  const customerAvatar = getImg(customer.image);
  const customerInitials = getInitials(customer.firstName, customer.lastName);

  const checkInStr = booking.checkIn ? format(new Date(booking.checkIn), 'MMM dd, yyyy') : '—';
  const checkOutStr = booking.checkOut ? format(new Date(booking.checkOut), 'MMM dd, yyyy') : '—';
  const nights = booking.checkIn && booking.checkOut
    ? Math.max(1, Math.round((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / (1000 * 60 * 60 * 24)))
    : null;
  const bookedOnStr = booking.createdAt ? format(new Date(booking.createdAt), 'MMM dd, yyyy') : '—';

  const handleUpdateStatus = async () => {
    if (!nextStatus) { toast.error('Please select a status to apply.'); return; }
    try {
      const res = await updateStatus({ reservationId: booking._id, data: { status: nextStatus } }).unwrap();
      toast.success(res?.message ?? 'Booking status updated successfully!');
      onOpenChangeAction(false);
    } catch (err) {
      toast.error(getErrorMessage(err as ApiError, 'Failed to update booking status'));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className="max-w-2xl sm:max-w-2xl max-h-[88vh] overflow-y-auto p-0 gap-0">
        <DialogHeader className="p-6 pb-4 border-b border-[#F2F2F2]">
          <div className="flex items-center justify-between gap-3 pr-6">
            <DialogTitle className="text-[18px] font-semibold text-[#2C2E33]">Booking Details</DialogTitle>
            <span className={`shrink-0 px-3 py-1 rounded-full text-[12px] font-semibold ${getStatusStyle(booking.status)}`}>
              {capitalize(booking.status)}
            </span>
          </div>
          <DialogDescription className="text-[13px] text-[#6C757D] font-medium">
            Reservation {booking.uid ?? `#${booking._id?.slice(-8).toUpperCase()}`} · Booked on {bookedOnStr}
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-6">

          {/* Property */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden relative flex-shrink-0">
              <Image src={getImg(property.images?.[0])} alt={property.title ?? ''} fill className="object-cover" />
            </div>
            <div className="min-w-0">
              <p className="text-[15px] font-semibold text-[#2C2E33] line-clamp-1">{property.title}</p>
              {address && (
                <div className="flex items-center gap-1.5 text-[#6C757D] mt-0.5">
                  <MapPin size={12} className="shrink-0" />
                  <span className="text-[12px] font-medium line-clamp-1">{address}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-[#6C757D] mt-0.5">
                <Bed size={12} className="shrink-0" />
                <span className="text-[12px] font-medium capitalize">{booking.roomClass?.replace('_', ' ')}</span>
              </div>
            </div>
          </div>

          {/* Stay + Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-[#F9F9F9] rounded-xl p-4">
              <div className="flex items-center gap-1.5 text-[#6C757D] mb-1.5">
                <CalendarDays size={13} /> <span className="text-[11px] font-semibold uppercase tracking-wide">Check-In</span>
              </div>
              <p className="text-[14px] font-semibold text-[#2C2E33]">{checkInStr}</p>
            </div>
            <div className="bg-[#F9F9F9] rounded-xl p-4">
              <div className="flex items-center gap-1.5 text-[#6C757D] mb-1.5">
                <CalendarDays size={13} /> <span className="text-[11px] font-semibold uppercase tracking-wide">Check-Out</span>
              </div>
              <p className="text-[14px] font-semibold text-[#2C2E33]">{checkOutStr}</p>
              {nights != null && <p className="text-[11px] text-[#6C757D] font-medium mt-0.5">{nights} night{nights > 1 ? 's' : ''}</p>}
            </div>
            <div className="bg-[#F9F9F9] rounded-xl p-4">
              <div className="flex items-center gap-1.5 text-[#6C757D] mb-1.5">
                <Users size={13} /> <span className="text-[11px] font-semibold uppercase tracking-wide">Guests</span>
              </div>
              <p className="text-[14px] font-semibold text-[#2C2E33]">
                {booking.guests?.adults ?? 0} Adult{booking.guests?.adults === 1 ? '' : 's'}
                {booking.guests?.children ? `, ${booking.guests.children} Child${booking.guests.children > 1 ? 'ren' : ''}` : ''}
                {booking.guests?.pets ? `, ${booking.guests.pets} Pet${booking.guests.pets > 1 ? 's' : ''}` : ''}
              </p>
            </div>
          </div>

          {/* Customer */}
          <div>
            <p className="text-[13px] font-semibold text-[#2C2E33] mb-3">Guest Information</p>
            <div className="flex items-center gap-3 bg-[#F9F9F9] rounded-xl p-4">
              {customer.image ? (
                <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border border-gray-100">
                  <Image src={customerAvatar} alt={customer.firstName ?? ''} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-11 h-11 rounded-full bg-[#F1913D]/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#F1913D] font-bold text-[13px]">{customerInitials}</span>
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-[14px] font-semibold text-[#2C2E33]">{customer.firstName} {customer.lastName}</p>
                  {customer.isVerified && (
                    <span className="text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Verified</span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-1">
                  {customer.email && (
                    <span className="flex items-center gap-1 text-[12px] text-[#6C757D] font-medium"><Mail size={11} /> {customer.email}</span>
                  )}
                  {customer.phone && (
                    <span className="flex items-center gap-1 text-[12px] text-[#6C757D] font-medium"><Phone size={11} /> {customer.phone}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div>
            <p className="text-[13px] font-semibold text-[#2C2E33] mb-1">Payment Summary</p>
            <div className="bg-[#F9F9F9] rounded-xl px-4">
              <Row label="Price / Night" value={`${pricing.currency ?? ''} ${pricing.pricePerUnit?.toFixed(2) ?? '—'}`} />
              <Row label="Nights" value={pricing.units ?? nights ?? '—'} />
              <Row label="Subtotal" value={`${pricing.currency ?? ''} ${pricing.subtotal?.toFixed(2) ?? '—'}`} />
              <Row label="Service Fee" value={`${pricing.currency ?? ''} ${pricing.serviceFee?.toFixed(2) ?? '0.00'}`} />
              {!!pricing.discount && <Row label="Discount" value={`- ${pricing.currency ?? ''} ${pricing.discount.toFixed(2)}`} />}
              <Row
                label="Total"
                value={<span className="text-[15px] text-[#F1913D]">{pricing.currency ?? ''} {pricing.total?.toFixed(2) ?? '—'}</span>}
              />
              <Row
                label="Payment Status"
                value={
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${pricing.isPaid ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                    {pricing.isPaid ? 'Paid' : 'Unpaid'}
                  </span>
                }
              />
            </div>
          </div>

        </div>

        {/* Status editor */}
        {allowedNextStatuses.length > 0 && (
          <div className="p-6 pt-5 border-t border-[#F2F2F2] bg-[#FAFAFA] rounded-b-xl">
            <p className="text-[13px] font-semibold text-[#2C2E33] mb-3">Update Booking Status</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Combobox
                  options={allowedNextStatuses}
                  value={nextStatus}
                  onChange={setNextStatus}
                  placeholder="Select new status"
                  className="bg-white border-gray-200"
                />
              </div>
              <button
                type="button"
                onClick={handleUpdateStatus}
                disabled={isUpdating || !nextStatus}
                className="px-6 py-3 rounded-[10px] bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-medium text-[14px] shadow-sm transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0"
              >
                {isUpdating ? <><Loader2 size={15} className="animate-spin" /> Updating...</> : 'Update Status'}
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
