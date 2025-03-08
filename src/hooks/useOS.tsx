{/*
 * File: useOS.tsx
 * Created Date: Sunday March 9th 2025 12:26:29
 * Author: ristoxxx@github.com
 * -----
 * Last Modified:
 * Modified By: ristoxxx@github.com
 * -----
 * Copyright (c) 2025 ristoxxx@github.com
 */}

import { useCallback } from 'react';
import { useAppContext, Window, App, DesktopSettings } from '../contexts/AppContext';

export const useOS = () => {
  const { state, dispatch } = useAppContext();

  // Window management functions
  const openWindow = useCallback((app: App, position?: { x: number; y: number }) => {
    dispatch({ type: 'OPEN_WINDOW', payload: { app, position } });
  }, [dispatch]);

  const closeWindow = useCallback((id: string) => {
    dispatch({ type: 'CLOSE_WINDOW', payload: { id } });
  }, [dispatch]);

  const minimizeWindow = useCallback((id: string) => {
    dispatch({ type: 'MINIMIZE_WINDOW', payload: { id } });
  }, [dispatch]);

  const maximizeWindow = useCallback((id: string) => {
    dispatch({ type: 'MAXIMIZE_WINDOW', payload: { id } });
  }, [dispatch]);

  const restoreWindow = useCallback((id: string) => {
    dispatch({ type: 'RESTORE_WINDOW', payload: { id } });
  }, [dispatch]);

  const focusWindow = useCallback((id: string) => {
    dispatch({ type: 'FOCUS_WINDOW', payload: { id } });
  }, [dispatch]);

  const moveWindow = useCallback((id: string, position: { x: number; y: number }) => {
    dispatch({ type: 'MOVE_WINDOW', payload: { id, position } });
  }, [dispatch]);

  const resizeWindow = useCallback((id: string, size: { width: number; height: number }) => {
    dispatch({ type: 'RESIZE_WINDOW', payload: { id, size } });
  }, [dispatch]);

  // Start menu functions
  const toggleStartMenu = useCallback(() => {
    dispatch({ type: 'TOGGLE_START_MENU' });
  }, [dispatch]);

  const closeStartMenu = useCallback(() => {
    dispatch({ type: 'CLOSE_START_MENU' });
  }, [dispatch]);

  // Desktop settings functions
  const updateDesktopSettings = useCallback((settings: Partial<DesktopSettings>) => {
    dispatch({ type: 'UPDATE_DESKTOP_SETTINGS', payload: settings });
  }, [dispatch]);

  // App management functions
  const installApp = useCallback((app: App) => {
    dispatch({ type: 'INSTALL_APP', payload: app });
  }, [dispatch]);

  const uninstallApp = useCallback((id: string) => {
    dispatch({ type: 'UNINSTALL_APP', payload: { id } });
  }, [dispatch]);

  // Utility functions
  const isAppRunning = useCallback((appId: string) => {
    return state.runningApps.has(appId);
  }, [state.runningApps]);

  const getWindowsByAppId = useCallback((appId: string) => {
    return state.windows.filter(window => window.appId === appId);
  }, [state.windows]);

  const getActiveWindow = useCallback(() => {
    return state.windows.find(window => window.id === state.activeWindowId) || null;
  }, [state.windows, state.activeWindowId]);

  return {
    // State properties
    windows: state.windows,
    activeWindowId: state.activeWindowId,
    runningApps: state.runningApps,
    isStartMenuOpen: state.isStartMenuOpen,
    desktopSettings: state.desktopSettings,
    installedApps: state.installedApps,
    
    // Window management
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    focusWindow,
    moveWindow,
    resizeWindow,
    
    // Start menu
    toggleStartMenu,
    closeStartMenu,
    
    // Desktop settings
    updateDesktopSettings,
    
    // App management
    installApp,
    uninstallApp,
    
    // Utilities
    isAppRunning,
    getWindowsByAppId,
    getActiveWindow
  };
};

