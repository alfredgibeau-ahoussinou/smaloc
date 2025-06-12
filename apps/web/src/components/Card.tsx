import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white overflow-hidden shadow rounded-lg ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`px-4 py-5 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = '' }: CardBodyProps) {
  return (
    <div className={`px-4 py-5 sm:p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`px-4 py-4 sm:px-6 bg-gray-50 ${className}`}>
      {children}
    </div>
  );
} 