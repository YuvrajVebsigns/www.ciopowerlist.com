import HeroSection from '@/components/HeroSection';
import FoundersMessage from '@/components/FoundersMessage';
import ExpertiseSection from '@/components/ExpertiseSection';
import KeyClient from '@/components/KeyClient';
import ProjectsSection from '@/components/ProjectsSection';
import CIOPowerListWhyPartner from '@/components/WhyPartner';
import ContactSection from '@/components/ContactSection';
import BlogsSection from '@/components/BlogsSection';
// import DialoguesSection from '@/components/DialoguesSection';
import CIOPowerListProcess from '@/components/Process';

export default function Home() {
  return (
    <main>
      {/* <div className="max-w-[1480px] mx-auto"> */}
      <HeroSection />
      <FoundersMessage />
      <ExpertiseSection />
      {/* <TeamSection /> */}
      <KeyClient />
      <CIOPowerListProcess />
      <CIOPowerListWhyPartner />
      <ProjectsSection />
      {/* <ResearchSection />
      <Brands /> */}

      <BlogsSection />

      {/* <DialoguesSection /> */}
      <ContactSection />
      {/* <AssociateBrandsPage /> */}
      {/* </div> */}
    </main>
  );
}
