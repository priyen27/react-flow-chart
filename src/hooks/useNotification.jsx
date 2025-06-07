import { useState, useCallback } from 'react';

export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, duration);
  }, []);

  const NotificationContainer = () => (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2">
      {notifications.map(({ id, message, type }) => (
        <div
          key={id}
          className={`px-4 py-2 rounded shadow-lg transition-all duration-200 ease-in-out ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
          }`}
        >
          {message}
        </div>
      ))}
    </div>
  );

  return {
    showNotification,
    NotificationContainer
  };
};

export default useNotification; 