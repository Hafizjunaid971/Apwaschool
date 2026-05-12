import React, { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiCheck } from 'react-icons/fi';
import axios from 'axios';
import { API_BASE_URL } from '../../config'; // ya './config' agar same folder mein hai

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);

    try {
      const res = await axios.post(`${API_BASE_URL}/contact`, form);
      if (res.data.success) {
        setIsSuccess(true);
        setForm({ name: '', phone: '', message: '' }); // Form clear kar do
        setTimeout(() => setIsSuccess(false), 5000); // 5 sec baad message hide
      }
    } catch (error) {
  console.log("Full Error Object: ", error);
  if (error.response) {
    // Backend ne error bheja hai (e.g., 400 ya 500)
    alert("Backend Error: " + error.response.data.message);
  } else if (error.request) {
    // Backend tak request hi nahi pahunchi (URL ya CORS issue)
    alert("Network Error: Backend se baat nahi ho rahi. Check Console (F12)");
  } else {
    // Kuch aur error
    alert("Error: " + error.message);
  }

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 pb-16">
      {/* Header Banner */}
      <div className="bg-blue-900 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contact Us</h1>
        <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
        <p className="mt-4 text-blue-200 max-w-2xl mx-auto">Have a question or feedback? We would love to hear from you.</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-12 grid md:grid-cols-2 gap-12">
        
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-md border h-fit">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
          
          {/* Success Alert */}
          {isSuccess && (
            <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6 flex items-center gap-2 border border-green-200 font-medium">
              <FiCheck size={20} /> Message sent successfully! We will contact you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                name="name"
                required 
                value={form.name} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
                placeholder="e.g. Hafiz junaid" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone / WhatsApp Number</label>
              <input 
                type="tel" 
                name="phone"
                required 
                value={form.phone} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
                placeholder="e.g. 0300-1234567" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
              <textarea 
                rows="5" 
                name="message"
                required 
                value={form.message} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none" 
                placeholder="Write your message here...">
              </textarea>
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-900 hover:bg-blue-800 disabled:bg-blue-400 text-white font-semibold py-3.5 rounded-lg transition shadow-md flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>Sending...</>
              ) : (
                <><FiSend /> Send Message</>
              )}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-8 h-fit">
          <div className="bg-white p-8 rounded-2xl shadow-md border space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Get in Touch</h2>
            
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full"><FiMapPin size={20} /></div>
              <div>
                <h4 className="font-semibold text-gray-800">Our Address</h4>
                <p className="text-gray-600 text-sm">5-E New Karachi, Karachi, Pakistan</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-100 text-green-600 p-3 rounded-full"><FiPhone size={20} /></div>
              <div>
                <h4 className="font-semibold text-gray-800">Phone Numbers</h4>
                <p className="text-gray-600 text-sm">+92 300 1234567</p>
                <p className="text-gray-600 text-sm">+92 312 9876543</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-red-100 text-red-600 p-3 rounded-full"><FiMail size={20} /></div>
              <div>
                <h4 className="font-semibold text-gray-800">Email Address</h4>
                <p className="text-gray-600 text-sm">gbpsapwa5e@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full"><FiClock size={20} /></div>
              <div>
                <h4 className="font-semibold text-gray-800">Office Hours</h4>
                <p className="text-gray-600 text-sm">Mon - Sat: 8:00 AM - 2:00 PM</p>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
                <div className="rounded-2xl overflow-hidden shadow-md border h-64 w-full">
        <iframe
          src="https://www.google.com/maps?q=24.8607,67.0011&z=15&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        ></iframe>
      </div>
        </div>

      </div>
    </div>
  );
}