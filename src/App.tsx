import React from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import SideBar from './components/SideBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AllTrails from './pages/AllTrails';
import GlobalStateProvider from './state/GlobalStateProvider';
import GroupDetail from './pages/GroupDetail';

function App() {
  return (
    <GlobalStateProvider>
      <BrowserRouter>
        <div className="App">
          {/* Change the header */}
          <SideBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/all-trails" element={<AllTrails />} />
            <Route path="/group/:groupId" element={<GroupDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </GlobalStateProvider>
  );
}

export default App;
