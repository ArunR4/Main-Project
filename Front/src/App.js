import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/Landing/LandingPage';
import ImageApp from './pages/ImageApp/ImageApp';
import Navbar from './components/Navbar/navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/App' element={<ImageApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
