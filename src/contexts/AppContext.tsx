{/*
 * File: AppContext.tsx
 * Created Date: Sunday March 9th 2025 12:13:08
 * Author: ristoxxx@github.com
 * -----
 * Last Modified: Sunday March 9th 2025 12:13:13
 * Modified By: ristoxxx@github.com
 * -----
 * Copyright (c) 2025 ristoxxx@github.com
 */}

 import React, { createContext, useContext, useReducer, ReactNode } from 'react';

 // Define types for our state
 export interface Window {
   id: string;
   appId: string;
   title: string;
   isMinimized: boolean;
   isMaximized: boolean;
   zIndex: number;
   position: { x: number; y: number };
   size: { width: number; height: number };
   component: React.ComponentType<any>;
   icon?: string;
 }
 
 export interface App {
   id: string;
   name: string;
   icon: string;
   component: React.ComponentType<any>;
   defaultSize?: { width: number; height: number };
   supportedFileTypes?: string[];
   singleton?: boolean;
 }
 
 export interface DesktopSettings {
   wallpaper: string;
   wallpaperType: 'image' | 'color' | 'video' | 'animation';
   wallpaperFit: 'fill' | 'fit' | 'stretch' | 'tile' | 'center';
   themeColor: string;
   iconSize: 'small' | 'medium' | 'large';
   taskbarPosition: 'bottom' | 'top' | 'left' | 'right';
   showDesktopIcons: boolean;
 }
 
 // Define the state interface
 interface AppState {
   windows: Window[];
   activeWindowId: string | null;
   runningApps: Set<string>;
   isStartMenuOpen: boolean;
   desktopSettings: DesktopSettings;
   installedApps: App[];
 }
 
 // Initial state
 const initialState: AppState = {
   windows: [],
   activeWindowId: null,
   runningApps: new Set<string>(),
   isStartMenuOpen: false,
   desktopSettings: {
     wallpaper: '/assets/wallpapers/default.jpg',
     wallpaperType: 'image',
     wallpaperFit: 'fill',
     themeColor: '#0078d7',
     iconSize: 'medium',
     taskbarPosition: 'bottom',
     showDesktopIcons: true,
   },
   installedApps: [], // This will be populated with available apps
 };
 
 // Define action types
 type Action =
   | { type: 'OPEN_WINDOW'; payload: { app: App; position?: { x: number; y: number } } }
   | { type: 'CLOSE_WINDOW'; payload: { id: string } }
   | { type: 'MINIMIZE_WINDOW'; payload: { id: string } }
   | { type: 'MAXIMIZE_WINDOW'; payload: { id: string } }
   | { type: 'RESTORE_WINDOW'; payload: { id: string } }
   | { type: 'FOCUS_WINDOW'; payload: { id: string } }
   | { type: 'MOVE_WINDOW'; payload: { id: string; position: { x: number; y: number } } }
   | { type: 'RESIZE_WINDOW'; payload: { id: string; size: { width: number; height: number } } }
   | { type: 'TOGGLE_START_MENU' }
   | { type: 'CLOSE_START_MENU' }
   | { type: 'UPDATE_DESKTOP_SETTINGS'; payload: Partial<DesktopSettings> }
   | { type: 'INSTALL_APP'; payload: App }
   | { type: 'UNINSTALL_APP'; payload: { id: string } };
 
 // Create reducer function
 const appReducer = (state: AppState, action: Action): AppState => {
   switch (action.type) {
     case 'OPEN_WINDOW': {
       const { app, position } = action.payload;
       
       // Check if app is singleton and already running
       if (app.singleton) {
         const existingWindow = state.windows.find(w => w.appId === app.id && !w.isMinimized);
         if (existingWindow) {
           return {
             ...state,
             activeWindowId: existingWindow.id,
             windows: state.windows.map(w => ({
               ...w,
               zIndex: w.id === existingWindow.id ? Math.max(...state.windows.map(w => w.zIndex), 0) + 1 : w.zIndex
             }))
           };
         }
       }
       
       // Generate a unique ID for the window
       const windowId = `${app.id}-${Date.now()}`;
       const highestZIndex = Math.max(0, ...state.windows.map(w => w.zIndex));
       
       const newWindow: Window = {
         id: windowId,
         appId: app.id,
         title: app.name,
         isMinimized: false,
         isMaximized: false,
         zIndex: highestZIndex + 1,
         position: position || { x: 100, y: 100 },
         size: app.defaultSize || { width: 800, height: 600 },
         component: app.component,
         icon: app.icon
       };
       
       // Add app to running apps
       const updatedRunningApps = new Set(state.runningApps);
       updatedRunningApps.add(app.id);
       
       return {
         ...state,
         windows: [...state.windows, newWindow],
         activeWindowId: windowId,
         runningApps: updatedRunningApps,
         isStartMenuOpen: false // Close start menu when opening a window
       };
     }
     
     case 'CLOSE_WINDOW': {
       const { id } = action.payload;
       const updatedWindows = state.windows.filter(w => w.id !== id);
       
       // Find the app ID of the closed window
       const closedWindow = state.windows.find(w => w.id === id);
       if (!closedWindow) return state;
       
       // Check if there are any more windows of this app
       const hasMoreWindows = updatedWindows.some(w => w.appId === closedWindow.appId);
       
       // Update running apps
       const updatedRunningApps = new Set(state.runningApps);
       if (!hasMoreWindows) {
         updatedRunningApps.delete(closedWindow.appId);
       }
       
       // Set new active window (the one with highest z-index)
       let newActiveWindowId = null;
       if (updatedWindows.length > 0) {
         const highestZIndexWindow = updatedWindows.reduce((prev, current) => 
           (prev.zIndex > current.zIndex) ? prev : current
         );
         newActiveWindowId = highestZIndexWindow.id;
       }
       
       return {
         ...state,
         windows: updatedWindows,
         activeWindowId: newActiveWindowId,
         runningApps: updatedRunningApps
       };
     }
     
     case 'MINIMIZE_WINDOW': {
       const { id } = action.payload;
       
       // Find window with next highest z-index to make active
       const currentWindows = [...state.windows];
       const currentWindowIndex = currentWindows.findIndex(w => w.id === id);
       
       if (currentWindowIndex === -1) return state;
       
       // Sort windows by z-index (excluding the one being minimized)
       const sortedWindows = currentWindows
         .filter(w => w.id !== id && !w.isMinimized)
         .sort((a, b) => b.zIndex - a.zIndex);
       
       // Set new active window
       const newActiveWindowId = sortedWindows.length > 0 ? sortedWindows[0].id : null;
       
       return {
         ...state,
         windows: state.windows.map(w => 
           w.id === id ? { ...w, isMinimized: true } : w
         ),
         activeWindowId: state.activeWindowId === id ? newActiveWindowId : state.activeWindowId
       };
     }
     
     case 'MAXIMIZE_WINDOW': {
       const { id } = action.payload;
       return {
         ...state,
         windows: state.windows.map(w => 
           w.id === id ? { ...w, isMaximized: true } : w
         )
       };
     }
     
     case 'RESTORE_WINDOW': {
       const { id } = action.payload;
       return {
         ...state,
         windows: state.windows.map(w => 
           w.id === id ? { ...w, isMaximized: false, isMinimized: false } : w
         ),
         activeWindowId: id
       };
     }
     
     case 'FOCUS_WINDOW': {
       const { id } = action.payload;
       const highestZIndex = Math.max(0, ...state.windows.map(w => w.zIndex));
       
       return {
         ...state,
         windows: state.windows.map(w => 
           w.id === id 
             ? { ...w, zIndex: highestZIndex + 1, isMinimized: false } 
             : w
         ),
         activeWindowId: id,
         isStartMenuOpen: false // Close start menu when focusing a window
       };
     }
     
     case 'MOVE_WINDOW': {
       const { id, position } = action.payload;
       return {
         ...state,
         windows: state.windows.map(w => 
           w.id === id ? { ...w, position } : w
         )
       };
     }
     
     case 'RESIZE_WINDOW': {
       const { id, size } = action.payload;
       return {
         ...state,
         windows: state.windows.map(w => 
           w.id === id ? { ...w, size } : w
         )
       };
     }
     
     case 'TOGGLE_START_MENU': {
       return {
         ...state,
         isStartMenuOpen: !state.isStartMenuOpen
       };
     }
     
     case 'CLOSE_START_MENU': {
       return {
         ...state,
         isStartMenuOpen: false
       };
     }
     
     case 'UPDATE_DESKTOP_SETTINGS': {
       return {
         ...state,
         desktopSettings: {
           ...state.desktopSettings,
           ...action.payload
         }
       };
     }
     
     case 'INSTALL_APP': {
       const newApp = action.payload;
       // Check if app is already installed
       if (state.installedApps.some(app => app.id === newApp.id)) {
         return state;
       }
       
       return {
         ...state,
         installedApps: [...state.installedApps, newApp]
       };
     }
     
     case 'UNINSTALL_APP': {
       const { id } = action.payload;
       
       // Close all windows of this app
       const updatedWindows = state.windows.filter(w => w.appId !== id);
       
       // Remove from running apps
       const updatedRunningApps = new Set(state.runningApps);
       updatedRunningApps.delete(id);
       
       // Remove from installed apps
       const updatedInstalledApps = state.installedApps.filter(app => app.id !== id);
       
       return {
         ...state,
         windows: updatedWindows,
         runningApps: updatedRunningApps,
         installedApps: updatedInstalledApps
       };
     }
     
     default:
       return state;
   }
 };
 
 // Create context
 interface AppContextType {
   state: AppState;
   dispatch: React.Dispatch<Action>;
 }
 
 const AppContext = createContext<AppContextType | undefined>(undefined);
 
 // Create provider component
 interface AppProviderProps {
   children: ReactNode;
 }
 
 export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
   const [state, dispatch] = useReducer(appReducer, initialState);
   
   return (
     <AppContext.Provider value={{ state, dispatch }}>
       {children}
     </AppContext.Provider>
   );
 };
 
 // Create custom hook for using context
 export const useAppContext = () => {
   const context = useContext(AppContext);
   if (context === undefined) {
     throw new Error('useAppContext must be used within an AppProvider');
   }
   return context;
 };
 

