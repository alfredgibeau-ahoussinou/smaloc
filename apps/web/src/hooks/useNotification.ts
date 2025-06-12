import { useState, useCallback } from 'react';
import { NotificationType } from '../components/Notification';

interface NotificationState {
  type: NotificationType;
  title: string;
  message?: string;
  show: boolean;
}

export function useNotification() {
  const [notification, setNotification] = useState<NotificationState>({
    type: 'info',
    title: '',
    message: '',
    show: false,
  });

  const showNotification = useCallback(
    (type: NotificationType, title: string, message?: string) => {
      setNotification({
        type,
        title,
        message,
        show: true,
      });

      // Auto-hide after 5 seconds
      setTimeout(() => {
        setNotification((prev) => ({ ...prev, show: false }));
      }, 5000);
    },
    []
  );

  const hideNotification = useCallback(() => {
    setNotification((prev) => ({ ...prev, show: false }));
  }, []);

  return {
    notification,
    showNotification,
    hideNotification,
  };
} 