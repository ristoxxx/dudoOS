I've created a comprehensive global state management system using React Context API and useReducer. Let me explain what I've done:

**AppContext.tsx** - The main context file includes:

- Type definitions for windows, apps, and desktop settings
- Initial state setup with default values
- A reducer function to handle all state updates
- Action types for all possible operations
- A context provider component (AppProvider)
- A custom hook (useAppContext) to easily access the context


**useOS.ts** - A custom hook that provides clean, simple functions to:

- Manage windows (open, close, minimize, maximize, etc.)
- Control the start menu
- Update desktop settings
- Instlled uninstall apps
- Various utility functions

**App.tsx** - Updated to wrap the application with the AppProvider
- 
The state includes all the components you requested:

- Active windows (with properties for position, size, minimize/maximize state)
- Running applications (tracked in a Set for efficient lookups)
- Start menu visibility (controlled by a boolean flag)
- Desktop settings (wallpaper, theme color, icon size, etc.)

This state management system is designed to be scalable as you add more features. The reducer pattern ensures all state changes are predictable and centralized.
In the next step, we will implement the Desktop component that will host our icons and provide a foundation for the UI.