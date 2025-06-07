import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import FlowEditor from './FlowEditor';
import { ReactFlowProvider } from '@xyflow/react';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Mock URL.createObjectURL and URL.revokeObjectURL
global.URL.createObjectURL = vi.fn();
global.URL.revokeObjectURL = vi.fn();

describe('FlowEditor', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    URL.createObjectURL.mockClear();
    URL.revokeObjectURL.mockClear();
  });

  it('renders without crashing', () => {
    render(
      <ReactFlowProvider>
        <FlowEditor />
      </ReactFlowProvider>
    );
  });

  it('has save, load, and export buttons', () => {
    render(
      <ReactFlowProvider>
        <FlowEditor />
      </ReactFlowProvider>
    );

    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Load')).toBeInTheDocument();
    expect(screen.getByText('Export')).toBeInTheDocument();
  });

  it('saves to localStorage when clicking save', () => {
    render(
      <ReactFlowProvider>
        <FlowEditor />
      </ReactFlowProvider>
    );

    fireEvent.click(screen.getByText('Save'));
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it('loads from localStorage when clicking load', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify({
      nodes: [],
      edges: []
    }));

    render(
      <ReactFlowProvider>
        <FlowEditor />
      </ReactFlowProvider>
    );

    fireEvent.click(screen.getByText('Load'));
    expect(localStorageMock.getItem).toHaveBeenCalledWith('page-hierarchy');
  });

  it('creates a download link when clicking export', () => {
    const createElementSpy = vi.spyOn(document, 'createElement');
    const appendChildSpy = vi.spyOn(document.body, 'appendChild');
    const removeChildSpy = vi.spyOn(document.body, 'removeChild');

    render(
      <ReactFlowProvider>
        <FlowEditor />
      </ReactFlowProvider>
    );

    fireEvent.click(screen.getByText('Export'));

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(appendChildSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();
    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalled();
  });
}); 