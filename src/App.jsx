import { ReactFlowProvider } from '@xyflow/react';
import FlowEditor from './components/FlowEditor';
import { ThemeProvider } from './theme/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <ReactFlowProvider>
        <FlowEditor />
      </ReactFlowProvider>
    </ThemeProvider>
  );
}

export default App;
