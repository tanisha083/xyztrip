import React from 'react';
import Header from '../../components/Header/Header';
import MainBanner from '../../components/MainBanner/MainBanner';
import FeaturesSection from '../../components/FeaturesSection/FeaturesSection';
import Footer from '../../components/Footer/Footer';
import { User } from 'firebase/auth';

interface HomeProps {
  user: User | null;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  return (
    <div>
      <Header user={user} />
      <main>
        <MainBanner />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
