import '@testing-library/jest-dom';

// Mock ResizeObserver since it's not available in jsdom
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}; 