import { Route, Routes } from 'react-router';
import Dashboard from './pages/DashBoard';
import Auth from './pages/Auth';
import About from "./pages/About";
import Upload from './components/Upload'
import MyDetail from './components/MyDet';
import DetailConfirmation from './pages/DetailConfirmation'
import Scheduling from './pages/Scheduling';
import Availability from './components/Availability';
import ResourceAllocation from './components/ResourceAllocation';
import Map from './components/MapComponent'
import HealthSummary from './components/HealthSummary';
import { useState, useEffect } from "react";
import logo from './assets/logo.png'


const SplashScreen = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-base-100 z-[9999] p-8">
    <style>
      {`
            /* Define the Keyframes for the zoom-out and fade effect */
            @keyframes logo-zoom-out {
                0% { transform: scale(1.5); opacity: 1; }
                80% { transform: scale(1.0); opacity: 1; }
                100% { transform: scale(0.5); opacity: 0; }
            }

            /* Apply the animation class */
            .animate-splash {
                animation: logo-zoom-out 2.5s ease-out forwards;
            }
            `}
    </style>

    <div className="flex flex-col items-center justify-center animate-splash">
      {/* Logo Placeholder: Use the brand name with primary color emphasis */}
      <img src={logo} alt="logo" className='w-[15%] mb-5' />
      <h1 className="text-4xl font-extrabold text-base-content tracking-wider">
        MediRaksha
      </h1>
      <span className="loading loading-dots loading-lg text-primary mt-6"></span>
    </div>
  </div>
);


export default function App() {

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Wait for the duration of the animation (2500ms) before rendering the main app
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />
        <Route path='/details' element={<DetailConfirmation />}></Route>
        <Route path='/detail' element={<MyDetail />} />
        <Route path='/about' element={<About />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/schedule' element={<Scheduling />} />
        <Route path='/availability' element={<Availability />} />
        <Route path='/resource' element={<ResourceAllocation />} />
        <Route path='/map' element={<Map />} />
        <Route path='/history' element={<HealthSummary />} />
      </Routes>
    </div>
  );
}

