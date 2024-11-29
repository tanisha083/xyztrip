import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Terms: React.FC = () => {
  return (
    <div className="font-poppins bg-gray-100">
      <Header />
      <main className="max-w-screen-lg mx-auto text-center my-10 px-4 sm:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Terms of Service</h2>
        <div className="text-lg text-gray-600 space-y-4 text-left">
          <p>Welcome to TripTailor! By accessing or using our app, you agree to the following terms:</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>Acceptance of Terms:</strong> By using TripTailor, you agree to comply with these terms. If you disagree with any part, you must discontinue use.
            </li>
            <li>
              <strong>Use of the Service:</strong>
              <ul className="list-disc list-inside ml-4">
                <li>You agree not to use the service for unlawful purposes.</li>
              </ul>
            </li>
            <li>
              <strong>Account Responsibility:</strong>
              <ul className="list-disc list-inside ml-4">
                <li>You are responsible for maintaining the confidentiality of your account.</li>
                <li>Notify us immediately of unauthorized use.</li>
              </ul>
            </li>
            <li>
              <strong>Content Ownership:</strong> All content provided by TripTailor is owned by us or our licensors. You may not duplicate, distribute, or sell our content without permission.
            </li>
            <li>
              <strong>Limitation of Liability:</strong> TripTailor is not liable for any inaccuracies in the travel itineraries or damages resulting from app use.
            </li>
            <li>
              <strong>Changes to Terms:</strong> We reserve the right to update these terms at any time. Continued use signifies acceptance of updated terms.
            </li>
          </ol>
          <p>For questions, contact us at triptailor.contact@gmail.com.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms; 