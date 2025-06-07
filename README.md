# Visual Page Hierarchy Editor

A powerful visual tool for managing and visualizing website page hierarchies. Built with React, React Flow, and DndKit.

## 🚀 Demo

[Live Demo](deployment-link-here) <!-- TODO: Add your deployment link -->

### Video Demo

[![Video Demo](video-thumbnail-url-here)](video-link-here) <!-- TODO: Add your video demo link -->

## ✨ Features

- **Interactive Page Hierarchy Visualization**
  - 3-level page structure visualization
  - Automatic layout using Dagre algorithm
  - Visual differentiation between hierarchy levels
  - Smooth animations and transitions

- **Home Page Section Management**
  - Drag-and-drop reordering of sections
  - Sections include: Hero, Features, Testimonials, CTA, Footer
  - Real-time updates and persistence

- **Data Management**
  - Save/Load functionality using localStorage
  - Export complete hierarchy as JSON
  - Automatic layout preservation

## 🛠️ Technologies Used

- **Frontend Framework**: React 18
- **Visualization**: React Flow (@xyflow/react)
- **Layout Engine**: Dagre
- **Drag and Drop**: DndKit
- **Styling**: Tailwind CSS
- **Testing**: Vitest + React Testing Library
- **Build Tool**: Vite

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd visual-page-editor
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🔧 Usage

1. **View Page Hierarchy**
   - The page hierarchy is automatically displayed in a tree structure
   - Pages are color-coded by level for easy visualization

2. **Manage Home Page Sections**
   - Click and drag sections in the Home node to reorder them
   - Changes are reflected immediately in the UI

3. **Save/Load/Export/Reset**
   - Click "Save" to persist the current state to localStorage
   - Click "Load" to restore the last saved state
   - Click "Export" to download the hierarchy as a JSON file
   - Click "Reset" to reset the layout

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```
