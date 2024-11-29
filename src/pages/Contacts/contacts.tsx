import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';


const Contact: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-screen-lg w-full px-4 sm:px-8 text-center my-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Contact Us</h2>
        <p className="text-lg text-gray-600 mb-8">
          If you have any questions or feedback, feel free to get in touch!
        </p>
        <p className="text-lg text-gray-600 mb-8">
          Email us at: <a href="mailto:triptailor.contact@gmail.com" className="text-[#FF5733] hover:underline">triptailor.contact@gmail.com</a>
        </p>
        <form className="flex flex-col gap-5 w-full max-w-lg mx-auto">
          <input 
            type="text" 
            placeholder="Your Name" 
            required 
            className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-[#FF5733] outline-none transition-all" 
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            required 
            className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-[#FF5733] outline-none transition-all" 
          />
          <textarea 
            placeholder="Your Message" 
            rows={5} 
            required 
            className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-[#FF5733] outline-none transition-all resize-none"
          ></textarea>
          <button 
            type="submit" 
            className="p-4 bg-[#FF5733] text-white rounded-lg font-semibold shadow-lg hover:bg-[#FF7849] transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Send Message
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;