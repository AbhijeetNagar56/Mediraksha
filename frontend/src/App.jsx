
import { Route, Routes } from 'react-router';
import Dashboard from './pages/DashBoard';
import Auth from './pages/Auth';
import About from "./pages/About";
import MapComponent from './components/MapComponent'
import Upload from './components/Upload'
import MyDetail from './components/MyDet';
import DetailConfirmation from './pages/DetailConfirmation'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />
        <Route path='/details' element={<DetailConfirmation />}></Route>
        <Route path='detail' element={<MyDetail />} />
        <Route path='/about' element={<About />} />
        <Route path='/map' element={<MapComponent/>} />
        <Route path='/upload' element={<Upload />} />
      </Routes>
    </div>
  );
}



