import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FiMenu, FiX, FiUsers, FiHome, FiLogIn, FiChevronLeft, FiChevronRight, FiLogOut } from 'react-icons/fi';

import Login from './pages/Login';
import StaffManagement from './pages/StaffManagement';
import StudentPage from './pages/StudentPage';
import Dashboard from './pages/Dashboard';
import AboutUs from './pages/AboutUs';
import OurTeam from './pages/OurTeam'; // ✅ ContactUs ki jagah OurTeam aaya

const classes = ['KG1', 'KG2', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];

function Sidebar({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-30 md:hidden" onClick={() => setIsOpen(false)}></div>
      )}

      <div className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 bg-blue-900 text-white transition-all duration-300 flex flex-col w-64 -translate-x-full md:relative md:top-0 md:h-screen md:translate-x-0 ${
          isOpen ? "translate-x-0" : ""
        } ${isCollapsed ? "md:w-20" : "md:w-64"}`}
      >
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="hidden md:flex absolute -right-3 top-8 bg-blue-700 hover:bg-blue-600 text-white rounded-full w-6 h-6 items-center justify-center shadow-md z-50">
          {isCollapsed ? <FiChevronRight size={16} /> : <FiChevronLeft size={16} />}
        </button>

        <div className={`p-6 border-b border-blue-800 transition-all ${isCollapsed ? "md:px-2 md:text-center" : ""}`}>
          {!isCollapsed && <h1 className="text-2xl font-bold">Admin Panel</h1>}
        </div>
        
        <nav className="mt-4 overflow-y-auto flex-1">
          <Link to="/" onClick={() => setIsOpen(false)} className={`flex items-center gap-4 px-6 py-3 hover:bg-blue-800 transition-colors text-gray-200 hover:text-white border-l-4 border-transparent hover:border-white ${isCollapsed ? "md:justify-center md:px-0" : ""}`}>
            <div className="w-6 text-center"><FiHome /></div>
            {!isCollapsed && <span className="text-sm font-medium">Dashboard</span>}
          </Link>
          
          <Link to="/staff" onClick={() => setIsOpen(false)} className={`flex items-center gap-4 px-6 py-3 hover:bg-blue-800 transition-colors text-gray-200 hover:text-white border-l-4 border-transparent hover:border-white ${isCollapsed ? "md:justify-center md:px-0" : ""}`}>
            <div className="w-6 text-center"><FiUsers /></div>
            {!isCollapsed && <span className="text-sm font-medium">Staff Record</span>}
          </Link>

          {!isCollapsed && (
            <div className="px-6 mt-6 mb-2 text-blue-400 uppercase text-xs font-bold tracking-wider">Classes</div>
          )}
          
          {classes.map((cls, index) => (
            <Link key={index} to={`/students/${cls}`} onClick={() => setIsOpen(false)} className={`flex items-center gap-4 px-6 py-3 hover:bg-blue-800 transition-colors text-gray-200 hover:text-white border-l-4 border-transparent hover:border-white ${isCollapsed ? "md:justify-center md:px-0" : ""}`}>
              <div className="w-6 text-center text-xs font-bold">{cls.replace('Class ', 'C')}</div>
              {!isCollapsed && <span className="text-sm font-medium">{cls}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

// function App() {
//   const [isOpen, setIsOpen] = useState(false); 
//   const [isCollapsed, setIsCollapsed] = useState(false); 
//   const [authorizedUser, setAuthorizedUser] = useState(null);

//   const handleLogout = () => {
//     setAuthorizedUser(null);
//     localStorage.removeItem('token');
//     setIsOpen(false);
//   };

function App() {
  const [isOpen, setIsOpen] = useState(false); 
  const [isCollapsed, setIsCollapsed] = useState(false); 
  
  // ✅ 1. REFRESH KE BAAD BHI USER RAHEGA (LocalStorage se check kar raha hai)
  const [authorizedUser, setAuthorizedUser] = useState(() => {
    const savedUser = localStorage.getItem('authorizedUser');
    return savedUser ? savedUser : null;
  });

  const handleLogout = () => {
    setAuthorizedUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('authorizedUser'); // Yeh line add ki
    setIsOpen(false);
  };



  return (
    <Router>
      <div className="min-h-screen bg-gray-100 font-sans flex flex-col overflow-x-hidden">
        
        {/* STICKY BLUE TOP NAVBAR */}
        <div className="fixed top-0 left-0 w-full h-16 bg-blue-900 text-white z-50 shadow-lg flex justify-between items-center px-4 md:px-6">
          <div className="flex items-center gap-4">
            {authorizedUser && (
              <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            )}
            <h1 className="text-xl md:text-2xl font-bold tracking-wide">🏫 APWA School System</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {authorizedUser ? (
              <div className="flex items-center gap-4 text-sm font-medium">
                <span className="hidden md:block text-blue-200 border border-blue-700 px-3 py-1 rounded-full">👤 {authorizedUser.split('@')[0]}</span>
                  <button onClick={handleLogout} className="bg-red-600 hover:bg-red-500 px-4 py-1.5 rounded-md transition flex items-center gap-2">
                  <FiLogOut size={16} /> <span className="hidden md:inline">Logout</span>
                </button>

              </div>
            ) : (
              /* ✅ PUBLIC TOP NAV LINKS (LOGIN KE BINA BHI DIKHENGE) */
              <div className="flex items-center gap-4 text-sm font-medium">
                <Link to="/" className="hover:text-blue-200 transition hidden sm:block">Home</Link>
                <Link to="/about" className="hover:text-blue-200 transition hidden sm:block">About</Link>
                <Link to="/our-team" className="hover:text-blue-200 transition hidden sm:block">Our Team</Link>
                <Link to="/login" className="bg-blue-700 hover:bg-blue-600 px-4 py-1.5 rounded-md transition">Admin Login</Link>
              </div>
            )}
          </div>
        </div>

        {/* BODY AREA */}
        <div className="flex flex-1 mt-16">
          {authorizedUser && (
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          )}

          <div className="flex-1 transition-all duration-300 h-[calc(100vh-4rem)] overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/about" element={<AboutUs />} />
              {/* ✅ OUR TEAM ROUTE ADD KIYA */}
              <Route path="/our-team" element={<OurTeam />} />
              
              <Route path="/login" element={<Login setAuthorizedUser={setAuthorizedUser} />} />
              <Route path="/staff" element={<StaffManagement />} />
              <Route path="/students/:className" element={<StudentPage />} />
            </Routes>
          </div>
        </div>

        {/* VIP FOOTER */}
        <footer className="bg-gray-900 text-gray-300 w-full mt-auto">
          <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white text-lg font-bold mb-3">🏫 APWA School</h3>
              <p className="text-sm leading-relaxed">Providing quality education and building the future of our nation. Discipline, Knowledge, and Morality.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                <li><Link to="/our-team" className="hover:text-white transition">Our Team</Link></li>
                <li><Link to="/login" className="hover:text-white transition">Staff Portal</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Contact Info</h4>
              <ul className="space-y-2 text-sm">
                <li>📍 123 School Street, City</li>
                <li>📞 +92 300 1234567</li>
                <li>✉️ info@apwaschool.edu.pk</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 text-center py-4 text-xs text-gray-500">
            © {new Date().getFullYear()} Hafiz Junaid Ahmed Ansari. All Rights Reserved.
          </div>
        </footer>

      </div>
    </Router>
  );
}

export default App;