import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function UploadReport() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);

  // Get token from localStorage
  const token = localStorage.getItem('token');

  // Fetch uploaded files
  const fetchFiles = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/dashBoard/files', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFiles(res.data);
    } catch (error) {
      console.error(error);
      setFiles([]);
    }
  };

  useEffect(() => {
    if (token) {
      fetchFiles();
    }
  }, [token]);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert('Please select a file first');

    const formData = new FormData();
    formData.append('report', file);

    try {
      const res = await axios.post(
        'http://localhost:5000/api/dashBoard/upload',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setMessage(res.data.msg);
      setFile(null);
      fetchFiles(); // refresh file list
    } catch (error) {
      console.error(error);
      setMessage('Upload failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="card bg-base-200 p-4 shadow-md mt-30">
        <h2 className="text-xl font-semibold mb-4">Upload Medical Report</h2>
        <input
          onChange={handleFileChange}
          type="file"
          className="file-input file-input-bordered w-full"
        />
        <button className="btn btn-primary mt-4" onClick={handleUpload}>
          Upload
        </button>
        {message && <p className="mt-2 text-green-600">{message}</p>}

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Uploaded Files</h3>
          {files.length > 0 ? (
            <ul className="list-disc pl-5">
              {files.map((f) => (
                <li key={f._id} className="mb-2">
                  <a
                    href={`http://localhost:5000/api/dashBoard/file/${f._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {f.filename}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No files uploaded yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
