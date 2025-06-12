import React, { useState, useEffect } from 'react';
import { useNotification } from '@stonelead/ui';

interface Campaign {
  id?: string;
  name: string;
  platform: string;
  description: string;
  budget: number;
  clientId: string;
}

interface Client {
  id: string;
  name: string;
}

interface CampaignFormProps {
  initialData?: Campaign;
  clients: Client[];
  onSubmit: (data: Campaign) => Promise<void>;
  onCancel: () => void;
}

export const CampaignForm: React.FC<CampaignFormProps> = ({
  initialData,
  clients,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Campaign>({
    name: '',
    platform: '',
    description: '',
    budget: 0,
    clientId: '',
  });

  const { showNotification } = useNotification();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'budget' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      showNotification(
        'success',
        `Campaign ${initialData ? 'updated' : 'created'} successfully!`
      );
    } catch (error) {
      showNotification(
        'error',
        `Failed to ${initialData ? 'update' : 'create'} campaign. Please try again.`
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="platform" className="block text-sm font-medium text-gray-700">
          Platform
        </label>
        <select
          id="platform"
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select a platform</option>
          <option value="facebook">Facebook</option>
          <option value="instagram">Instagram</option>
          <option value="twitter">Twitter</option>
          <option value="linkedin">LinkedIn</option>
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
          Budget
        </label>
        <input
          type="number"
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="clientId" className="block text-sm font-medium text-gray-700">
          Client
        </label>
        <select
          id="clientId"
          name="clientId"
          value={formData.clientId}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select a client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {initialData ? 'Update' : 'Create'} Campaign
        </button>
      </div>
    </form>
  );
}; 