import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { WhatIs } from "@/components/WhatIs";
import { Services } from "@/components/Services";
import { SocialProof } from "@/components/SocialProof";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function HomePage() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <Hero />
        <Benefits />
        <WhatIs />
        <Services />
        <SocialProof />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
