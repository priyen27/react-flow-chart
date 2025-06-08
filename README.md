# Visual Page Hierarchy Editor

A powerful visual tool for managing and visualizing website page hierarchies. Built with React, React Flow, and DndKit.

## 🚀 Demo

[Live Demo]https://priyen-frontend-developer.vercel.app/

### Video Demo


**UI Walkthrough**  
  [https://www.loom.com/share/f866a967018e4610808b6966433bcbd0?sid=37382e47-60cc-496f-80e6-dc52b50228ef](https://www.loom.com/share/f866a967018e4610808b6966433bcbd0?sid=37382e47-60cc-496f-80e6-dc52b50228ef)

**Code Structure Overview**  
  [https://www.loom.com/share/80e9219edb8446a98ef33cf5c7cba0cc?sid=f7d6979c-d8b6-461f-91fc-b035f1324732](https://www.loom.com/share/80e9219edb8446a98ef33cf5c7cba0cc?sid=f7d6979c-d8b6-461f-91fc-b035f1324732)

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
