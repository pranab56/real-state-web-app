import CTABanner from "@/components/shared/CTABanner";
import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <CTABanner />
      <Footer />
    </>
  );
}
