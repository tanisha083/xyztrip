import React from 'react';
import Header from '../../components/Header/Header';
import MainBanner from '../../components/MainBanner/MainBanner';
import FeaturesSection from '../../components/FeaturesSection/FeaturesSection';
import Footer from '../../components/Footer/Footer';



const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <MainBanner />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
