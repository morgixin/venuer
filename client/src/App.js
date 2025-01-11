import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import PlacesProvider from './context/PlacesContext';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        {/* <Route /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
