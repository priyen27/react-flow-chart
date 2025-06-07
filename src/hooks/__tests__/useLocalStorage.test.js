import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should initialize with the provided value', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    
    act(() => {
      result.current[1]('new value');
    });

    expect(window.localStorage.getItem('test-key')).toBe(JSON.stringify('new value'));
  });

  it('should load existing value from localStorage', () => {
    window.localStorage.setItem('test-key', JSON.stringify('existing value'));
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current[0]).toBe('existing value');
  });

  it('should handle JSON parsing errors', () => {
    window.localStorage.setItem('test-key', 'invalid json');
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current[0]).toBe('initial');
  });
}); 