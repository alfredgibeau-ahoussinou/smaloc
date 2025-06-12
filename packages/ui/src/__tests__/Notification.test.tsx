import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Notification } from '../Notification';

describe('Notification', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    mockOnClose.mockClear();
  });

  it('renders with success type', () => {
    render(
      <Notification
        type="success"
        message="Operation successful"
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Operation successful')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('bg-green-50');
  });

  it('renders with error type', () => {
    render(
      <Notification
        type="error"
        message="Operation failed"
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Operation failed')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('bg-red-50');
  });

  it('renders with warning type', () => {
    render(
      <Notification
        type="warning"
        message="Warning message"
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Warning message')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('bg-yellow-50');
  });

  it('renders with info type', () => {
    render(
      <Notification
        type="info"
        message="Information message"
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Information message')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('bg-blue-50');
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <Notification
        type="success"
        message="Test message"
        onClose={mockOnClose}
      />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('automatically calls onClose after duration', () => {
    render(
      <Notification
        type="success"
        message="Test message"
        onClose={mockOnClose}
        duration={3000}
      />
    );

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('cleans up timer on unmount', () => {
    const { unmount } = render(
      <Notification
        type="success"
        message="Test message"
        onClose={mockOnClose}
        duration={3000}
      />
    );

    unmount();
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(mockOnClose).not.toHaveBeenCalled();
  });
}); 