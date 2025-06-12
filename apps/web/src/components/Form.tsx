import React from 'react';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
}

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  options: { value: string; label: string }[];
}

interface ErrorMessageProps {
  children: React.ReactNode;
}

export function Form({ children, onSubmit, ...props }: FormProps) {
  return (
    <form onSubmit={onSubmit} {...props}>
      {children}
    </form>
  );
}

export function FormGroup({ children, className = '' }: FormGroupProps) {
  return <div className={`space-y-1 ${className}`}>{children}</div>;
}

export function Label({ children, required, className = '', ...props }: LabelProps) {
  return (
    <label
      className={`block text-sm font-medium text-gray-700 ${className}`}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

export function Input({ error, className = '', ...props }: InputProps) {
  return (
    <div>
      <input
        className={`block w-full rounded-md shadow-sm sm:text-sm ${
          error
            ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
        } ${className}`}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}

export function TextArea({ error, className = '', ...props }: TextAreaProps) {
  return (
    <div>
      <textarea
        className={`block w-full rounded-md shadow-sm sm:text-sm ${
          error
            ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
        } ${className}`}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}

export function Select({ error, options, className = '', ...props }: SelectProps) {
  return (
    <div>
      <select
        className={`block w-full rounded-md shadow-sm sm:text-sm ${
          error
            ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
        } ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}

export function ErrorMessage({ children }: ErrorMessageProps) {
  return <p className="mt-1 text-sm text-red-600">{children}</p>;
} 