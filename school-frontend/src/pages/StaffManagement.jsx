import { useState, useEffect, useRef } from 'react';
import { FiPlus, FiDownload, FiUpload, FiSearch, FiEdit2, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { API_BASE_URL } from '../../config'; // ya './config' agar same folder mein hai

export default function StaffManagement() {
  const [staff, setStaff] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  
  // Sab 11 fields yahan hain
  const [form, setForm] = useState({
    name: '', designation: '', schoolPlaceOfPosting: '', 
    ddoCode: '', semisCode: '', personalIdNo: '', contactNo: '', 
    emailAddress: '', bankAccountNo: '', talwka: '', district: ''
  });

  const fileInputRef = useRef(null);

  const fetchStaff = async () => {
  const res = await axios.get(`${API_BASE_URL}/staff`);
    setStaff(res.data.data);
  };

  useEffect(() => { fetchStaff(); }, []);

  // SEARCH FILTER
  const filteredStaff = staff.filter(s => 
    s.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.personalIdNo?.includes(searchQuery) ||
    s.contactNo?.includes(searchQuery)
  );

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm({ name: '', designation: '', schoolPlaceOfPosting: '', ddoCode: '', semisCode: '', personalIdNo: '', contactNo: '', emailAddress: '', bankAccountNo: '', talwka: '', district: '' });
    setEditMode(false);
    setEditId(null);
  };

  // SUBMIT (ADD & UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
    await axios.put(`${API_BASE_URL}/staff/${editId}`, form);
      alert("Staff Updated!");
    } else {
      // await axios.post('http://localhost:5000/api/staff', form);
      await axios.post(`${API_BASE_URL}/staff`, form);
      alert("Staff Added!");
    }
    resetForm();
    fetchStaff();
  };

  // EDIT BUTTON CLICK
  const handleEdit = (s) => {
    setForm({
      name: s.name, designation: s.designation, schoolPlaceOfPosting: s.schoolPlaceOfPosting,
      ddoCode: s.ddoCode, semisCode: s.semisCode, personalIdNo: s.personalIdNo, contactNo: s.contactNo,
      emailAddress: s.emailAddress, bankAccountNo: s.bankAccountNo, talwka: s.talwka, district: s.district
    });
    setEditMode(true);
    setEditId(s._id);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Form par le jayega
  };

  // DELETE BUTTON CLICK
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      // await axios.delete(`http://localhost:5000/api/staff/${id}`);
      await axios.delete(`${API_BASE_URL}/staff/${id}`);
      alert("Deleted!");
      fetchStaff();
    }
  };

  // EXPORT TO EXCEL
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(staff);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Staff");
    XLSX.writeFile(workbook, "Staff_Data.xlsx");
  };

  // IMPORT FROM EXCEL
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(ws, { range: 2 }); 
        if (data.length === 0) return alert("No data found!");
        // const res = await axios.post('http://localhost:5000/api/staff/import', data);
        await axios.post(`${API_BASE_URL}/staff/import`, data);
        alert(res.data.message);
        fetchStaff();
      } catch (error) {
        alert("Import Error: " + (error.response?.data?.message || error.message));
      }
    };
    reader.readAsBinaryString(file);
    e.target.value = "";
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      
      {/* TOP BAR: Title, Search, Buttons */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800 whitespace-nowrap">
          {editMode ? 'Update Staff Record' : 'Staff Records'}
        </h1>
        
        <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
          {/* Search Box */}
          <div className="relative flex-1 lg:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by Name, ID, Contact..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          
          <div className="flex gap-2">
            <button onClick={() => fileInputRef.current.click()} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-xl font-semibold shadow-md text-sm">
              <FiUpload /> Import
            </button>
            <button onClick={exportToExcel} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl font-semibold shadow-md text-sm">
              <FiDownload /> Export
            </button>
            <input type="file" accept=".xlsx, .xls" ref={fileInputRef} onChange={handleImport} className="hidden" />
          </div>
        </div>
      </div>

      {/* FORM: 11 Fields */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <input type="text" name="name" placeholder="Full Name *" required value={form.name} onChange={handleChange} className="border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" />
        <input type="text" name="designation" placeholder="Designation *" required value={form.designation} onChange={handleChange} className="border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" />
        <input type="text" name="personalIdNo" placeholder="Personal ID No (CNIC) *" required value={form.personalIdNo} onChange={handleChange} className="border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" />
        <input type="text" name="contactNo" placeholder="Contact No" value={form.contactNo} onChange={handleChange} className="border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" />
        <input type="text" name="emailAddress" placeholder="Email Address" value={form.emailAddress} onChange={handleChange} className="border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" />
        <input type="text" name="schoolPlaceOfPosting" placeholder="School / Place" value={form.schoolPlaceOfPosting} onChange={handleChange} className="border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" />
        <input type="text" name="ddoCode" placeholder="DDO Code" value={form.ddoCode} onChange={handleChange} className="border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" />
        <input type="text" name="semisCode" placeholder="SEMIS Code" value={form.semisCode} onChange={handleChange} className="border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" />
        <input type="text" name="bankAccountNo" placeholder="Bank Account No" value={form.bankAccountNo} onChange={handleChange} className="border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" />
        <input type="text" name="talwka" placeholder="Talwka" value={form.talwka} onChange={handleChange} className="border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" />
        <input type="text" name="district" placeholder="District" value={form.district} onChange={handleChange} className="border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" />
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button type="submit" className={`flex-1 flex items-center justify-center gap-2 text-white rounded-lg py-2.5 font-semibold ${editMode ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
            {editMode ? <><FiEdit2 size={18}/> Update</> : <><FiPlus size={18}/> Add Staff</>}
          </button>
          {editMode && (
            <button type="button" onClick={resetForm} className="px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* TABLE: Overlap fix ke liye block lg:overflow-x-auto use kiya hai */}
           {/* STAFF TABLE - COMPACT & ALIGNED */}
          {/* STAFF TABLE - ZERO PADDING */}
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full min-w-[1300px] text-left text-xs text-gray-600">
          <thead className="bg-gray-50 text-gray-700 uppercase tracking-wider border-b">
            <tr>
              <th className="px-1 py-2 text-left">Name</th>
              <th className="px-1 py-2 text-left">Designation</th>
              <th className="px-1 py-2 text-left">ID No</th>
              <th className="px-1 py-2 text-left">Contact</th>
              <th className="px-1 py-2 text-left">Email</th>
              <th className="px-1 py-2 text-left">School</th>
              <th className="px-1 py-2 text-left">DDO</th>
              <th className="px-1 py-2 text-left">SEMIS</th>
              <th className="px-1 py-2 text-left">Bank Acc</th>
              <th className="px-1 py-2 text-left">Talwka</th>
              <th className="px-1 py-2 text-left">District</th>
              <th className="px-1 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredStaff.length === 0 ? (
              <tr><td colSpan="12" className="text-center py-10 text-gray-400">No Data Found</td></tr>
            ) : (
              filteredStaff.map((s) => (
                <tr key={s._id} className="hover:bg-gray-50">
                  <td className="px-1 py-1.5 font-medium text-gray-800 whitespace-nowrap">{s.name}</td>
                  <td className="px-1 py-1.5 whitespace-nowrap">{s.designation}</td>
                  <td className="px-1 py-1.5 whitespace-nowrap">{s.personalIdNo}</td>
                  <td className="px-1 py-1.5 whitespace-nowrap">{s.contactNo}</td>
                  <td className="px-1 py-1.5 whitespace-nowrap">{s.emailAddress}</td>
                  <td className="px-1 py-1.5 whitespace-nowrap">{s.schoolPlaceOfPosting}</td>
                  <td className="px-1 py-1.5 whitespace-nowrap">{s.ddoCode}</td>
                  <td className="px-1 py-1.5 whitespace-nowrap">{s.semisCode}</td>
                  <td className="px-1 py-1.5 whitespace-nowrap">{s.bankAccountNo}</td>
                  <td className="px-1 py-1.5 whitespace-nowrap">{s.talwka}</td>
                  <td className="px-1 py-1.5 whitespace-nowrap">{s.district}</td>
                  <td className="px-1 py-1.5 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => handleEdit(s)} className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"><FiEdit2 size={14}/> Edit</button>
                      <button onClick={() => handleDelete(s._id)} className="text-red-600 hover:text-red-800 font-semibold flex items-center gap-1"><FiTrash2 size={14}/> Del</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}