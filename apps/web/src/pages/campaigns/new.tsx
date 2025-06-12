import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useNotification } from '@stonelead/ui';

interface CampaignFormData {
  name: string;
  budget: number;
  startDate: string;
  endDate: string;
  description: string;
  targetAudience: string;
  platforms: string[];
}

export default function NewCampaignPage() {
  const router = useRouter();
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState<CampaignFormData>({
    name: '',
    budget: 0,
    startDate: '',
    endDate: '',
    description: '',
    targetAudience: '',
    platforms: [],
  });

  const [errors, setErrors] = useState<Partial<CampaignFormData>>({});

  const validateForm = () => {
    const newErrors: Partial<CampaignFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom de la campagne est requis';
    }

    if (formData.budget <= 0) {
      newErrors.budget = 'Le budget doit être supérieur à 0';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'La date de début est requise';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'La date de fin est requise';
    } else if (new Date(formData.endDate) <= new Date(formData.startDate)) {
      newErrors.endDate = 'La date de fin doit être postérieure à la date de début';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
    }

    if (!formData.targetAudience.trim()) {
      newErrors.targetAudience = 'L\'audience cible est requise';
    }

    if (formData.platforms.length === 0) {
      newErrors.platforms = 'Sélectionnez au moins une plateforme';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // TODO: Implement API call to create campaign
      showNotification({
        type: 'success',
        message: 'Campagne créée avec succès !',
      });
      router.push('/campaigns');
    } catch (error) {
      showNotification({
        type: 'error',
        message: 'Erreur lors de la création de la campagne',
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlatformChange = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Nouvelle campagne</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nom de la campagne */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nom de la campagne
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                    errors.name
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                  }`}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Budget */}
              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-gray-700"
                >
                  Budget (€)
                </label>
                <input
                  type="number"
                  name="budget"
                  id="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                    errors.budget
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                  }`}
                />
                {errors.budget && (
                  <p className="mt-2 text-sm text-red-600">{errors.budget}</p>
                )}
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="startDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date de début
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                      errors.startDate
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.startDate && (
                    <p className="mt-2 text-sm text-red-600">{errors.startDate}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="endDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date de fin
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    id="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                      errors.endDate
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.endDate && (
                    <p className="mt-2 text-sm text-red-600">{errors.endDate}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                    errors.description
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                  }`}
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              {/* Audience cible */}
              <div>
                <label
                  htmlFor="targetAudience"
                  className="block text-sm font-medium text-gray-700"
                >
                  Audience cible
                </label>
                <input
                  type="text"
                  name="targetAudience"
                  id="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                    errors.targetAudience
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                  }`}
                />
                {errors.targetAudience && (
                  <p className="mt-2 text-sm text-red-600">{errors.targetAudience}</p>
                )}
              </div>

              {/* Plateformes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plateformes
                </label>
                <div className="space-y-2">
                  {['Facebook', 'Instagram', 'Google Ads', 'LinkedIn'].map((platform) => (
                    <div key={platform} className="flex items-center">
                      <input
                        type="checkbox"
                        id={platform}
                        checked={formData.platforms.includes(platform)}
                        onChange={() => handlePlatformChange(platform)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={platform}
                        className="ml-2 block text-sm text-gray-900"
                      >
                        {platform}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.platforms && (
                  <p className="mt-2 text-sm text-red-600">{errors.platforms}</p>
                )}
              </div>

              {/* Boutons */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Créer la campagne
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 