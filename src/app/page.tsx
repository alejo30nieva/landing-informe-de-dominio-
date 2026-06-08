import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { PricingTable } from "@/components/PricingTable";
import { WhatIs } from "@/components/WhatIs";
import { SocialProof } from "@/components/SocialProof";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function HomePage() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        {/* 1. Above the fold: promesa + form con precio dinámico */}
        <Hero />
        {/* 2. Trust strip: por qué nosotros (4 motivos) */}
        <Benefits />
        {/* 3. Pricing — qué informes hay y cuánto cuestan */}
        <PricingTable />
        {/* 4. Qué es el informe — educación / objeciones */}
        <WhatIs />
        {/* 5. Prueba social — testimonios + métricas + badges */}
        <SocialProof />
        {/* 6. FAQ — objeciones finales */}
        <FAQ />
        {/* 7. CTA final */}
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
