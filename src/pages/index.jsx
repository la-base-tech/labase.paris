import React from 'react';
import HeaderSection from '../components/home-sections/HeaderSection';
import WhatIsBaseSection from '../components/home-sections/WhatIsBaseSection';
import ForWhatSection from '../components/home-sections/ForWhatSection';
import EventSection from '../components/home-sections/EventSection';
import ActionSection from '../components/home-sections/ActionSection';
import WhoSection from '../components/home-sections/WhoSection';

const IndexPage = () => (
  <div>
    <HeaderSection />
    <WhatIsBaseSection />
    <ForWhatSection />
    <EventSection />
    <ActionSection />
    <WhoSection />
  </div>
);

export default IndexPage;
