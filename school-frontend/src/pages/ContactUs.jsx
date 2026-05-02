import React, { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: '', email: '', message: '' });
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
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="e.g. Ahmad Ali" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="email@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea rows="5" required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none" placeholder="Write your message here..."></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition shadow-md">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info & Map Placeholder */}
        <div className="space-y-8 h-fit">
          <div className="bg-white p-8 rounded-2xl shadow-md border space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Get in Touch</h2>
            
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full"><FiMapPin size={20} /></div>
              <div>
                <h4 className="font-semibold text-gray-800">Our Address</h4>
                <p className="text-gray-600 text-sm">123 Main Street, Block-C, Lahore, Pakistan</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-100 text-green-600 p-3 rounded-full"><FiPhone size={20} /></div>
              <div>
                <h4 className="font-semibold text-gray-800">Phone Numbers</h4>
                <p className="text-gray-600 text-sm">+92 300 1234567 (Principal)</p>
                <p className="text-gray-600 text-sm">+92 42 35678901 (Reception)</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-red-100 text-red-600 p-3 rounded-full"><FiMail size={20} /></div>
              <div>
                <h4 className="font-semibold text-gray-800">Email Address</h4>
                <p className="text-gray-600 text-sm">info@apwaschool.edu.pk</p>
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
          <div className="rounded-2xl overflow-hidden shadow-md border h-64 w-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
            📍 Google Map Embed Here
          </div>
        </div>

      </div>
    </div>
  );
}