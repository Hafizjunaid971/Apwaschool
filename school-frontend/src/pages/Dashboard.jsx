import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="p-6 md:p-10 bg-gray-50">
      
      {/* HERO SECTION */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl mb-10 h-[400px] md:h-[450px]">
        <img src="/img/apwa.jpg" alt="School Campus" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent flex flex-col justify-center px-10 md:px-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">Welcome to APWA School</h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-xl mb-8">Where every child's future is shaped with knowledge, discipline, and care.</p>
          <div>
            <Link to="/about" className="bg-white text-blue-900 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition shadow-lg">Discover More</Link>
          </div>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { title: "Total Students", value: "400+", icon: "👨‍🎓", color: "bg-blue-50 text-blue-800" },
          { title: "Qualified Teachers", value: "20+", icon: "👩‍🏫", color: "bg-green-50 text-green-800" },
          { title: "Classes (KG-5)", value: "7 Active", icon: "📚", color: "bg-purple-50 text-purple-800" },
          { title: "Years of Trust", value: "30+", icon: "🏆", color: "bg-yellow-50 text-yellow-800" }
        ].map((stat, i) => (
          <div key={i} className={`${stat.color} p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition`}>
            <div className="text-4xl">{stat.icon}</div>
            <div>
              <p className="text-sm font-medium opacity-80">{stat.title}</p>
              <h2 className="text-2xl font-bold">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* IMAGE GALLERY GRID */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">School Life Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="rounded-xl overflow-hidden shadow-md h-64">
          <img src="/img/s1.jpg" alt="Sports" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
        </div>
        <div className="rounded-xl overflow-hidden shadow-md h-64">
          <img src="/img/science.jpg" alt="Science" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
        </div>
        <div className="rounded-xl overflow-hidden shadow-md h-64">
          <img src="/img/clsss.jpg" alt="Classroom" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
        </div>
        <div className="rounded-xl overflow-hidden shadow-md h-64">
          <img src="/img/s2.jpg" alt="Sports" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
        </div>
        <div className="rounded-xl overflow-hidden shadow-md h-64">
          <img src="/img/s3.jpg" alt="Science" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
        </div>
        <div className="rounded-xl overflow-hidden shadow-md h-64">
          <img src="/img/parents1.jpg" alt="Classroom" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
        </div>
      </div>

      {/* PRINCIPAL MESSAGE PREVIEW */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
        <img src="/img/hm.jpg" alt="Principal" className="w-40 h-40 rounded-full object-cover border-4 border-blue-100 shadow-lg" />
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Message from Principal</h3>
          <p className="text-gray-600 leading-relaxed mb-4">"Education is the passport to the future, for tomorrow belongs to those who prepare for it today. At APWA, we strive to provide a nurturing environment where students can excel academically and grow into responsible citizens."</p>
          <Link to="/about" className="text-blue-600 font-semibold hover:underline">Read Full Profile →</Link>
        </div>
      </div>

    </div>
  );
}