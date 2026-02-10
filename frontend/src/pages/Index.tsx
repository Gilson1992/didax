import { HeroSection } from '@/components/home/HeroSection';
import { ChallengesSection } from '@/components/home/ChallengesSection';
import { BeforeAfterSection } from '@/components/home/BeforeAfterSection';
import { SolutionsSection } from '@/components/home/SolutionsSection';
import { HowWeWorkSection } from '@/components/home/HowWeWorkSection';
import { SecuritySection } from '@/components/home/SecuritySection';
import { HomeFAQ } from '@/components/home/HomeFAQ';
import { HomeCTA } from '@/components/home/HomeCTA';

const Index = () => (
  <>
    <HeroSection />
    <ChallengesSection />
    <BeforeAfterSection />
    <SolutionsSection />
    <HowWeWorkSection />
    <SecuritySection />
    <HomeFAQ />
    <HomeCTA />
  </>
);

export default Index;
