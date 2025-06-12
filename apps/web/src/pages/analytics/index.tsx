import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useNotification } from '@stonelead/ui';

interface AnalyticsData {
  totalSpent: number;
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  ctr: number;
  cpc: number;
  conversionRate: number;
  dailyStats: {
    date: string;
    spent: number;
    impressions: number;
    clicks: number;
    conversions: number;
  }[];
  platformStats: {
    platform: string;
    spent: number;
    impressions: number;
    clicks: number;
    conversions: number;
  }[];
  campaignStats: {
    campaign: string;
    spent: number;
    impressions: number;
    clicks: number;
    conversions: number;
  }[];
}

export default function AnalyticsPage() {
  const router = useRouter();
  const { showNotification } = useNotification();
  const [dateRange, setDateRange] = useState('30d'); // 7d, 30d, 90d, 1y

  // Mock data
  const analyticsData: AnalyticsData = {
    totalSpent: 15000,
    totalImpressions: 1000000,
    totalClicks: 50000,
    totalConversions: 1000,
    ctr: 5,
    cpc: 0.3,
    conversionRate: 2,
    dailyStats: [
      {
        date: '2024-03-01',
        spent: 500,
        impressions: 35000,
        clicks: 1750,
        conversions: 35,
      },
      {
        date: '2024-03-02',
        spent: 550,
        impressions: 38000,
        clicks: 1900,
        conversions: 38,
      },
      // ... more daily stats
    ],
    platformStats: [
      {
        platform: 'Facebook',
        spent: 8000,
        impressions: 600000,
        clicks: 30000,
        conversions: 600,
      },
      {
        platform: 'Google Ads',
        spent: 7000,
        impressions: 400000,
        clicks: 20000,
        conversions: 400,
      },
    ],
    campaignStats: [
      {
        campaign: 'Campagne Facebook Q1',
        spent: 5000,
        impressions: 400000,
        clicks: 20000,
        conversions: 400,
      },
      {
        campaign: 'Campagne Google Ads',
        spent: 3000,
        impressions: 200000,
        clicks: 10000,
        conversions: 200,
      },
    ],
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const formatNumber = (number: number) => {
    return new Intl.NumberFormat('fr-FR').format(number);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="bg-white shadow sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
              <div className="flex space-x-3">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="7d">7 derniers jours</option>
                  <option value="30d">30 derniers jours</option>
                  <option value="90d">90 derniers jours</option>
                  <option value="1y">1 an</option>
                </select>
                <button
                  onClick={() => {
                    // TODO: Implement export functionality
                    showNotification({
                      type: 'success',
                      message: 'Rapport exporté avec succès !',
                    });
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Exporter
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Dépenses totales
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {formatCurrency(analyticsData.totalSpent)}
              </dd>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Impressions
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {formatNumber(analyticsData.totalImpressions)}
              </dd>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Clics
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {formatNumber(analyticsData.totalClicks)}
              </dd>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Conversions
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {formatNumber(analyticsData.totalConversions)}
              </dd>
            </div>
          </div>
        </div>

        {/* Métriques */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">CTR</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {analyticsData.ctr}%
              </dd>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">CPC</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {formatCurrency(analyticsData.cpc)}
              </dd>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Taux de conversion
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {analyticsData.conversionRate}%
              </dd>
            </div>
          </div>
        </div>

        {/* Statistiques par plateforme */}
        <div className="bg-white shadow sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Statistiques par plateforme
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Plateforme
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Dépenses
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Impressions
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Clics
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Conversions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {analyticsData.platformStats.map((stat) => (
                    <tr key={stat.platform}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {stat.platform}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(stat.spent)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatNumber(stat.impressions)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatNumber(stat.clicks)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatNumber(stat.conversions)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Statistiques par campagne */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Statistiques par campagne
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Campagne
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Dépenses
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Impressions
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Clics
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Conversions
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {analyticsData.campaignStats.map((stat) => (
                    <tr key={stat.campaign}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {stat.campaign}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(stat.spent)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatNumber(stat.impressions)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatNumber(stat.clicks)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatNumber(stat.conversions)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            // TODO: Implement campaign details view
                            router.push('/campaigns/1');
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Voir détails
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 