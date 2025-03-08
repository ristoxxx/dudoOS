# dudoOS
An ambitious project that aims to produce a full Windows-like web operating system

## _Desktop environment in the browser_

# System 🧠

### File System
- [ ] File Explorer
  - [ ] Back, Forward, Recent locations, Up one level, Address bar, Search
  - [ ] Thumbnail & Details Views
- [ ] Drag & Drop File Support (internal & external)
  - [ ] Loading progress dialog
- [ ] ZIP/Archive support
  - [ ] Write support
  - [ ] ZIP/ISO read support
  - [ ] Extract support for various formats
- [ ] Writes to IndexedDb
- [ ] Group selection/manipulation & drag to sort/arrange
- [ ] Dynamic and auto cached icons for music, images, video & emulator states
- [ ] Context Menus
  - [ ] Cut, Copy, Create shortcut, Delete, Rename
  - [ ] Add files, Map directory
  - [ ] Open with options/dialog, Open file/folder location, Open in new window, Open Terminal here
  - [ ] Download, Add to archive, Extract here, Set as wallpaper, Convert various formats, Properties
  - [ ] Sort by, New Folder, New Text Document
  - [ ] Screen Capture
- [ ] Keyboard Shortcuts
  - [ ] CTRL+C, CTRL+V, CTRL+X, CTRL+A, Delete
  - [ ] F2, F5, Backspace, Arrows, Enter
  - [ ] SHIFT+CTRL+R, SHIFT+F10, SHIFT+F12
  - [ ] In Fullscreen: Windows Key, Windows Key + R
- [ ] File information tooltips
- [ ] Allow sorting by name, size, type or date
  - [ ] Persists icon position/sort order

### Windows
- [ ] Resizable and Draggable
- [ ] Minimize, Maximize & Close
- [ ] Persists size/position/maximized states
- [ ] Animates opening and closing

### Start Menu
- [ ] Expandable Sidebar
  - [ ] Apps list, Documents/Pictures/Videos shortcuts, Power (clears session)
- [ ] Spotlight visual effect
- [ ] Folder support
- [ ] Keyboard shortcut opens with **_SHIFT+ESC_**
  - [ ] Or Windows Key when in fullscreen

### Taskbar
- [ ] Peek hover preview of windows
- [ ] Focused window indicator
- [ ] Search menu (w/Recent files)
- [ ] AI Chat Agent

### Clock
- [ ] Runs in a Web Worker
  - [ ] Drawn in an OffscreenCanvas
- [ ] NTP server time mode
- [ ] Synced to system clock on load
- [ ] Date tooltip
- [ ] Calendar popup

### Background
- [ ] Dynamic animated wallpapers
  - [ ] Waves
  - [ ] Hexells
  - [ ] Matrix
  - [ ] Coastal Landscape
- [ ] Set via image/video (Fill, Fit, Stretch, Tile, Center)
- [ ] Picture Slideshow
- [ ] Astronomy Picture of the Day
- [ ] AI Generated Wallpapers

### URL
- [ ] Query parameter loading
  - [ ] Examples:
    - [ ] `/?url=/CREDITS.md`
    - [ ] `/?app=Browser`

# Apps 🧪

### BoxedWine
- [ ] Runs 16/32-bit Windows applications

### Browser
- [ ] Loads websites
- [ ] Bookmark bar
- [ ] Favicon support
- [ ] Back/Forward & Reload
- [ ] Google search via Address bar
- [ ] IPFS protocol support
- [ ] Chrome dino game

### DevTools
- [ ] Console, Elements, Network, Resources, Sources, DOM
- [ ] Activate from Start Menu or **_SHIFT+F12_**

### EmulatorJS
- [ ] Plays console game roms

### IRC
- [ ] Internet Relay Chat Client
- [ ] Connects over WebSockets

### js-dos
- [ ] DOS emulator
- [ ] Automatic save states on close
- [ ] Automatic window resize

### Marked
- [ ] Markdown Viewer

### Messenger
- [ ] Encrypted direct messaging client
- [ ] Utilizes Nostr Protocol
- [ ] Automatic public/private key creation

### Monaco Editor
- [ ] Code/text editor
- [ ] Supports all file types
- [ ] Save files via **_CTRL+S_**
- [ ] Line count, cursor position, language id
- [ ] Prettier formatting

### Paint
- [ ] Create & edit images

### PDF
- [ ] Render/Print PDF's
- [ ] Page current/count & Zoom

### Photos
- [ ] Supports various image formats
- [ ] Fullscreen & Zoom

### Ruffle
- [ ] Flash Player emulator

### Stable Diffusion
- [ ] Creates images using artificial intelligence
- [ ] Runs locally

### Terminal
- [ ] File system support
- [ ] Autocomplete & history
- [ ] Pipe commands together
- [ ] Command list via `help`
- [ ] Git support
- [ ] Python support
- [ ] WebAssembly Package Manager
- [ ] Weather information
- [ ] eSheep
- [ ] Activate from Start Menu or **_SHIFT+F10_**
- [ ] Neofetch

### TinyMCE
- [ ] Read & WYSIWYG modes
- [ ] File save support

### Virtual x86
- [ ] x86 emulator
- [ ] Automatic save states on close
- [ ] Automatic window resize

### Video Player
- [ ] Supports various video formats
- [ ] Plays YouTube videos
- [ ] Keyboard Shortcuts

### Vim
- [ ] Code/text editor
- [ ] Supports all file types

### Webamp
- [ ] Winamp audio player
- [ ] Skin support
- [ ] Playlist & streaming support
- [ ] Visualization support

# Games 🎮

### ClassiCube
- [ ] Minecraft Classic compatible client

### DX-Ball
- [ ] Block breaker arcade game like Arkanoid

### Space Cadet Pinball
- [ ] Reverse engineering of 3D Pinball from Windows

### Quake III Arena
- [ ] Port of the classic first-person shooter

# Development 🚀

##### Requirements
- Node.js
- Yarn

##### Development
```
yarn install
yarn dev
```

##### Production
```
yarn install
yarn build
yarn serve
```

##### Docker
```
docker build -t browser-os .
docker run -dp 3000:3000 --rm --name browser-os browser-os
```
