'use client';

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Combobox } from "@/components/ui/combobox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { baseURL } from "@/utils/BaseURL";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight, Loader2, Plus } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useGetAllListingsQuery } from '../../../../features/listings/listingsApi';
import { useCreateReservationMutation, useGetMyReservationQuery } from '../../../../features/reservation/page';
import { ApiError, Hotel, Reservation, RootState } from "@/types";

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=150&auto=format&fit=crop';

const getImg = (path?: string) => {
  if (!path) return FALLBACK_IMG;
  if (path.startsWith('http')) return path;
  return `${baseURL}${path}`;
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-[#F2F2F2] text-[#6C757D]';
    case 'confirmed': return 'bg-green-100 text-green-700';
    case 'cancelled': return 'bg-[#DC3545]/10 text-[#DC3545]';
    case 'pending': return 'bg-orange-100 text-orange-600';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const capitalize = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

const TABS = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'];

export default function PartnerDashboardBookings() {
  const [activeTab, setActiveTab] = useState('All');
  const [page, setPage] = useState(1);

  // Add Booking form state
  const [property, setProperty] = useState('');
  const [dateIn, setDateIn] = useState<Date>();
  const [dateOut, setDateOut] = useState<Date>();
  const [adults, setAdults] = useState('1');
  const [children, setChildren] = useState('0');
  const [pets, setPets] = useState('0');
  const [roomClass, setRoomClass] = useState('deluxe');
  const [country, setCountry] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);

  const userId = useSelector((state: RootState) => state.auth?.user?._id);
  const { data, isLoading } = useGetMyReservationQuery({ page, userId }, { skip: !userId });
  const [createBooking, { isLoading: createBookingLoading }] = useCreateReservationMutation();
  const { data: listingsData } = useGetAllListingsQuery({ category: 'accommodation', limit: 100 });
  const listings: Hotel[] = listingsData?.data ?? [];

  const listingOptions = listings.map((l: Hotel) => ({ value: l._id || '', label: l.title || '' }));
  const roomClassOptions = [
    { value: 'standard', label: 'Standard' },
    { value: 'deluxe', label: 'Deluxe' },
    { value: 'suite', label: 'Suite' },
    { value: 'luxury_suite', label: 'Luxury Suite' },
  ];

  const clearFieldError = (field: string) => {
    setFieldErrors(prev => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleCreateBooking = async () => {
    setFieldErrors({});
    if (!property) { toast.error('Please select a property'); return; }
    if (!dateIn) { toast.error('Please select Check-In date'); return; }
    if (!dateOut) { toast.error('Please select Check-Out date'); return; }
    if (!country.trim()) { toast.error('Please enter Country'); return; }
    try {
      const res = await createBooking({
        property: property.trim(),
        checkIn: format(dateIn, 'yyyy-MM-dd'),
        checkOut: format(dateOut, 'yyyy-MM-dd'),
        guests: { adults: Number(adults), children: Number(children), pets: Number(pets) },
        roomClass,
        country: country.trim(),
      }).unwrap();
      toast.success(res.message ?? 'Booking created!');
      setDialogOpen(false);
      setProperty(''); setDateIn(undefined); setDateOut(undefined);
      setAdults('1'); setChildren('0'); setPets('0');
      setRoomClass('deluxe'); setCountry('');
      setFieldErrors({});
    } catch (err) {
      const error = err as ApiError & { data?: { errorMessages?: { path: string; message: string }[] } };
      const errorMessages = error?.data?.errorMessages ?? [];
      if (errorMessages.length > 0) {
        const errors: Record<string, string> = {};
        errorMessages.forEach(e => { errors[e.path] = e.message; });
        setFieldErrors(errors);
      } else {
        toast.error(error?.data?.message ?? 'Failed to create booking');
      }
    }
  };

  const allBookings: Reservation[] = data?.data ?? [];
  const pagination = data?.pagination;
  const totalPage: number = pagination?.totalPage ?? 1;
  const total: number = pagination?.total ?? 0;
  const limit: number = pagination?.limit ?? 10;

  const filteredBookings = activeTab === 'All'
    ? allBookings
    : allBookings.filter(b => b.status === activeTab.toLowerCase());

  const showingFrom = total === 0 ? 0 : (page - 1) * limit + 1;
  const showingTo = Math.min(page * limit, total);

  return (
    <div className="bg-white rounded-lg p-6 lg:p-8 border border-gray-100 shadow-sm">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <h1 className="text-[24px] font-medium text-[#2C2E33]">Recent Bookings</h1>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) setFieldErrors({}); }}>
          <DialogTrigger render={
            <button onClick={() => setDialogOpen(true)} className="flex items-center justify-center cursor-pointer gap-2 bg-[#F1913D] hover:bg-[#F1913D]/90 transition-colors text-white font-semibold py-2.5 px-6 rounded-sm shadow-sm">
              <Plus size={18} strokeWidth={2.5} /> Add New Booking
            </button>
          } />
          <DialogContent className="sm:max-w-4xl bg-white border border-gray-100 shadow-xl rounded-sm p-6 lg:p-8">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-[22px] font-medium text-[#2C2E33]">Add New Booking</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">

                {/* Property Combobox */}
                <div className="space-y-3 md:col-span-2">
                  <label className="text-[14px] font-medium text-[#2C2E33]">Property</label>
                  <Combobox
                    options={listingOptions}
                    value={property}
                    onChange={setProperty}
                    placeholder="Select a property"
                    searchable
                    searchPlaceholder="Search property..."
                    className="h-[52px] bg-[#F9F9F9] border mt-1 border-[#F2F2F2] rounded-sm text-[14px]"
                  />
                </div>

                {/* Check-In */}
                <div className="space-y-3">
                  <label className="text-[14px] font-medium text-[#2C2E33]">Check-In</label>
                  <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
                    <PopoverTrigger render={
                      <Button variant="outline" className={cn("w-full bg-[#F9F9F9] h-[52px] rounded-sm px-4 text-[14px] mt-1 font-normal text-left justify-start hover:bg-gray-100/50 hover:text-[#2C2E33] text-[#2C2E33] focus-visible:ring-1 focus-visible:ring-[#F1913D]", !dateIn && "text-[#6C757D]", fieldErrors.checkIn ? "border-red-400" : "border-[#F2F2F2]")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateIn ? format(dateIn, "PPP") : <span>Pick a date</span>}
                      </Button>
                    } />
                    <PopoverContent style={{ width: 'var(--anchor-width)' }} className="p-0 z-[100] bg-white border border-[#F2F2F2] shadow-sm rounded-lg" align="start">
                      <Calendar mode="single" selected={dateIn} onSelect={(d) => { setDateIn(d); clearFieldError('checkIn'); setCheckInOpen(false); }} initialFocus className="w-full p-3 pointer-events-auto" classNames={{ root: 'w-full' }} />
                    </PopoverContent>
                  </Popover>
                  {fieldErrors.checkIn && <p className="text-[12px] font-medium text-red-500 mt-1">{fieldErrors.checkIn}</p>}
                </div>

                {/* Check-Out */}
                <div className="space-y-3">
                  <label className="text-[14px] font-medium text-[#2C2E33]">Check-Out</label>
                  <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
                    <PopoverTrigger render={
                      <Button variant="outline" className={cn("w-full bg-[#F9F9F9] h-[52px] rounded-sm px-4 text-[14px] mt-1 font-normal text-left justify-start hover:bg-gray-100/50 hover:text-[#2C2E33] text-[#2C2E33] focus-visible:ring-1 focus-visible:ring-[#F1913D]", !dateOut && "text-[#6C757D]", (fieldErrors.checkOut || fieldErrors.body) ? "border-red-400" : "border-[#F2F2F2]")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateOut ? format(dateOut, "PPP") : <span>Pick a date</span>}
                      </Button>
                    } />
                    <PopoverContent style={{ width: 'var(--anchor-width)' }} className="p-0 z-[100] bg-white border border-[#F2F2F2] shadow-sm rounded-lg" align="start">
                      <Calendar mode="single" selected={dateOut} onSelect={(d) => { setDateOut(d); clearFieldError('checkOut'); clearFieldError('body'); setCheckOutOpen(false); }} initialFocus className="w-full p-3 pointer-events-auto" classNames={{ root: 'w-full' }} />
                    </PopoverContent>
                  </Popover>
                  {fieldErrors.checkOut && <p className="text-[12px] font-medium text-red-500 mt-1">{fieldErrors.checkOut}</p>}
                  {fieldErrors.body && <p className="text-[12px] font-medium text-red-500 mt-1">{fieldErrors.body}</p>}
                </div>

                {/* Adults */}
                <div className="space-y-3">
                  <label className="text-[14px] font-medium text-[#2C2E33]">Adults</label>
                  <Input type="number" min="1" value={adults} onChange={e => setAdults(e.target.value)} placeholder="e.g. 2" className="w-full bg-[#F9F9F9] border-[#F2F2F2] rounded-sm h-[52px] px-4 text-[14px] text-[#2C2E33] mt-1 placeholder:text-[#6C757D] focus-visible:ring-1 focus-visible:ring-[#F1913D]" />
                </div>

                {/* Children */}
                <div className="space-y-3">
                  <label className="text-[14px] font-medium text-[#2C2E33]">Children</label>
                  <Input type="number" min="0" value={children} onChange={e => setChildren(e.target.value)} placeholder="e.g. 1" className="w-full bg-[#F9F9F9] border-[#F2F2F2] rounded-sm h-[52px] px-4 text-[14px] mt-1 text-[#2C2E33] placeholder:text-[#6C757D] focus-visible:ring-1 focus-visible:ring-[#F1913D]" />
                </div>

                {/* Pets */}
                <div className="space-y-3">
                  <label className="text-[14px] font-medium text-[#2C2E33]">Pets</label>
                  <Input type="number" min="0" value={pets} onChange={e => setPets(e.target.value)} placeholder="e.g. 0" className="w-full mt-1 bg-[#F9F9F9] border-[#F2F2F2] rounded-sm h-[52px] px-4 text-[14px] text-[#2C2E33] placeholder:text-[#6C757D] focus-visible:ring-1 focus-visible:ring-[#F1913D]" />
                </div>

                {/* Room Class Combobox */}
                <div className="space-y-3">
                  <label className="text-[14px] font-medium text-[#2C2E33]">Room Class</label>
                  <Combobox
                    options={roomClassOptions}
                    value={roomClass}
                    onChange={setRoomClass}
                    className="h-[52px] bg-[#F9F9F9] border border-[#F2F2F2] mt-1 rounded-sm text-[14px]"
                  />
                </div>

                {/* Country */}
                <div className="space-y-3">
                  <label className="text-[14px] font-medium text-[#2C2E33]">Country</label>
                  <Input value={country} onChange={e => setCountry(e.target.value)} placeholder="e.g. Bangladesh" className="w-full bg-[#F9F9F9] mt-1 border-[#F2F2F2] rounded-sm h-[52px] px-4 text-[14px] text-[#2C2E33] placeholder:text-[#6C757D] focus-visible:ring-1 focus-visible:ring-[#F1913D]" />
                </div>

              </div>
              <div className="flex gap-4 pt-4 mt-8 bg-white border-t border-[#F2F2F2] px-1 -mx-2 pb-0 justify-end">
                <button onClick={() => setDialogOpen(false)} className="bg-white border border-[#D1D1D1] hover:bg-gray-50 text-[#2C2E33] text-[15px] font-medium py-3 px-8 rounded-sm transition-colors cursor-pointer">
                  Cancel
                </button>
                <button onClick={handleCreateBooking} disabled={createBookingLoading} className="bg-[#F1913D] hover:bg-[#F1913D]/90 text-white text-[15px] font-medium py-3 px-8 rounded-sm transition-colors shadow-sm cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2">
                  {createBookingLoading ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : 'Save Booking'}
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 md:gap-8 mb-6 border-b border-[#F2F2F2] overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setPage(1); }}
              className={`font-semibold text-[15px] pb-4 relative transition-colors cursor-pointer ${isActive ? 'text-[#2C2E33]' : 'text-[#6C757D] hover:text-[#2C2E33]'}`}
            >
              {tab}
              {isActive && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#F1913D] rounded-t-full pointer-events-none" />}
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap border-collapse">
          <thead>
            <tr className="bg-[#F9F9F9]">
              <th className="px-6 py-4 font-medium text-[#6C757D] rounded-l-xl">Property</th>
              <th className="px-6 py-4 font-medium text-[#6C757D]">Guest</th>
              <th className="px-6 py-4 font-medium text-[#6C757D]">Check-In</th>
              <th className="px-6 py-4 font-medium text-[#6C757D]">Check-Out</th>
              <th className="px-6 py-4 font-medium text-[#6C757D]">Status</th>
              <th className="px-6 py-4 font-medium text-[#6C757D] rounded-r-xl">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-4" />
            {isLoading && (
              <tr>
                <td colSpan={6} className="text-center py-10">
                  <Loader2 size={28} className="animate-spin text-[#F1913D] mx-auto" />
                </td>
              </tr>
            )}
            {!isLoading && filteredBookings.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-[#6C757D]">No bookings found.</td>
              </tr>
            )}
            {!isLoading && filteredBookings.map((booking: Reservation) => {
              const guestStr = `${booking.guests?.adults ?? 0} Adults, ${booking.guests?.children ?? 0} Children`;
              const addressStr = [booking.property?.address?.city, booking.property?.address?.country].filter(Boolean).join(', ');

              return (
                <tr key={booking._id} className="hover:bg-gray-50/50 transition-colors border-b border-[#F2F2F2] last:border-0">
                  {/* Property */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-[50px] h-[50px] flex-shrink-0 rounded-xl bg-gray-200 overflow-hidden relative">
                        <Image src={getImg(booking.property?.images?.[0])} alt={booking.property?.title ?? ''} fill className="object-cover" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="font-medium text-[#2C2E33] text-[15px]">{booking.property?.title}</span>
                        <span className="text-[#6C757D] text-[13px]">{addressStr || capitalize(booking.roomClass)}</span>
                      </div>
                    </div>
                  </td>

                  {/* Guest */}
                  <td className="px-6 py-4 text-[#2C2E33] font-semibold text-[14px]">{guestStr}</td>

                  {/* Check-In */}
                  <td className="px-6 py-4 text-[#2C2E33] font-semibold text-[14px]">
                    {booking.checkIn ? format(new Date(booking.checkIn), 'MMM dd, yyyy') : '—'}
                  </td>

                  {/* Check-Out */}
                  <td className="px-6 py-4 text-[#2C2E33] font-semibold text-[14px]">
                    {booking.checkOut ? format(new Date(booking.checkOut), 'MMM dd, yyyy') : '—'}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`px-4 py-1.5 rounded-full text-[13px] font-medium ${getStatusStyle(booking.status)}`}>
                      {capitalize(booking.status)}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 font-medium text-[#2C2E33] text-[15px]">
                    {booking.pricing?.currency} {booking.pricing?.total?.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-10 pb-2">
        <p className="text-[#6C757D] text-[15px] text-center md:text-left">
          Showing <span className="font-medium text-[#2C2E33]">{showingFrom}-{showingTo} of {total}</span> entries
        </p>

        {totalPage > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="cursor-pointer flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-100 bg-white text-[#6C757D] font-semibold text-[13px] sm:text-[14px] rounded-lg hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} strokeWidth={2.5} /> <span className="hidden sm:inline">Previous</span>
            </button>

            {Array.from({ length: totalPage }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 flex cursor-pointer items-center justify-center font-medium rounded-lg shadow-sm transition-colors ${page === i + 1 ? 'bg-[#F1913D] text-white' : 'bg-white border border-gray-100 text-[#2C2E33] hover:bg-gray-50'}`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage(p => Math.min(totalPage, p + 1))}
              disabled={page === totalPage}
              className="cursor-pointer flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-100 bg-white text-[#2C2E33] font-semibold text-[13px] sm:text-[14px] rounded-lg hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span className="hidden sm:inline">Next</span> <ChevronRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
