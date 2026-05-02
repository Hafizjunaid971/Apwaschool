import React from 'react';

export default function AboutUs() {
  return (
    <div className="bg-gray-50 pb-16">
      {/* Header Banner */}
      <div className="bg-blue-900 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Our School</h1>
        <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
        <p className="mt-4 text-blue-200 max-w-2xl mx-auto">A legacy of quality education, character building, and community service.</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-12 space-y-16">
        
        {/* History & Mission */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <img src="https://placehold.co/600x400/f3f4f6/1e3a8a?text=School+History" alt="History" className="rounded-2xl shadow-lg w-full h-80 object-cover" />
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our History & Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Established in 1990, APWA School started with a small group of students and a big dream. Today, we are one of the most trusted educational institutions in the region.</p>
            <p className="text-gray-600 leading-relaxed">Our mission is to empower the youth with modern education combined with ethical values, ensuring they become positive contributors to society.</p>
          </div>
        </div>

        {/* Vision & Values */}
        <div className="grid md:grid-cols-2 gap-12 items-center bg-white p-8 rounded-2xl shadow-sm border">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision & Values</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start gap-3"><span className="text-blue-600 text-xl mt-1">✔</span> Academic Excellence through modern curriculum.</li>
              <li className="flex items-start gap-3"><span className="text-blue-600 text-xl mt-1">✔</span> Character building and moral education.</li>
              <li className="flex items-start gap-3"><span className="text-blue-600 text-xl mt-1">✔</span> Safe, inclusive, and supportive environment.</li>
              <li className="flex items-start gap-3"><span className="text-blue-600 text-xl mt-1">✔</span> Encouraging extracurricular activities (Sports, Art, Science).</li>
            </ul>
          </div>
          <img src="https://placehold.co/600x400/ecfdf5/065f46?text=Vision+&+Values" alt="Vision" className="rounded-2xl shadow-lg w-full h-80 object-cover order-1 md:order-2" />
        </div>

      </div>
    </div>
  );
}