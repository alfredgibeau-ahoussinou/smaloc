import React, { createContext, useContext, useState, useCallback } from 'react';
import { Notification, NotificationType } from './Notification';

interface NotificationContextType {
  showNotification: (type: NotificationType, message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<
    Array<{ id: number; type: NotificationType; message: string }>
  >([]);

  const showNotification = useCallback((type: NotificationType, message: string) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message }]);
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          type={notification.type}
          message={notification.message}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}; 