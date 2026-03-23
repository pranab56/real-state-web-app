'use client';

import BuyingProperty from '@/components/home/BuyingProperty';
import FeaturedVerifiedProperties from '@/components/home/FeaturedVerifiedProperties';
import HelpSection from '@/components/home/HelpSection';
import Hero from '@/components/home/Hero';
import InsightOpinionSection from '@/components/home/InsightOpinionSection';
import PropertiesByCities from '@/components/home/PropertiesByCities';
import SummerTrips from '@/components/home/summerTrips';
import TopDistention from '@/components/home/TopDistention';
import TravelPlanSection from '@/components/home/TravelPlanSection';
import WhyChoose from '@/components/home/WhyChoose';

export default function Home() {

  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <PropertiesByCities />
      <FeaturedVerifiedProperties />
      <HelpSection />
      <TopDistention />
      <SummerTrips />
      <BuyingProperty />
      <TravelPlanSection />
      <WhyChoose />
      <InsightOpinionSection />
    </main>
  );
}
