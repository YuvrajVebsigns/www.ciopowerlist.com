import HeroSection from '@/components/HeroSection';
import FoundersMessage from '@/components/FoundersMessage';
import ExpertiseSection from '@/components/ExpertiseSection';
import KeyClient from '@/components/KeyClient';
import ProjectsSection from '@/components/ProjectsSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import BlogsSection from '@/components/BlogsSection';

export default function Home() {
  return (
    <main>
      {/* <div className="max-w-[1480px] mx-auto"> */}
      <HeroSection />
      <FoundersMessage />
      <ExpertiseSection />
      <KeyClient />
      <ProjectsSection />
      <FAQSection />
      <ContactSection />
      <BlogsSection />
    </main>
  );
}
