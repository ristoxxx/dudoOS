import React from 'react';
import { AppProvider } from './contexts/AppContext';
// These components will be implemented in the next steps
// import Desktop from './components/Desktop/Desktop';
// import Taskbar from './components/Taskbar/Taskbar';
// import StartMenu from './components/StartMenu/StartMenu';

function App() {
  return (
    <AppProvider>
      <div className="app-container h-screen w-screen overflow-hidden relative">
        {/* Desktop component will be added here */}
        {/* <Desktop /> */}
        
        {/* Start Menu component will be added here */}
        {/* <StartMenu /> */}
        
        {/* Taskbar component will be added here */}
        {/* <Taskbar /> */}
      </div>
    </AppProvider>
  );
}

export default App;

