import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import FlowEditor from './FlowEditor';
import { ReactFlowProvider } from '@xyflow/react';
import { ThemeProvider } from '../theme/ThemeContext';

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <ReactFlowProvider>
        {children}
      </ReactFlowProvider>
    </ThemeProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

describe('FlowEditor Component', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      customRender(<FlowEditor />);
    });

    it('displays all required UI elements', () => {
      customRender(<FlowEditor />);

      expect(screen.getByText('Save')).toBeInTheDocument();
      expect(screen.getByText('Load')).toBeInTheDocument();
      expect(screen.getByText('Export')).toBeInTheDocument();
    });
  });

  describe('Save Functionality', () => {
    it('saves current state to localStorage', async () => {
      const mockFlowData = {
        nodes: [{ id: '1', type: 'home' }],
        edges: []
      };

      customRender(<FlowEditor initialNodes={mockFlowData.nodes} initialEdges={mockFlowData.edges} />);
      
      fireEvent.click(screen.getByText('Save'));
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'page-hierarchy',
        expect.any(String)
      );

      expect(localStorageMock.setItem).toHaveBeenCalled();
    });

    it('shows success message after saving', async () => {
      customRender(<FlowEditor />);

      fireEvent.click(screen.getByText('Save'));
      
      await waitFor(() => {
        expect(screen.getByText(/saved successfully/i)).toBeInTheDocument();
      });
    });
  });

  describe('Load Functionality', () => {
    it('loads data from localStorage correctly', () => {
      const mockData = {
        nodes: [{ 
          id: '1', 
          type: 'home',
          position: { x: 100, y: 100 },
          data: {} 
        }],
        edges: []
      };
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockData));

      customRender(<FlowEditor />);

      fireEvent.click(screen.getByText('Load'));
      expect(localStorageMock.getItem).toHaveBeenCalledWith('page-hierarchy');
    });

    it('handles missing localStorage data gracefully', () => {
      localStorageMock.getItem.mockReturnValue(null);

      customRender(<FlowEditor />);

      fireEvent.click(screen.getByText('Load'));
    });
  });
}); 