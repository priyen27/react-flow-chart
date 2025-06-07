import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import HomeNode from './HomeNode';
import { ThemeProvider } from '../theme/ThemeContext';
import { ReactFlowProvider } from '@xyflow/react';

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

describe('HomeNode Component', () => {
  const defaultProps = {
    data: {
      sections: [
        { id: 'hero', title: 'Hero' },
        { id: 'features', title: 'Features' },
      ]
    },
    id: 'node-1'
  };

  it('renders without crashing', () => {
    customRender(<HomeNode {...defaultProps} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders all initial sections', () => {
    customRender(<HomeNode {...defaultProps} />);
    
    defaultProps.data.sections.forEach(section => {
      expect(screen.getByText(section.title)).toBeInTheDocument();
    });
  });

  it('renders with default sections when no data is provided', () => {
    customRender(<HomeNode id="node-1" />);
    
    expect(screen.getByText('Hero')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Testimonials')).toBeInTheDocument();
    expect(screen.getByText('CTA')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('updates sections when data prop changes', () => {
    const { rerender } = customRender(<HomeNode {...defaultProps} />);
    
    const newData = {
      sections: [
        { id: 'new-section', title: 'New Section' },
        { id: 'another-section', title: 'Another Section' },
      ]
    };
    
    rerender(<HomeNode data={newData} id="node-1" />);
    
    expect(screen.getByText('New Section')).toBeInTheDocument();
    expect(screen.getByText('Another Section')).toBeInTheDocument();
    expect(screen.queryByText('Hero')).not.toBeInTheDocument();
  });

  it('renders with correct theme styles', () => {
    customRender(<HomeNode {...defaultProps} />);
    
    const container = screen.getByText('Home').parentElement;
    expect(container).toHaveClass('rounded-md', 'border-2');
  });

  it('prevents event propagation on node click', () => {
    customRender(<HomeNode {...defaultProps} />);
    
    const node = screen.getByText('Home').closest('div[role="button"]') || screen.getByText('Home').parentElement;
    const mockEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    });
    
    Object.defineProperty(mockEvent, 'stopPropagation', {
      value: vi.fn()
    });
    
    node.dispatchEvent(mockEvent);
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
  });
}); 