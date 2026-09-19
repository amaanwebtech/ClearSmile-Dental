import VideoBackground from '../components/home/VideoBackground';
import HeroContent from '../components/home/HeroContent';
import WhyChooseUs from '../components/home/WhyChooseUs';
import ServicesPreview from '../components/home/ServicesPreview';
import DoctorsPreview from '../components/home/DoctorsPreview';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';

const Home = () => {
  return (
    <>
      <VideoBackground />
      <div className="relative z-10">
        <HeroContent />
        <WhyChooseUs />
        <ServicesPreview />
        <DoctorsPreview />
        <TestimonialsSection />
        <CTASection />
      </div>
    </>
  );
};

export default Home;
