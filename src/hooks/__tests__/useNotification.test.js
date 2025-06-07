import { renderHook, act } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import { useNotification } from '../useNotification';

describe('useNotification', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should show and hide notification', () => {
    const { result } = renderHook(() => useNotification());
    
    act(() => {
      result.current.showNotification('Test message');
    });

    const { NotificationContainer } = result.current;
    render(<NotificationContainer />);
    
    expect(screen.getByText('Test message')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  });

  it('should show multiple notifications', () => {
    const { result } = renderHook(() => useNotification());
    
    act(() => {
      result.current.showNotification('Message 1');
      result.current.showNotification('Message 2');
    });

    const { NotificationContainer } = result.current;
    render(<NotificationContainer />);
    
    expect(screen.getByText('Message 1')).toBeInTheDocument();
    expect(screen.getByText('Message 2')).toBeInTheDocument();
  });

  it('should apply correct styles based on notification type', () => {
    const { result } = renderHook(() => useNotification());
    
    act(() => {
      result.current.showNotification('Success', 'success');
      result.current.showNotification('Error', 'error');
    });

    const { NotificationContainer } = result.current;
    render(<NotificationContainer />);
    
    const successNotification = screen.getByText('Success');
    const errorNotification = screen.getByText('Error');
    
    expect(successNotification).toHaveClass('bg-green-500');
    expect(errorNotification).toHaveClass('bg-red-500');
  });
}); 