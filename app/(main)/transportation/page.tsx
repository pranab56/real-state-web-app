'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const FormLabel = ({ children, optional, optionalText }: { children: React.ReactNode, optional?: boolean, optionalText?: string }) => (
  <label className="text-sm font-semibold text-neutral-1 flex gap-1 mb-2">
    {children}
    {optional && <span className="text-neutral-2 font-medium opacity-60">{optionalText}</span>}
  </label>
);

export default function TransportationPage() {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[450px] flex items-center justify-center text-center px-4 md:px-6">
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
            className="text-3xl md:text-5xl font-bold text-white leading-tight"
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

      {/* Booking Form Card */}
      <div className="container mx-auto px-4 md:px-6 mt-[-30px] md:-mt-12 pb-16 md:pb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-xl shadow-black/5 p-6 md:p-8 lg:p-12 border border-white"
        >
          <form className="space-y-6 md:space-y-8">
            {/* Requester Name */}
            <div className="space-y-2">
              <FormLabel>{t('transportation.form.requester_name')}</FormLabel>
              <Input
                placeholder={t('transportation.form.requester_placeholder')}
                className="h-12 bg-[#F6F6F6] border-none rounded-sm px-6 text-neutral-1 font-medium"
              />
            </div>

            {/* Service Type & Drop-off */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <FormLabel>{t('transportation.form.service_type')}</FormLabel>
                <Select>
                  <SelectTrigger className="h-12 w-full p-6 bg-[#F6F6F6] border-none rounded-sm px-6 text-neutral-1 font-medium">
                    <SelectValue placeholder={t('transportation.form.service_pickup')} />
                  </SelectTrigger>
                  <SelectContent className="rounded-sm ">
                    <SelectItem className="rounded-none py-2 " value="pickup">{t('transportation.form.service_pickup')}</SelectItem>
                    <SelectItem className="rounded-none py-2 " value="dropoff">{t('transportation.form.service_dropoff')}</SelectItem>
                    <SelectItem className="rounded-none py-2 " value="private">{t('transportation.form.service_private')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <FormLabel>{t('transportation.form.dropoff_location')}</FormLabel>
                <Input
                  placeholder={t('transportation.form.dropoff_placeholder')}
                  className="h-12 bg-[#F6F6F6] border-none rounded-sm px-6 text-neutral-1 font-medium"
                />
              </div>
            </div>

            {/* Pickup Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <FormLabel>{t('transportation.form.pickup_date')}</FormLabel>
                <Input
                  type="date"
                  className="h-12 bg-[#F6F6F6] border-none rounded-sm px-6 text-neutral-1 font-medium"
                />
              </div>
              <div className="space-y-2">
                <FormLabel>{t('transportation.form.pickup_time')}</FormLabel>
                <Input
                  type="time"
                  placeholder={t('transportation.form.pickup_time_placeholder')}
                  className="h-12 bg-[#F6F6F6] border-none rounded-sm px-6 text-neutral-1 font-medium"
                />
              </div>
            </div>

            {/* Passengers & Luggage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <FormLabel>{t('transportation.form.passengers')}</FormLabel>
                <Select>
                  <SelectTrigger className="h-12 py-6 w-full  bg-[#F6F6F6] border-none rounded-sm px-6 text-neutral-1 font-medium">
                    <SelectValue placeholder="4" />
                  </SelectTrigger>
                  <SelectContent className="rounded-sm">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                      <SelectItem key={i} className="rounded-none px-4 py-2" value={i.toString()}>{i}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <FormLabel>{t('transportation.form.luggage')}</FormLabel>
                <Select>
                  <SelectTrigger className="h-12 w-full py-6  bg-[#F6F6F6] border-none rounded-sm px-6 text-neutral-1 font-medium">
                    <SelectValue placeholder={t('transportation.form.luggage_1_2')} />
                  </SelectTrigger>
                  <SelectContent className="rounded-sm">
                    <SelectItem className="rounded-none px-4 py-2" value="0">{t('transportation.form.luggage_none')}</SelectItem>
                    <SelectItem className="rounded-none px-4 py-2" value="1-2">{t('transportation.form.luggage_1_2')}</SelectItem>
                    <SelectItem className="rounded-none px-4 py-2" value="3-4">{t('transportation.form.luggage_3_4')}</SelectItem>
                    <SelectItem className="rounded-none px-4 py-2" value="5+">{t('transportation.form.luggage_5_plus')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Vehicle Type & Flight Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <FormLabel>{t('transportation.form.vehicle_type')}</FormLabel>
                <Select>
                  <SelectTrigger className="h-12 w-full py-6 bg-[#F6F6F6] border-none rounded-sm px-6 text-neutral-1 font-medium">
                    <SelectValue placeholder={t('transportation.form.vehicle_sedan')} />
                  </SelectTrigger>
                  <SelectContent className="rounded-sm">
                    <SelectItem className="rounded-none px-4 py-2" value="sedan">{t('transportation.form.vehicle_sedan')}</SelectItem>
                    <SelectItem className="rounded-none px-4 py-2" value="suv">{t('transportation.form.vehicle_suv')}</SelectItem>
                    <SelectItem className="rounded-none px-4 py-2" value="van">{t('transportation.form.vehicle_van')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <FormLabel optional optionalText={t('transportation.form.optional')}>{t('transportation.form.flight_number')}</FormLabel>
                <Input
                  placeholder={t('transportation.form.flight_placeholder')}
                  className="h-12 bg-[#F6F6F6] border-none rounded-sm px-6 text-neutral-1 font-medium"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-2 pt-4">
              <FormLabel>{t('transportation.form.contact_info')}</FormLabel>
              <Input
                placeholder={t('transportation.form.requester_placeholder')}
                className="h-12 bg-[#F6F6F6] border-none rounded-sm px-6 text-neutral-1 font-medium"
              />
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <FormLabel>
                  {t('transportation.form.phone_number')} 
                  <span className="text-[10px] text-neutral-2 font-medium opacity-60 ml-1">{t('transportation.form.whatsapp_preferred')}</span>
                </FormLabel>
                <Input
                  placeholder={t('transportation.form.phone_placeholder')}
                  className="h-12 bg-[#F6F6F6] border-none rounded-sm px-6 text-neutral-1 font-medium"
                />
              </div>
              <div className="space-y-2">
                <FormLabel optional optionalText={t('transportation.form.optional')}>{t('transportation.form.email_address')}</FormLabel>
                <Input
                  placeholder={t('transportation.form.email_placeholder')}
                  className="h-12 bg-[#F6F6F6] border-none rounded-sm px-6 text-neutral-1 font-medium"
                />
              </div>
            </div>

            {/* Passenger Name (Optional) */}
            <div className="space-y-2">
              <FormLabel optional optionalText={t('transportation.form.optional')}>
                {t('transportation.form.passenger_name')} 
                <span className="text-[10px] text-neutral-2 font-medium opacity-60 ml-1">{t('transportation.form.passenger_note')}</span>
              </FormLabel>
              <Input
                placeholder={t('transportation.form.passenger_placeholder')}
                className="h-12 bg-[#F6F6F6] border-none rounded-sm px-6 text-neutral-1 font-medium"
              />
            </div>

            {/* Confirm Button */}
            <div className="pt-8 space-y-6 text-center">
              <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg text-lg transition-transform active:scale-[0.98]">
                {t('transportation.form.confirm_button')}
              </Button>
              <p className="text-sm text-neutral-2 font-medium opacity-70">
                {t('transportation.form.footer_note')}
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
