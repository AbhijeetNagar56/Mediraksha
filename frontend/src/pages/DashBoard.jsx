import Navbar from "../components/Navbar";
import Footer from '../components/Footer'
import { useState } from "react";
import axiosInstance from '../api/axios'

export default function Dashboard() {
  
  return (
    <div className="p-6 space-y-6">
      <Navbar />
      <h1 className="text-3xl font-bold">Welcome to MediRaksha</h1>
      <p>your healthcare app</p>
      <Footer />
    </div>
  );
}


