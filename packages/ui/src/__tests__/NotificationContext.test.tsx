import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { NotificationProvider, useNotification } from '../NotificationContext';

const TestComponent = () => {
  const { showNotification } = useNotification();
  return (
    <button onClick={() => showNotification('success', 'Test notification')}>
      Show Notification
    </button>
  );
};

describe('NotificationContext', () => {
  it('renders children without notifications', () => {
    render(
      <NotificationProvider>
        <div>Test Child</div>
      </NotificationProvider>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('shows notification when showNotification is called', () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    act(() => {
      screen.getByRole('button', { name: 'Show Notification' }).click();
    });

    expect(screen.getByText('Test notification')).toBeInTheDocument();
  });

  it('removes notification when close button is clicked', () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    act(() => {
      screen.getByRole('button', { name: 'Show Notification' }).click();
    });

    const notification = screen.getByText('Test notification');
    expect(notification).toBeInTheDocument();

    act(() => {
      screen.getByRole('button', { name: 'Close notification' }).click();
    });

    expect(notification).not.toBeInTheDocument();
  });

  it('throws error when useNotification is used outside provider', () => {
    const consoleError = console.error;
    console.error = jest.fn();

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useNotification must be used within a NotificationProvider');

    console.error = consoleError;
  });
}); 