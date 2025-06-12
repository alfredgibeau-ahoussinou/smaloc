import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import Notification from '../components/Notification';
import { useNotification } from '../hooks/useNotification';
import { NotificationProvider } from '../contexts/NotificationContext';
import '../styles/globals.css';

function AppContent({ Component, pageProps }: AppProps) {
  const { notification, hideNotification } = useNotification();

  return (
    <Layout>
      <Component {...pageProps} />
      <Notification
        type={notification.type}
        title={notification.title}
        message={notification.message}
        show={notification.show}
        onClose={hideNotification}
      />
    </Layout>
  );
}

export default function App(props: AppProps) {
  return (
    <NotificationProvider>
      <AppContent {...props} />
    </NotificationProvider>
  );
} 