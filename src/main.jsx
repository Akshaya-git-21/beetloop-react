import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/design-system.css';
import './styles/base-reset.css';

// StrictMode is intentionally omitted: AppRoot is a ported class component
// whose lifecycle methods (URL sync, Supabase auth/session, realtime
// subscribe) run real side effects on mount and are not written to
// tolerate StrictMode's dev-only mount -> unmount -> remount cycle.
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
