import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Privacy: React.FC = () => {
  return (
    <div className="font-poppins bg-gray-100">
      <Header />
      <main className="max-w-screen-lg mx-auto text-center my-10 px-4 sm:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Privacy Policy</h2>
        <div className="text-lg text-gray-600 space-y-4 text-left">
          <p>TripTailor values your privacy. This policy explains how we collect, use, and protect your information.</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>Information We Collect:</strong>
              <ul className="list-disc list-inside ml-4">
                <li><strong>Personal Information:</strong> Name, email, and preferences provided during sign-up or itinerary creation.</li>
                <li><strong>Usage Data:</strong> Device details, IP address, and app usage patterns for improving services.</li>
              </ul>
            </li>
            <li>
              <strong>How We Use Your Information:</strong>
              <ul className="list-disc list-inside ml-4">
                <li>To personalize travel itineraries and improve your user experience.</li>
                <li>To communicate updates or promotions (with consent).</li>
              </ul>
            </li>
            <li>
              <strong>Sharing Your Information:</strong> We do not sell your data. Your information may be shared with third-party service providers (e.g., payment processors) only as necessary.
            </li>
            <li>
              <strong>Data Security:</strong> We implement encryption and access controls to protect your data. However, no method of transmission is 100% secure.
            </li>
            <li>
              <strong>Your Rights:</strong> Access, update, or delete your personal information at any time. Opt-out of non-essential communications.
            </li>
            <li>
              <strong>Cookies:</strong> TripTailor uses cookies to improve functionality and analyze app usage.
            </li>
            <li>
              <strong>Changes to Privacy Policy:</strong> We reserve the right to modify this policy. Notice of significant changes will be posted.
            </li>
          </ol>
          <p>For any privacy concerns, contact us at triptailor.contact@gmail.com.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy; 