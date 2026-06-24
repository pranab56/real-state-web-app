'use client';

import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { PlacesAutocomplete } from '@/components/ui/places-autocomplete';
import { useCreateTransportationMutation } from '@/features/transportation/transportationApi';
import { cn } from '@/lib/utils';
import { ApiError } from '@/types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

// ── All fields share this height ──
const FIELD_H = 'h-12';

const FormLabel = ({
  children,
  optional,
  htmlFor,
}: {
  children: React.ReactNode;
  optional?: boolean;
  htmlFor?: string;
}) => (
  <label htmlFor={htmlFor} className="block text-sm font-semibold text-neutral-1 mb-1.5">
    {children}
    {optional && <span className="ml-1.5 text-[11px] font-medium text-neutral-2/50">(optional)</span>}
  </label>
);

const FieldError = ({ msg }: { msg?: string }) =>
  msg ? <p className="mt-1 text-xs font-medium text-red-500">{msg}</p> : null;

const Field = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('flex flex-col', className)}>{children}</div>
);

const inputCls = (error?: string) =>
  cn(
    FIELD_H,
    'w-full bg-[#F6F6F6] rounded-sm px-5 text-neutral-1 font-medium text-sm outline-none transition-all border',
    error
      ? 'border-red-400 bg-red-50/20 focus:ring-2 focus:ring-red-200'
      : 'border-transparent focus:ring-2 focus:ring-primary/20'
  );

interface LocationField {
  address: string;
  location: { type: 'Point'; coordinates: [number, number] };
}
const emptyLocation = (): LocationField => ({
  address: '',
  location: { type: 'Point', coordinates: [0, 0] },
});

const SERVICE_OPTIONS = [
  { value: 'pickup', label: 'Pickup' },
  { value: 'dropoff', label: 'Drop-off' },
  { value: 'round_trip', label: 'Round Trip' },
  { value: 'private_ride', label: 'Private Ride' },
];
const VEHICLE_OPTIONS = [
  { value: 'sedan', label: 'Sedan' },
  { value: 'suv', label: 'SUV' },
  { value: 'suv_xl', label: 'SUV XL' },
  { value: 'van', label: 'Van' },
  { value: 'minibus', label: 'Minibus' },
];
const PASSENGER_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
  value: String(n),
  label: `${n} ${n === 1 ? 'passenger' : 'passengers'}`,
}));
const LUGGAGE_OPTIONS = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
  value: String(n),
  label: n === 0 ? 'No luggage' : `${n} ${n === 1 ? 'bag' : 'bags'}`,
}));

// ── "datetime-local" inputs need "YYYY-MM-DDTHH:mm" in local time ──
const toDateTimeLocal = (d: Date) => {
  const tzOffsetMs = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tzOffsetMs).toISOString().slice(0, 16);
};

interface FormErrors {
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  serviceType?: string;
  vehicleType?: string;
  pickup?: string;
  dropoff?: string;
  pickupAt?: string;
}

function runValidation(f: {
  customerName: string; customerPhone: string; customerEmail: string;
  serviceType: string; vehicleType: string;
  pickupAddress: string; dropoffAddress: string; pickupAt: string;
}): FormErrors {
  const e: FormErrors = {};
  if (!f.customerName.trim()) e.customerName = 'Full name is required';
  if (!f.customerPhone.trim()) e.customerPhone = 'Phone number is required';
  if (!f.customerEmail.trim()) e.customerEmail = 'Email address is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.customerEmail)) e.customerEmail = 'Enter a valid email address';
  if (!f.serviceType) e.serviceType = 'Please select a service type';
  if (!f.vehicleType) e.vehicleType = 'Please select a vehicle type';
  if (!f.pickupAddress) e.pickup = 'Pickup address is required';
  if (!f.dropoffAddress) e.dropoff = 'Drop-off address is required';
  if (!f.pickupAt) e.pickupAt = 'Pickup date & time is required';
  else if (new Date(f.pickupAt).getTime() < Date.now()) e.pickupAt = 'Pickup date & time cannot be in the past';
  return e;
}

export default function TransportationPage() {
  const { t } = useTranslation('common');
  const [createTransportation, { isLoading }] = useCreateTransportationMutation();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [passengerName, setPassengerName] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [luggage, setLuggage] = useState('0');
  const [serviceType, setServiceType] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [pickupAt, setPickupAt] = useState('');
  const [pickup, setPickup] = useState<LocationField>(emptyLocation());
  const [dropoff, setDropoff] = useState<LocationField>(emptyLocation());
  const [errors, setErrors] = useState<FormErrors>({});

  const clearErr = (key: keyof FormErrors) =>
    setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const errs = runValidation({
      customerName, customerPhone, customerEmail,
      serviceType, vehicleType,
      pickupAddress: pickup.address,
      dropoffAddress: dropoff.address,
      pickupAt,
    });
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const body = {
      customer: { name: customerName, email: customerEmail, phone: customerPhone },
      passengerName: passengerName || customerName,
      passengers: Number(passengers),
      luggage: Number(luggage),
      serviceType,
      vehicleType,
      ...(flightNumber && { flightNumber }),
      pickup,
      dropoff,
      pickupAt: new Date(pickupAt).toISOString(),
    };

    try {
      await createTransportation(body).unwrap();
      toast.success('Ride booked successfully! We will confirm shortly.');
      setCustomerName(''); setCustomerEmail(''); setCustomerPhone('');
      setPassengerName(''); setPassengers('1'); setLuggage('0');
      setServiceType(''); setVehicleType(''); setFlightNumber('');
      setPickupAt(''); setPickup(emptyLocation()); setDropoff(emptyLocation());
      setErrors({});
    } catch (err) {
      const error = err as ApiError;
      toast.error(error?.data?.message ?? 'Booking failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Hero */}
      <div className="relative h-[280px] md:h-[420px] flex items-center justify-center text-center px-4 md:px-6">
        <Image
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2000&h=800&fit=crop"
          alt="Road Background"
          fill
          className="object-cover brightness-[0.4]"
          priority
        />
        <div className="relative max-w-4xl space-y-3 md:space-y-4 pt-10 md:pt-0">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-medium text-white leading-tight"
            dangerouslySetInnerHTML={{ __html: t('transportation.hero.title') }}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm md:text-lg text-white/80 font-medium max-w-2xl mx-auto px-4"
          >
            {t('transportation.hero.subtitle')}
          </motion.p>
        </div>
      </div>

      {/* Form Card */}
      <div className="container mx-auto px-4 md:px-6 -mt-8 md:-mt-10 pb-16 md:pb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-100 p-6 md:p-8 lg:p-10"
        >
          <form onSubmit={handleSubmit} noValidate className="space-y-8">

            {/* ── Contact Information ── */}
            <section className="space-y-4">
              <h3 className="text-xs font-black text-neutral-2/70 uppercase tracking-widest pb-2 border-b border-gray-100">
                Contact Information
              </h3>

              <Field>
                <FormLabel htmlFor="customerName">{t('transportation.form.requester_name')}</FormLabel>
                <input
                  id="customerName"
                  value={customerName}
                  onChange={(e) => { setCustomerName(e.target.value); clearErr('customerName'); }}
                  placeholder={t('transportation.form.requester_placeholder')}
                  className={inputCls(errors.customerName)}
                />
                <FieldError msg={errors.customerName} />
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FormLabel htmlFor="customerPhone">{t('transportation.form.phone_number')}</FormLabel>
                  <input
                    id="customerPhone"
                    value={customerPhone}
                    onChange={(e) => { setCustomerPhone(e.target.value); clearErr('customerPhone'); }}
                    placeholder={t('transportation.form.phone_placeholder')}
                    className={inputCls(errors.customerPhone)}
                  />
                  <FieldError msg={errors.customerPhone} />
                </Field>

                <Field>
                  <FormLabel htmlFor="customerEmail">{t('transportation.form.email_address')}</FormLabel>
                  <input
                    id="customerEmail"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => { setCustomerEmail(e.target.value); clearErr('customerEmail'); }}
                    placeholder={t('transportation.form.email_placeholder')}
                    className={inputCls(errors.customerEmail)}
                  />
                  <FieldError msg={errors.customerEmail} />
                </Field>
              </div>
            </section>

            {/* ── Trip Details ── */}
            <section className="space-y-4">
              <h3 className="text-xs font-black text-neutral-2/70 uppercase tracking-widest pb-2 border-b border-gray-100">
                Trip Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FormLabel>{t('transportation.form.service_type')}</FormLabel>
                  <Combobox
                    options={SERVICE_OPTIONS}
                    value={serviceType}
                    onChange={(v) => { setServiceType(v); clearErr('serviceType'); }}
                    placeholder="Select service type"
                    error={!!errors.serviceType}
                  />
                  <FieldError msg={errors.serviceType} />
                </Field>

                <Field>
                  <FormLabel>{t('transportation.form.vehicle_type')}</FormLabel>
                  <Combobox
                    options={VEHICLE_OPTIONS}
                    value={vehicleType}
                    onChange={(v) => { setVehicleType(v); clearErr('vehicleType'); }}
                    placeholder="Select vehicle type"
                    error={!!errors.vehicleType}
                  />
                  <FieldError msg={errors.vehicleType} />
                </Field>
              </div>

              <Field>
                <FormLabel>Pickup Address</FormLabel>
                <PlacesAutocomplete
                  placeholder="Search pickup address..."
                  value={pickup.address}
                  onPlaceSelectAction={({ address, lat, lng }) => {
                    setPickup({ address, location: { type: 'Point', coordinates: [lng, lat] } });
                    clearErr('pickup');
                  }}
                  error={!!errors.pickup}
                />
                <FieldError msg={errors.pickup} />
              </Field>

              <Field>
                <FormLabel>{t('transportation.form.dropoff_location')}</FormLabel>
                <PlacesAutocomplete
                  placeholder="Search drop-off address..."
                  value={dropoff.address}
                  onPlaceSelectAction={({ address, lat, lng }) => {
                    setDropoff({ address, location: { type: 'Point', coordinates: [lng, lat] } });
                    clearErr('dropoff');
                  }}
                  error={!!errors.dropoff}
                />
                <FieldError msg={errors.dropoff} />
              </Field>

              <Field>
                <FormLabel htmlFor="pickupAt">Pickup Date & Time</FormLabel>
                <input
                  id="pickupAt"
                  type="datetime-local"
                  value={pickupAt}
                  min={toDateTimeLocal(new Date())}
                  onChange={(e) => { setPickupAt(e.target.value); clearErr('pickupAt'); }}
                  className={inputCls(errors.pickupAt)}
                />
                <FieldError msg={errors.pickupAt} />
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FormLabel>{t('transportation.form.passengers')}</FormLabel>
                  <Combobox
                    options={PASSENGER_OPTIONS}
                    value={passengers}
                    onChange={setPassengers}
                    placeholder="Passengers"
                  />
                </Field>

                <Field>
                  <FormLabel>{t('transportation.form.luggage')}</FormLabel>
                  <Combobox
                    options={LUGGAGE_OPTIONS}
                    value={luggage}
                    onChange={setLuggage}
                    placeholder="Luggage"
                  />
                </Field>
              </div>

              <Field>
                <FormLabel htmlFor="flightNumber" optional>
                  {t('transportation.form.flight_number')}
                </FormLabel>
                <input
                  id="flightNumber"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  placeholder={t('transportation.form.flight_placeholder')}
                  className={inputCls()}
                />
              </Field>
            </section>

            {/* ── Passenger ── */}
            <section className="space-y-4">
              <h3 className="text-xs font-black text-neutral-2/70 uppercase tracking-widest pb-2 border-b border-gray-100">
                Passenger
              </h3>
              <Field>
                <FormLabel htmlFor="passengerName" optional>
                  {t('transportation.form.passenger_name')}
                </FormLabel>
                <input
                  id="passengerName"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  placeholder={t('transportation.form.passenger_placeholder')}
                  className={inputCls()}
                />
              </Field>
            </section>

            {/* Submit */}
            <div className="pt-2 space-y-3 text-center">
              <Button
                type="submit"
                disabled={isLoading}
                className={cn(
                  FIELD_H,
                  'w-full bg-primary hover:bg-primary/90 text-white font-medium rounded-lg text-sm transition-transform cursor-pointer active:scale-[0.98] disabled:opacity-70 border-none'
                )}
              >
                {isLoading ? 'Booking...' : t('transportation.form.confirm_button')}
              </Button>
              <p className="text-xs text-neutral-2 font-medium opacity-60">
                {t('transportation.form.footer_note')}
              </p>
            </div>

          </form>
        </motion.div>
      </div>
    </div>
  );
}
