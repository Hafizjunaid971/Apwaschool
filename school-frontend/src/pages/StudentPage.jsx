import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FiPlus, FiDownload, FiUpload, FiSearch, FiEdit2, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { API_BASE_URL } from '../../config'; // ya './config' agar same folder mein hai

export default function StudentPage() {
  const { className } = useParams();
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const fileInputRef = useRef(null);

  // Sab 16 Fields
  const emptyForm = { 
    grNo: '', studentName: '', fatherName: '', gender: '', studentBForm: '', dob: '', 
    religion: '', doa: '', fatherMotherName: '', guardianCnic: '', relationWith: '', 
    contactNumber: '', disability: '', vaccinated: '', remarks: '' 
  };
  const [form, setForm] = useState(emptyForm);

  const fetchStudents = async () => {
    // const res = await axios.get(`http://localhost:5000/api/students?className=${className}`);
    const res = await axios.get(`${API_BASE_URL}/students?className=${className}`);

    setStudents(res.data.data);
  };

  useEffect(() => { fetchStudents(); }, [className]);

  const filteredStudents = students.filter(s => 
    s.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.grNo?.includes(searchQuery) || s.guardianCnic?.includes(searchQuery)
  );

  const resetForm = () => { setForm(emptyForm); setEditMode(false); setEditId(null); };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      // await axios.put(`http://localhost:5000/api/students/${editId}`, form);
      await axios.put(`${API_BASE_URL}/students/${editId}`, form);

      alert("Student Updated!");
    } else {
      // await axios.post('http://localhost:5000/api/students', { ...form, className });
    await axios.post(`${API_BASE_URL}/students`, { ...form, className });
      alert("Student Added!");
    }
    resetForm(); fetchStudents();
  };

  const handleEdit = (s) => {
    setForm({ 
      grNo: s.grNo, studentName: s.studentName, fatherName: s.fatherName, gender: s.gender, 
      studentBForm: s.studentBForm, dob: s.dob, religion: s.religion, doa: s.doa, 
      fatherMotherName: s.fatherMotherName, guardianCnic: s.guardianCnic, relationWith: s.relationWith, 
      contactNumber: s.contactNumber, disability: s.disability, vaccinated: s.vaccinated, remarks: s.remarks 
    });
    setEditMode(true); setEditId(s._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this student record?")) {
      await axios.delete(`${API_BASE_URL}/students/${id}`);
     fetchStudents();
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, className);
    XLSX.writeFile(workbook, `${className}_Students.xlsx`);
  };


const handleImport = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        
        // raw: false dates ko string mein convert karega
        const rawData = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, dateNF: 'dd-mm-yyyy' });
        
        let headerIndex = -1;
        for (let i = 0; i < rawData.length; i++) {
          if (rawData[i] && rawData[i].includes("GR#")) { headerIndex = i; break; }
        }
        if (headerIndex === -1) return alert("Excel mein 'GR#' column nahi mila.");

        const headers = rawData[headerIndex];
        
        // TOOTE HUE HEADERS KO DHOONDHNE KA LOGIC
        const dobIdx = headers.findIndex(h => String(h).includes("Date of Birth"));
        const doaIdx = headers.findIndex(h => String(h).includes("Date of Admission"));
        const relIdx = headers.findIndex(h => String(h).trim() === "Relation"); // "Relation with" alag hai isliye sirf "Relation" dhundha

        // ✅ NAYE HEADERS DHOUNDHO
        const cnicIdx = headers.findIndex(h => String(h).includes("Father/Mother's CNIC"));
        const rwgIdx = headers.findIndex(h => String(h).includes("Relation with Guardian"));

        const dataRows = rawData.slice(headerIndex + 1).filter(row => row.length > 0 && row.some(cell => cell != null && String(cell).trim() !== ""));

        const jsonData = dataRows.map(row => {
          let obj = {};
          headers.forEach((header, index) => { 
            if (header && String(header).trim() !== "") {
              obj[String(header).trim()] = row[index] !== undefined ? row[index] : ""; 
            }
          });

          // 1. DOB KO JORNA (DD-MM-YY)
          if (dobIdx !== -1) {
             const dd = row[dobIdx] || "";
             const mm = row[dobIdx + 1] || "";
             const yy = row[dobIdx + 2] || "";
             obj["Date of Birth (DD/MM/YY)"] = `${dd}-${mm}-${yy}`;
          }

          // 2. DOA KO JORNA (DD-MM-YY)
          if (doaIdx !== -1) {
             const dd = row[doaIdx] || "";
             const mm = row[doaIdx + 1] || "";
             const yy = row[doaIdx + 2] || "";
             obj["Date of Admission (DD/MM/YY)"] = `${dd}-${mm}-${yy}`;
          }

          // 3. RELATION WITH KO JORNA
          if (relIdx !== -1) {
             obj["Relation with"] = row[relIdx + 1] !== undefined ? row[relIdx + 1] : "";
          }

          // ✅ 4. FATHER/MOTHER'S CNIC KO ALAG ALAG KARNA
          if (cnicIdx !== -1) {
             const fatherCnic = row[cnicIdx] !== undefined ? row[cnicIdx] : "";
             const motherCnic = row[cnicIdx + 1] !== undefined ? row[cnicIdx + 1] : "";
             obj["Father's CNIC"] = fatherCnic;
             obj["Mother's CNIC"] = motherCnic;
          }

          // ✅ 5. RELATION WITH GUARDIAN KO JORNA
          // ✅ 5. RELATION WITH GUARDIAN — rwgIdx + 1 HATA KE rwgIdx KIYA
          if (rwgIdx !== -1) {
             obj["Relation with Guardian"] = row[rwgIdx] !== undefined ? row[rwgIdx] : "";
          }
          
          return obj;
        });

        if (jsonData.length === 0) return alert("No data found!");
        
        // Backend ko bhej diya
        // const res = await axios.post('http://localhost:5000/api/students/import', jsonData);
        await axios.post(`${API_BASE_URL}/students/import`, jsonData);
        alert(res.data.message); 
        fetchStudents();
      } catch (error) {
        alert("Import Error: " + (error.response?.data?.message || error.message));
      }
    };
    reader.readAsBinaryString(file); 
    e.target.value = ""; 
  };
  return (
    <div className="p-2 md:p-4 space-y-4">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800 whitespace-nowrap">Class: {className}</h1>
        <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
          <div className="relative flex-1 lg:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div className="flex gap-2">
            <button onClick={() => fileInputRef.current.click()} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-xl font-semibold shadow-md text-sm"><FiUpload /> Import All</button>
            <button onClick={exportToExcel} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl font-semibold shadow-md text-sm"><FiDownload /> Export</button>
            <input type="file" accept=".xlsx, .xls" ref={fileInputRef} onChange={handleImport} className="hidden" />
          </div>
        </div>
      </div>

      {/* FORM - 16 FIELDS */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-sm border grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <input type="text" name="grNo" placeholder="GR Number *" required value={form.grNo} onChange={handleChange} className="border rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none" />
        <input type="text" name="studentName" placeholder="Student Name *" required value={form.studentName} onChange={handleChange} className="border rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none" />
        <input type="text" name="fatherName" placeholder="Father Name *" required value={form.fatherName} onChange={handleChange} className="border rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none" />
        <select name="gender" value={form.gender} onChange={handleChange} className="border rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none bg-white">
            <option value="">Gender</option><option>Male</option><option>Female</option>
        </select>
        <input type="text" name="studentBForm" placeholder="Student's B-Form" value={form.studentBForm} onChange={handleChange} className="border rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none" />
        <input type="date" name="dob" value={form.dob} onChange={handleChange} className="border rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none" />
        <input type="text" name="religion" placeholder="Religion" value={form.religion} onChange={handleChange} className="border rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none" />
        <input type="date" name="doa" value={form.doa} onChange={handleChange} className="border rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none" />        <input type="text" name="fatherMotherName" placeholder="Father/Mother Name" value={form.fatherMotherName} onChange={handleChange} className="border rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none" />
        <input type="text" name="guardianCnic" placeholder="Guardian CNIC" value={form.guardianCnic} onChange={handleChange} className="border rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none" />
        <input type="text" name="relationWith" placeholder="Relation with" value={form.relationWith} onChange={handleChange} className="border rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none" />
        <input type="text" name="contactNumber" placeholder="Contact Number" value={form.contactNumber} onChange={handleChange} className="border rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none" />
        <input type="text" name="disability" placeholder="Disability if Any" value={form.disability} onChange={handleChange} className="border rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none" />
        <select name="vaccinated" value={form.vaccinated} onChange={handleChange} className="border rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none bg-white">
            <option value="">Vaccinated?</option><option>Yes</option><option>No</option>
        </select>
        <input type="text" name="remarks" placeholder="Remarks" value={form.remarks} onChange={handleChange} className="border rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none" />
        
        <div className="flex gap-2 col-span-full mt-2">
          <button type="submit" className={`flex-1 flex items-center justify-center gap-2 text-white rounded-lg py-2 text-sm font-semibold ${editMode ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
            {editMode ? <><FiEdit2 size={16}/> Update</> : <><FiPlus size={16}/> Add Student</>}
          </button>
          {editMode && <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold text-sm">Cancel</button>}
        </div>
      </form>

      {/* TABLE - EXACT 16 COLUMNS */}
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full min-w-[1500px] text-left text-xs text-gray-600">
          <thead className="bg-gray-50 text-gray-700 uppercase tracking-wider border-b">
            <tr>
              <th className="px-1 py-2">GR#</th>
              <th className="px-1 py-2">Name</th>
              <th className="px-1 py-2">Father</th>
              <th className="px-1 py-2">Gender</th>
              <th className="px-1 py-2">B-Form</th>
              <th className="px-1 py-2">DOB</th>
              <th className="px-1 py-2">Religion</th>
              <th className="px-1 py-2">Adm Date</th>
              <th className="px-1 py-2">F/M CNIC</th>
              <th className="px-1 py-2">Guardian Name</th>
              <th className="px-1 py-2">Guardian CNIC</th>
              <th className="px-1 py-2">Relation With Guardian</th>
              <th className="px-1 py-2">Contact</th>
              <th className="px-1 py-2">Disability</th>
              <th className="px-1 py-2">Vaccinated</th>
              <th className="px-1 py-2">Remarks</th>
              <th className="px-1 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredStudents.length === 0 ? <tr><td colSpan="16" className="text-center py-10 text-gray-400">No Students in {className}</td></tr> : 
            filteredStudents.map((s) => (
              <tr key={s._id} className="hover:bg-gray-50">
                <td className="px-1 py-1.5 whitespace-nowrap">{s.grNo}</td>
                <td className="px-1 py-1.5 whitespace-nowrap font-medium">{s.studentName}</td>
                <td className="px-1 py-1.5 whitespace-nowrap">{s.fatherName}</td>
                <td className="px-1 py-1.5 whitespace-nowrap">{s.gender}</td>
                <td className="px-1 py-1.5 whitespace-nowrap">{s.studentBForm}</td>
                <td className="px-1 py-1.5 whitespace-nowrap">{s.dob}</td>
                <td className="px-1 py-1.5 whitespace-nowrap">{s.religion}</td>
                <td className="px-1 py-1.5 whitespace-nowrap">{s.doa}</td>
                <td className="px-1 py-1.5 whitespace-nowrap">{s.fatherMotherName}</td>
                <td className="px-1 py-1.5 whitespace-nowrap">{s.guardianName}</td>
                <td className="px-1 py-1.5 whitespace-nowrap">{s.guardianCnic}</td>
                <td className="px-1 py-1.5 whitespace-nowrap">{s.relationWith}</td>
                <td className="px-1 py-1.5 whitespace-nowrap">{s.contactNumber}</td>
                <td className="px-1 py-1.5 whitespace-nowrap">{s.disability}</td>
                <td className="px-1 py-1.5 whitespace-nowrap">{s.vaccinated}</td>
                <td className="px-1 py-1.5 whitespace-nowrap">{s.remarks}</td>
                <td className="px-1 py-1.5 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => handleEdit(s)} className="text-blue-600 hover:text-blue-800"><FiEdit2 size={14}/></button>
                    <button onClick={() => handleDelete(s._id)} className="text-red-600 hover:text-red-800"><FiTrash2 size={14}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}