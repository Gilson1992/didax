import { SiducHero } from '@/components/siduc/SiducHero';
import { ModuleExplorer } from '@/components/siduc/ModuleExplorer';
import { PersonaTabs } from '@/components/siduc/PersonaTabs';
import { FlowDiagrams } from '@/components/siduc/FlowDiagrams';
import { SiducFAQ } from '@/components/siduc/SiducFAQ';
import { SiducCTA } from '@/components/siduc/SiducCTA';

const Siduc = () => (
  <>
    <SiducHero />
    <ModuleExplorer />
    <PersonaTabs />
    <FlowDiagrams />
    <SiducFAQ />
    <SiducCTA />
  </>
);

export default Siduc;
