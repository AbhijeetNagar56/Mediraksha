import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function UploadReport() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert('Please select a file first');

    const formData = new FormData();
    formData.append('report', file);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage(res.data.message);
    } catch (error) {
      console.error(error);
      setMessage('Upload failed');
    }
  };

  return (
    <>
    <Navbar />
    <div className="card bg-base-200 p-4 shadow-md mt-50">
      <h2 className="text-xl font-semibold mb-4">Upload Medical Report</h2>
      <input onChange={(e) => setFile(e.target.value)} type="file" className="file-input file-input-bordered w-full" />
      <button className="btn btn-primary mt-4" onClick={handleUpload}>Upload</button>
      {message}
    </div>
    <Footer />
    </>
  );
}


