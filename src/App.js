import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SidebarMenu from './component/menu/SidebarMenu.tsx';
import Login from "./component/login/Login";
import {AuthProvider} from "./AuthContext";
function App() {
  return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<SidebarMenu />} />
            <Route path="/download" element={<SidebarMenu />} />
          </Routes>
        </Router>
      </AuthProvider>
  );
}

export default App;
