import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useNotification } from '@stonelead/ui';

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  budget: number;
  startDate: string;
  endDate: string;
  performance: {
    impressions: number;
    clicks: number;
    conversions: number;
  };
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Campagne Facebook Q1',
    status: 'active',
    budget: 5000,
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    performance: {
      impressions: 15000,
      clicks: 750,
      conversions: 150,
    },
  },
  {
    id: '2',
    name: 'Campagne Google Ads',
    status: 'paused',
    budget: 3000,
    startDate: '2024-02-01',
    endDate: '2024-02-28',
    performance: {
      impressions: 8000,
      clicks: 400,
      conversions: 80,
    },
  },
];

export default function CampaignsPage() {
  const router = useRouter();
  const { showNotification } = useNotification();
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Campagnes</h1>
            <button
              onClick={() => router.push('/campaigns/new')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Nouvelle campagne
            </button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rechercher une campagne..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="w-full sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Active</option>
              <option value="paused">En pause</option>
              <option value="completed">Terminée</option>
            </select>
          </div>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredCampaigns.map((campaign) => (
              <li key={campaign.id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {campaign.name}
                      </h3>
                      <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <svg
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {new Date(campaign.startDate).toLocaleDateString()} -{' '}
                          {new Date(campaign.endDate).toLocaleDateString()}
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <svg
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {campaign.budget.toLocaleString()} €
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          campaign.status
                        )}`}
                      >
                        {campaign.status === 'active'
                          ? 'Active'
                          : campaign.status === 'paused'
                          ? 'En pause'
                          : 'Terminée'}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => router.push(`/campaigns/${campaign.id}`)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Voir
                        </button>
                        <button
                          onClick={() => router.push(`/campaigns/${campaign.id}/edit`)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Modifier
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-500">Impressions</div>
                      <div className="mt-1 text-lg font-semibold text-gray-900">
                        {campaign.performance.impressions.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-500">Clics</div>
                      <div className="mt-1 text-lg font-semibold text-gray-900">
                        {campaign.performance.clicks.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-500">Conversions</div>
                      <div className="mt-1 text-lg font-semibold text-gray-900">
                        {campaign.performance.conversions.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 