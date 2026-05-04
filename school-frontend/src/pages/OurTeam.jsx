import React, { useState, useEffect } from 'react';
import { FiMail, FiPhone, FiChevronDown, FiChevronUp } from 'react-icons/fi';

export default function OurTeam() {
  const [staffData, setStaffData] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null); // ✅ Yeh track karega kon sa card open hai

  useEffect(() => {
    setStaffData([
      { 
        name: "Fouzia Malik", 
        role: "HM & DDO KQ0903", 
        phone: "0312-9876543", 
        email: "fouziamalik@gmail.com", 
        img: "https://placehold.co/300x300/ec4899/ffffff?text=Fouzia+Malik",
        bio: "Mrs. Fouzia Malik is the backbone of our academic planning. With over 15 years of experience in educational administration, she ensures that the curriculum is delivered effectively. She actively monitors student progress and works closely with teachers to maintain the highest standards of education in the school."
      },
      { 
        name: "Hafiz Junaid Ahmed", 
        role: "Principal & IT Admin", 
        phone: "0300-1234567", 
        email: "hafizjunaid971@gmail.com", 
        img: "https://placehold.co/300x300/1e3a8a/ffffff?text=Hafiz+Junaid",
        bio: "Hafiz Junaid Ahmed leads the school with a vision of integrating modern technology with traditional moral values. As the Principal and IT Admin, he has transformed the school's digital infrastructure, introducing modern management systems to keep everything transparent and efficient."
      },
      { 
        name: "Noman Khan", 
        role: "Mathematics Teacher", 
        phone: "0333-1112233", 
        email: "nomankhan@gmail.com", 
        img: "https://placehold.co/300x300/22c55e/ffffff?text=Noman+Khan",
        bio: "My name is Noman Khan, and I am a dedicated primary school teacher currently serving at APWA 5-E New Karachi. With a deep passion for nurturing young minds, I specialize in teaching Science and Social Studies (SST). My goal is to transform the classroom into a space of discovery—whether we are exploring the biological wonders of the natural world or understanding the history and geography that shape our society. At APWA, I am committed to providing my students with a strong academic foundation"
      },
      { 
        name: "Salman Ahmed", 
        role: "English Teacher", 
        phone: "0345-4445566", 
        email: "salmanapwa@gmail.com", 
        img: "https://placehold.co/300x300/3b82f6/ffffff?text=Salman+Ahmed",
        bio: "Mr. Salman Ahmed specializes in English language and literature. He focuses on enhancing students' communication skills, grammar, and vocabulary. Through debates, speeches, and creative writing sessions, he prepares students to express themselves confidently in the real world."
      },
      
      { 
        name: "Arif Azeem", 
        role: "Junior Section Head", 
        phone: "0302-9988776", 
        email: "ARIFAZEEM@gmail.com", 
        img: "https://placehold.co/300x300/14b8a6/ffffff?text=Arif+azeem",
        bio: "MR, aRIF aZEEM is known for her immense patience and love for early childhood education. She oversees the KG and early primary classes, ensuring that the youngest students feel safe, loved, and excited to learn. She builds a strong foundation for their future academic journey."
      },
      { 
        name: "Zulfiqar Ali", 
        role: "Science Teacher", 
        phone: "0321-1122334", 
        email: "zulfiqarapwa@gmail.com", 
        img: "https://placehold.co/300x300/ef4444/ffffff?text=Zulfiqar+Ali",
        bio: "Mr. Syed Zulfiqar brings science to life through practical experiments and hands-on activities. He encourages students to ask questions and explore the world around them. His dedication to STEM education has inspired many students to participate in science fairs."
      },
      { 
        name: "Neelam Shokat", 
        role: "Arts Teacher", 
        phone: "0334-5566778", 
        email: "neelamshokat@gmail.com", 
        img: "https://placehold.co/300x300/8b5cf6/ffffff?text=Neelam+Shokat",
        bio: "Ms. Neelam Shokat nurtures the creative talents of our students. From drawing and painting to calligraphy and crafts, she provides a platform for students to express their imagination. Her artwork decorations during school events are always highly praised by parents."
      },
      { 
        name: "Fariha Naqwi", 
        role: "Junior Section Head", 
        phone: "0302-9988776", 
        email: "farihanaqwi@gmail.com", 
        img: "https://placehold.co/300x300/14b8a6/ffffff?text=Fariha+Naqwi",
        bio: "Ms. Fariha Naqwi is known for her immense patience and love for early childhood education. She oversees the KG and early primary classes, ensuring that the youngest students feel safe, loved, and excited to learn. She builds a strong foundation for their future academic journey."
      },
      { 
        name: "Imranshaikh", 
        role: "Staff Cordinator", 
        phone: "0301-7788990", 
        email: "imranshaikh@gmail.com", 
        img: "https://placehold.co/300x300/f59e0b/ffffff?text=Imran+Shaikh",
        bio: "Mr. Imran Shaikh brings science to life through practical experiments and hands-on activities. He encourages students to ask questions and explore the world around them. His dedication to STEM education has inspired many students to participate in science fairs."
      },
      { 
        name: "Idress", 
        role: "Staff Cordinator", 
        phone: "0301-7788990", 
        email: "Idress@gmail.com", 
        img: "https://placehold.co/300x300/f59e0b/ffffff?text=Idress+Dall",
        bio: "Mr. idress brings science to life through practical experiments and hands-on activities. He encourages students to ask questions and explore the world around them. His dedication to STEM education has inspired many students to participate in science fairs."
      },
      { 
        name: "Ayoub", 
        role: "Staff Cordinator", 
        phone: "0301-7788990", 
        email: "Ayoub@gmail.com", 
        img: "https://placehold.co/300x300/f59e0b/ffffff?text=Idress+Dall",
        bio: "Mr. Ayoub brings science to life through practical experiments and hands-on activities. He encourages students to ask questions and explore the world around them. His dedication to STEM education has inspired many students to participate in science fairs."
      },
    ]);
  }, []);

  return (
    <div className="bg-gray-50 pb-16">
      {/* Header Banner */}
      <div className="bg-blue-900 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Dedicated Team</h1>
        <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
        <p className="mt-4 text-blue-200 max-w-2xl mx-auto">Meet the hardworking individuals who shape the future of our students every day.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {staffData.map((member, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
              
              {/* Picture Area */}
              <div className="relative h-56 overflow-hidden bg-blue-50">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">{member.role}</span>
                </div>
              </div>

              {/* Details Area */}
              <div className="p-5 text-center flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{member.name}</h3>
                
                {/* ✅ DESCRIPTION AREA (Read More Logic) */}
                <div className="text-left mb-4 flex-grow">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {/* Agar card expanded hai toh pura bio dikhao, warna sirf 100 characters */}
                    {expandedCard === index 
                      ? member.bio 
                      : `${member.bio.substring(0, 100)}...`
                    }
                  </p>
                  
                  {/* Read More / Show Less Button */}
                  <button 
                    onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                    className="text-blue-600 text-xs font-semibold mt-2 hover:underline flex items-center gap-1"
                  >
                    {expandedCard === index ? (
                      <>Show Less <FiChevronUp size={12} /></>
                    ) : (
                      <>Read Full Profile <FiChevronDown size={12} /></>
                    )}
                  </button>
                </div>

                {/* Contact Details (Always at bottom) */}
                <div className="space-y-2 text-sm text-gray-600 mt-auto border-t pt-4">
                  <div className="flex items-center justify-center gap-2 bg-gray-50 p-2 rounded-lg">
                    <FiPhone className="text-green-600" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 bg-gray-50 p-2 rounded-lg">
                    <FiMail className="text-blue-600" />
                    <span className="truncate">{member.email}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}