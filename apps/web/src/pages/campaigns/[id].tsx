import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useNotification } from '@stonelead/ui';

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  budget: number;
  startDate: string;
  endDate: string;
  description: string;
  targetAudience: string;
  platforms: string[];
  performance: {
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
    cpc: number;
    cpa: number;
  };
  dailyStats: {
    date: string;
    impressions: number;
    clicks: number;
    conversions: number;
  }[];
}

const mockCampaign: Campaign = {
  id: '1',
  name: 'Campagne Facebook Q1',
  status: 'active',
  budget: 5000,
  startDate: '2024-01-01',
  endDate: '2024-03-31',
  description: 'Campagne publicitaire sur Facebook pour le premier trimestre 2024',
  targetAudience: 'Professionnels 25-45 ans',
  platforms: ['Facebook', 'Instagram'],
  performance: {
    impressions: 15000,
    clicks: 750,
    conversions: 150,
    ctr: 5,
    cpc: 2.5,
    cpa: 12.5,
  },
  dailyStats: [
    {
      date: '2024-01-01',
      impressions: 500,
      clicks: 25,
      conversions: 5,
    },
    {
      date: '2024-01-02',
      impressions: 600,
      clicks: 30,
      conversions: 6,
    },
    // ... autres données quotidiennes
  ],
};

export default function CampaignDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { showNotification } = useNotification();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Implement API call to fetch campaign data
    setCampaign(mockCampaign);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Campagne non trouvée</h2>
          <button
            onClick={() => router.push('/campaigns')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Retour aux campagnes
          </button>
        </div>
      </div>
    );
  }

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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{campaign.name}</h1>
              <p className="mt-1 text-sm text-gray-500">
                {new Date(campaign.startDate).toLocaleDateString()} -{' '}
                {new Date(campaign.endDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => router.push(`/campaigns/${id}/edit`)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Modifier
              </button>
              <button
                onClick={() => {
                  // TODO: Implement campaign status toggle
                  showNotification({
                    type: 'success',
                    message: 'Statut de la campagne mis à jour',
                  });
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {campaign.status === 'active' ? 'Mettre en pause' : 'Activer'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Aperçu</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-gray-500">Statut</p>
              <p className="mt-1">
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
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Budget</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {campaign.budget.toLocaleString()} €
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Plateformes</p>
              <p className="mt-1 text-gray-900">{campaign.platforms.join(', ')}</p>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Métriques de performance</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Impressions</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {campaign.performance.impressions.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Clics</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {campaign.performance.clicks.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Conversions</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {campaign.performance.conversions.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">CTR</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {campaign.performance.ctr}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">CPC</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {campaign.performance.cpc} €
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">CPA</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {campaign.performance.cpa} €
              </p>
            </div>
          </div>
        </div>

        {/* Daily Stats */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Statistiques quotidiennes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Impressions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clics
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conversions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {campaign.dailyStats.map((stat) => (
                  <tr key={stat.date}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(stat.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {stat.impressions.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {stat.clicks.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {stat.conversions.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
} 