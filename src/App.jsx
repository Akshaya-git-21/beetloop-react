import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import AppRoot from './app/AppRoot.jsx';

function parseScreenAndRoute(pathname) {
  if (pathname.startsWith('/app')) {
    const m = /^\/app\/([a-zA-Z0-9_-]+)/.exec(pathname);
    return { screenParam: 'app', routeParam: m ? m[1] : 'dashboard' };
  }
  if (pathname.startsWith('/activate')) return { screenParam: 'activate', routeParam: null };
  return { screenParam: 'login', routeParam: null };
}

// A single catch-all route keeps one persistent AppRoot instance across every
// screen/page transition (login -> app -> logout etc.), matching the original
// single-instance SPA behavior, while still giving every page a real URL.
function RootWrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  const { screenParam, routeParam } = parseScreenAndRoute(location.pathname);
  return (
    <AppRoot
      navigate={navigate}
      location={location}
      routeParam={routeParam}
      screenParam={screenParam}
    />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<RootWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}
