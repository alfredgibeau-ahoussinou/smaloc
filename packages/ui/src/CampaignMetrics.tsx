import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface CampaignMetrics {
  impressions: number;
  clicks: number;
  conversions: number;
}

interface CampaignMetricsProps {
  metrics: CampaignMetrics;
  className?: string;
}

export const CampaignMetrics: React.FC<CampaignMetricsProps> = ({
  metrics,
  className = '',
}) => {
  const performanceData = {
    labels: ['Impressions', 'Clicks', 'Conversions'],
    datasets: [
      {
        label: 'Performance Metrics',
        data: [metrics.impressions, metrics.clicks, metrics.conversions],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const conversionRate = metrics.impressions > 0
    ? (metrics.conversions / metrics.impressions) * 100
    : 0;

  const ctrData = {
    labels: ['CTR'],
    datasets: [
      {
        label: 'Click-Through Rate',
        data: [metrics.impressions > 0 ? (metrics.clicks / metrics.impressions) * 100 : 0],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const conversionData = {
    labels: ['Conversion Rate'],
    datasets: [
      {
        label: 'Conversion Rate',
        data: [conversionRate],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
        <Bar
          data={performanceData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Click-Through Rate</h3>
        <Doughnut
          data={ctrData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
        <div className="text-center mt-2">
          <span className="text-2xl font-bold">
            {metrics.impressions > 0
              ? ((metrics.clicks / metrics.impressions) * 100).toFixed(2)
              : '0.00'}
            %
          </span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Conversion Rate</h3>
        <Doughnut
          data={conversionData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
        <div className="text-center mt-2">
          <span className="text-2xl font-bold">{conversionRate.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
}; 