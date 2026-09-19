import ScrollVideoHero from '../components/home/ScrollVideoHero';
import WhyChooseUs from '../components/home/WhyChooseUs';
import ServicesPreview from '../components/home/ServicesPreview';
import DoctorsPreview from '../components/home/DoctorsPreview';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';

const Home = () => {
  return (
    <>
      <ScrollVideoHero />
      <WhyChooseUs />
      <ServicesPreview />
      <DoctorsPreview />
      <TestimonialsSection />
      <CTASection />
    </>
  );
};

export default Home;
